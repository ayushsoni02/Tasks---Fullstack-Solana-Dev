"use client";

import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddress, createAssociatedTokenAccountInstruction } from "@solana/spl-token";
import * as anchor from "@coral-xyz/anchor";
import { IDL } from "@/lib/idl";
import { PROGRAM_ID, TOKEN_MINT, DurationType, TOKEN_DECIMALS, DURATION_NAMES } from "@/lib/constants";

export default function StakingForm({ onStakeSuccess }: { onStakeSuccess: () => void }) {
  const { connection } = useConnection();
  const wallet = useWallet();
  const { publicKey } = wallet;

  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState<DurationType>(DurationType.DurationOne);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleStake = async () => {
    if (!publicKey) {
      setError("Please connect your wallet first");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Create provider with wallet adapter
      const provider = new anchor.AnchorProvider(
        connection,
        wallet as any,
        { commitment: "confirmed" }
      );

      // Create program interface
      const program = new anchor.Program(IDL as any, provider);

      // Convert amount to lamports
      const amountFloat = parseFloat(amount);
      if (amountFloat <= 0) {
        setError("Amount must be greater than 0");
        return;
      }
      
    
      const amountStr = amountFloat.toFixed(TOKEN_DECIMALS);
      const [whole, decimal = ""] = amountStr.split(".");
      const paddedDecimal = decimal.padEnd(TOKEN_DECIMALS, "0");
      const amountLamports = new anchor.BN(whole + paddedDecimal);

      console.log("Staking amount:", amountFloat, "tokens =", amountLamports.toString(), "lamports");

      // Generate random stake ID
      const stakeId = new anchor.BN(Date.now());

      // Derive PDAs
      const [stakePDA] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("stake"),
          publicKey.toBuffer(),
          stakeId.toArrayLike(Buffer, "le", 8),
        ],
        PROGRAM_ID
      );

      const [globalPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("global")],
        PROGRAM_ID
      );

      // Get associated token accounts
      const associatedUser = await getAssociatedTokenAddress(
        TOKEN_MINT,
        publicKey
      );

      const associatedStake = await getAssociatedTokenAddress(
        TOKEN_MINT,
        stakePDA,
        true
      );

      // Check if user's associated token account exists, create if not
      const userTokenAccountInfo = await connection.getAccountInfo(associatedUser);
      if (!userTokenAccountInfo) {
        const createATAIx = createAssociatedTokenAccountInstruction(
          publicKey,
          associatedUser,
          publicKey,
          TOKEN_MINT
        );
        
        const transaction = new Transaction().add(createATAIx);
        const signature = await wallet.sendTransaction!(transaction, connection);
        await connection.confirmTransaction(signature, 'confirmed');
        
        console.log("Created associated token account:", associatedUser.toBase58());
      }

      // Check user's token balance
      const tokenBalance = await connection.getTokenAccountBalance(associatedUser);
      const balanceLamports = new anchor.BN(tokenBalance.value.amount);
      console.log("User token balance:", tokenBalance.value.uiAmount, "tokens =", balanceLamports.toString(), "lamports");
      
      if (balanceLamports.lt(amountLamports)) {
        setError(`Insufficient balance. You have ${tokenBalance.value.uiAmount} tokens but trying to stake ${amountFloat}`);
        setLoading(false);
        return;
      }

      // Create duration object
      let lockDuration: any;
      switch (duration) {
        case DurationType.DurationOne:
          lockDuration = { durationOne: {} };
          break;
        case DurationType.DurationTwo:
          lockDuration = { durationTwo: {} };
          break;
        case DurationType.DurationThree:
          lockDuration = { durationThree: {} };
          break;
      }

      // Call stakeToken instruction
      const tx = await program.methods
        .stakeToken(stakeId, amountLamports, lockDuration)
        .accounts({
          user: publicKey,
          stake: stakePDA,
          global: globalPDA,
          tokenMint: TOKEN_MINT,
          associatedStake: associatedStake,
          associatedUser: associatedUser,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      setSuccess(`Staking successful! Transaction: ${tx}`);
      setAmount("");
      
      // Call the callback to refresh stake accounts
      setTimeout(() => {
        onStakeSuccess();
      }, 2000);

    } catch (err: any) {
      console.error("Staking error:", err);
      
     
      let errorMessage = "Failed to stake tokens";
      if (err.message) {
        errorMessage = err.message;
      }
      if (err.error?.errorMessage) {
        errorMessage = err.error.errorMessage;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 max-w-md">
      <h2 className="text-2xl font-bold mb-6">Stake Tokens</h2>

   
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount to stake"
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
          disabled={loading}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Lock Duration</label>
        <select
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value) as DurationType)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
          disabled={loading}
        >
          <option value={DurationType.DurationOne}>{DURATION_NAMES[DurationType.DurationOne]}</option>
          <option value={DurationType.DurationTwo}>{DURATION_NAMES[DurationType.DurationTwo]}</option>
          <option value={DurationType.DurationThree}>{DURATION_NAMES[DurationType.DurationThree]}</option>
        </select>
      </div>

   
      <button
        onClick={handleStake}
        disabled={loading || !publicKey}
        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors"
      >
        {loading ? "Staking..." : "Stake Tokens"}
      </button>

     
      {error && (
        <div className="mt-4 p-3 bg-red-900/20 border border-red-500 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}
     
      {success && (
        <div className="mt-4 p-3 bg-green-900/20 border border-green-500 rounded-lg text-green-400 text-sm">
          {success}
        </div>
      )}

      {!publicKey && (
        <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-500 rounded-lg text-yellow-400 text-sm">
          Please connect your wallet to stake tokens
        </div>
      )}
    </div>
  );
}