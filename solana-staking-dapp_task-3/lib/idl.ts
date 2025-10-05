export type StakingProgram = {
  "address": "Hv6Q2KdFtbdobWYEeMWJ2yPfmg6efMZPd3A6mfKN3L7W",
  "metadata": {
    "name": "stakingProgram",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "stakeToken",
      "discriminator": [191, 127, 193, 101, 37, 96, 87, 211],
      "accounts": [
        { "name": "user", "writable": true, "signer": true },
        { "name": "stake", "writable": true },
        { "name": "global", "writable": true },
        { "name": "tokenMint" },
        { "name": "associatedStake", "writable": true },
        { "name": "associatedUser", "writable": true },
        { "name": "associatedTokenProgram" },
        { "name": "tokenProgram" },
        { "name": "systemProgram" }
      ],
      "args": [
        { "name": "stakeId", "type": "i64" },
        { "name": "amount", "type": "u64" },
        { "name": "lockDuration", "type": { "defined": { "name": "durationType" } } }
      ]
    }
  ],
  "accounts": [
    {
      "name": "stake",
      "discriminator": [206, 176, 202, 18, 200, 209, 179, 108]
    }
  ],
  "types": [
    {
      "name": "durationType",
      "type": {
        "kind": "enum",
        "variants": [
          { "name": "durationOne" },
          { "name": "durationTwo" },
          { "name": "durationThree" }
        ]
      }
    },
    {
      "name": "stake",
      "type": {
        "kind": "struct",
        "fields": [
          { "name": "user", "type": "pubkey" },
          { "name": "stakedAmount", "type": "u64" },
          { "name": "claimedAmount", "type": "u64" },
          { "name": "burnedAmount", "type": "u64" },
          { "name": "stakeId", "type": "i64" },
          { "name": "stakedAt", "type": "i64" },
          { "name": "cmlRewardPerToken", "type": "f64" },
          { "name": "lockedDuration", "type": { "defined": { "name": "durationType" } } }
        ]
      }
    }
  ]
};

export const IDL: StakingProgram = {
  "address": "Hv6Q2KdFtbdobWYEeMWJ2yPfmg6efMZPd3A6mfKN3L7W",
  "metadata": {
    "name": "stakingProgram",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "stakeToken",
      "discriminator": [191, 127, 193, 101, 37, 96, 87, 211],
      "accounts": [
        { "name": "user", "writable": true, "signer": true },
        { "name": "stake", "writable": true },
        { "name": "global", "writable": true },
        { "name": "tokenMint" },
        { "name": "associatedStake", "writable": true },
        { "name": "associatedUser", "writable": true },
        { "name": "associatedTokenProgram" },
        { "name": "tokenProgram" },
        { "name": "systemProgram" }
      ],
      "args": [
        { "name": "stakeId", "type": "i64" },
        { "name": "amount", "type": "u64" },
        { "name": "lockDuration", "type": { "defined": { "name": "durationType" } } }
      ]
    }
  ],
  "accounts": [
    {
      "name": "stake",
      "discriminator": [206, 176, 202, 18, 200, 209, 179, 108]
    }
  ],
  "types": [
    {
      "name": "durationType",
      "type": {
        "kind": "enum",
        "variants": [
          { "name": "durationOne" },
          { "name": "durationTwo" },
          { "name": "durationThree" }
        ]
      }
    },
    {
      "name": "stake",
      "type": {
        "kind": "struct",
        "fields": [
          { "name": "user", "type": "pubkey" },
          { "name": "stakedAmount", "type": "u64" },
          { "name": "claimedAmount", "type": "u64" },
          { "name": "burnedAmount", "type": "u64" },
          { "name": "stakeId", "type": "i64" },
          { "name": "stakedAt", "type": "i64" },
          { "name": "cmlRewardPerToken", "type": "f64" },
          { "name": "lockedDuration", "type": { "defined": { "name": "durationType" } } }
        ]
      }
    }
  ]
};