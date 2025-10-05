"use client";

import { useState } from "react";
import WalletButton from "@/components/WalletButton";
import StakingForm from "@/components/StakingForm";
import StakeAccountsList from "@/components/StakeAccountsList";

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleStakeSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Solana Token Staking</h1>
            <p className="text-gray-400">Stake your tokens and earn rewards</p>
          </div>
          <WalletButton />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <StakingForm onStakeSuccess={handleStakeSuccess} />
          </div>

          <div>
            <StakeAccountsList refreshTrigger={refreshTrigger} />
          </div>
        </div>

        <div className="mt-12 p-6 bg-gray-900 border border-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Program Information</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Program ID:</span>
              <p className="font-mono text-xs mt-1 break-all">Hv6Q2KdFtbdobWYEeMWJ2yPfmg6efMZPd3A6mfKN3L7W</p>
            </div>
            <div>
              <span className="text-gray-400">Token Mint:</span>
              <p className="font-mono text-xs mt-1 break-all">Cx97mtHU9hKb3XWeKcDPHgLyEB8vguoNxEsnyGUmm4G9</p>
            </div>
            <div className="md:col-span-2">
              <span className="text-gray-400">Network:</span>
              <p className="mt-1">Devnet</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}