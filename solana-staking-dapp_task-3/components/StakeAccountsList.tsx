"use client";

import { useState, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import { IDL } from "@/lib/idl";
import { PROGRAM_ID, TOKEN_DECIMALS, DURATION_NAMES, DurationType } from "@/lib/constants";

interface StakeAccount {
  publicKey: string;
  user: string;
  stakedAmount: number;
  claimedAmount: number;
  burnedAmount: number;
  stakeId: string;
  stakedAt: Date;
  lockedDuration: string;
}

export default function StakeAccountsList({ refreshTrigger }: { refreshTrigger: number }) {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const [stakes, setStakes] = useState<StakeAccount[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (publicKey) {
      fetchStakeAccounts();
    } else {
      setStakes([]);
    }
  }, [publicKey, connection, refreshTrigger]);

  const fetchStakeAccounts = async () => {
    if (!publicKey) return;

    setLoading(true);
    setError("");

    try {
      
      const provider = new anchor.AnchorProvider(
        connection,
        {} as any,
        { commitment: "confirmed" }
      );

      const program = new anchor.Program(IDL as any, provider);

      const allStakes = await program.account.stake.all([
        {
          memcmp: {
            offset: 8, // Discriminator is 8 bytes
            bytes: publicKey.toBase58(),
          },
        },
      ]);

      const formattedStakes: StakeAccount[] = allStakes.map((stake: any) => {
  
        let durationStr = "Unknown";
        if (stake.account.lockedDuration.durationOne !== undefined) {
          durationStr = DURATION_NAMES[DurationType.DurationOne];
        } else if (stake.account.lockedDuration.durationTwo !== undefined) {
          durationStr = DURATION_NAMES[DurationType.DurationTwo];
        } else if (stake.account.lockedDuration.durationThree !== undefined) {
          durationStr = DURATION_NAMES[DurationType.DurationThree];
        }

        return {
          publicKey: stake.publicKey.toBase58(),
          user: stake.account.user.toBase58(),
          stakedAmount: stake.account.stakedAmount.toNumber() / Math.pow(10, TOKEN_DECIMALS),
          claimedAmount: stake.account.claimedAmount.toNumber() / Math.pow(10, TOKEN_DECIMALS),
          burnedAmount: stake.account.burnedAmount.toNumber() / Math.pow(10, TOKEN_DECIMALS),
          stakeId: stake.account.stakeId.toString(),
          stakedAt: new Date(stake.account.stakedAt.toNumber() * 1000),
          lockedDuration: durationStr,
        };
      });

      setStakes(formattedStakes);
    } catch (err: any) {
      console.error("Error fetching stake accounts:", err);
      setError(err.message || "Failed to fetch stake accounts");
    } finally {
      setLoading(false);
    }
  };

  if (!publicKey) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Your Stake Accounts</h2>
        <p className="text-gray-400">Connect your wallet to view your stake accounts</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Your Stake Accounts</h2>
        <button
          onClick={fetchStakeAccounts}
          disabled={loading}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors disabled:opacity-50"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-500 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {loading && stakes.length === 0 ? (
        <div className="text-center py-8 text-gray-400">Loading stake accounts...</div>
      ) : stakes.length === 0 ? (
        <div className="text-center py-8 text-gray-400">No stake accounts found</div>
      ) : (
        <div className="space-y-4">
          {stakes.map((stake) => (
            <div
              key={stake.publicKey}
              className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-purple-500 transition-colors"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Stake ID</p>
                  <p className="font-mono text-sm">{stake.stakeId}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Staked Amount</p>
                  <p className="font-semibold text-lg text-purple-400">{stake.stakedAmount.toFixed(4)} tokens</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Lock Duration</p>
                  <p className="text-sm">{stake.lockedDuration}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Staked At</p>
                  <p className="text-sm">{stake.stakedAt.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Claimed</p>
                  <p className="text-sm">{stake.claimedAmount.toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Burned</p>
                  <p className="text-sm">{stake.burnedAmount.toFixed(4)}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-700">
                <p className="text-xs text-gray-500 font-mono truncate">
                  Account: {stake.publicKey}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}