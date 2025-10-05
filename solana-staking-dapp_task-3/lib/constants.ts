import { PublicKey } from "@solana/web3.js";

// Program ID
export const PROGRAM_ID = new PublicKey("Hv6Q2KdFtbdobWYEeMWJ2yPfmg6efMZPd3A6mfKN3L7W");

// Token Mint Address
export const TOKEN_MINT = new PublicKey("Cx97mtHU9hKb3XWeKcDPHgLyEB8vguoNxEsnyGUmm4G9");

// Admin Address
export const ADMIN_PUBKEY = new PublicKey("BjjFpCbTrFVn3ZgcdCv4jTLAzbbDCMV1Vo115XJSJ7XG");

// RPC Endpoint - using Devnet
export const RPC_ENDPOINT = "https://api.devnet.solana.com";

// Duration Types
export enum DurationType {
  DurationOne = 0,
  DurationTwo = 1,
  DurationThree = 2,
}

// Duration names for display
export const DURATION_NAMES: Record<DurationType, string> = {
  [DurationType.DurationOne]: "Duration One",
  [DurationType.DurationTwo]: "Duration Two",
  [DurationType.DurationThree]: "Duration Three",
};

// Token decimals
export const TOKEN_DECIMALS = 9;