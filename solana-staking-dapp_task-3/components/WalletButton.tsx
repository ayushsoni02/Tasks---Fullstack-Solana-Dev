"use client";

import { useEffect, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function WalletButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="bg-purple-600 hover:bg-purple-700 rounded-lg px-4 py-2 font-medium">
        Select Wallet
      </button>
    );
  }

  return <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !rounded-lg" />;
}
