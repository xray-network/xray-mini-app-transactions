import type { CardanoTypes } from "@/types"
import type {
  AddressTransactions,
  TransactionInfo,
  TransactionInfoList,
  TransactionOutput,
} from "@/components/pages/Home/transactionTypes"

const paymentAddress = "addr1q8example7s4n9x2f6m3k5j8h0g4d2c9v7b5n1m6p3q8r4t2y5u7i9o1a3s6d8f0g2h4j6k8l0z2x4c6v8b0n2m4"
const recipientAddress = "addr1q9recipient4m8n2b6v0c3x7z1l5k9j3h7g1f5d9s3a7p1o5i9u3y7t1r5e9w3q7m1n5b9v3c7x1z5l9k3j7"
const stakingAddress = "stake1u9example8n4m2b6v0c3x7z1l5k9j3h7g1f5d9s3a7p1o5i9u3y7t1r5"
const transactionHash = "7f1a2b3c4d5e6f708192a3b4c5d6e7f8091a2b3c4d5e6f708192a3b4c5d6e7f8"
const inputHash = "1a2b3c4d5e6f708192a3b4c5d6e7f8091a2b3c4d5e6f708192a3b4c5d6e7f80"
const collateralHash = "2b3c4d5e6f708192a3b4c5d6e7f8091a2b3c4d5e6f708192a3b4c5d6e7f801a"
const referenceHash = "3c4d5e6f708192a3b4c5d6e7f8091a2b3c4d5e6f708192a3b4c5d6e7f801a2b"
const policyId = "4d5e6f708192a3b4c5d6e7f8091a2b3c4d5e6f708192a3b4c5d6e7f8"
const assetName = "585241592046756c6c2046656174757265"

export type ExampleAccountState = {
  paymentAddress: string
  stakingAddress: string | null
  balanceStatus: "ready"
  state: {
    utxos: []
    balance: { value: bigint; assets: [] }
  }
  delegation: { delegation: string | null; rewards: bigint }
}

export const fullTransactionExample = {
  network: "mainnet" as CardanoTypes.NetworkName,
  tip: {
    hash: "8a".repeat(32),
    epochNo: 583,
    absSlot: 168_421_900,
    epochSlot: 248_700,
    blockNo: 12_345_690,
    blockTime: 1_788_100_000,
  },
  accountState: {
    paymentAddress,
    stakingAddress,
    balanceStatus: "ready",
    state: { utxos: [], balance: { value: 8_765_432_100n, assets: [] } },
    delegation: { delegation: "pool1xrayexamplepool8v4c2x0z6l3k9j5h1g7f4d2s8a6p3o9i5u1y7", rewards: 42_000_000n },
  } satisfies ExampleAccountState,
  transactions: [
    {
      tx_hash: transactionHash,
      epoch_no: 583,
      block_height: 12_345_678,
      block_time: 1_788_099_600,
    },
  ] satisfies AddressTransactions,
  transactionInfo: [
    {
      tx_hash: transactionHash,
      block_hash: "9b".repeat(32),
      block_height: 12_345_678,
      epoch_no: 583,
      epoch_slot: 248_300,
      absolute_slot: 168_421_500,
      tx_timestamp: 1_788_099_600,
      tx_block_index: 4,
      tx_size: 7_842,
      total_output: "248000000",
      fee: "482713",
      treasury_donation: "1000000",
      deposit: "2000000",
      invalid_before: "168420900",
      invalid_after: "168425000",
      inputs: [
        {
          payment_addr: { bech32: paymentAddress, cred: "a1".repeat(28) },
          stake_addr: stakingAddress,
          tx_hash: inputHash,
          tx_index: 0,
          value: "300000000",
          datum_hash: null,
          inline_datum: null,
          reference_script: null,
          asset_list: [
            {
              policy_id: policyId,
              asset_name: assetName,
              fingerprint: "asset1fullfeaturedexample6x9z",
              decimals: 0,
              quantity: "12",
            },
          ],
        },
      ],
      outputs: [
        {
          payment_addr: { bech32: recipientAddress, cred: "b2".repeat(28) },
          stake_addr: "stake1u8recipient4m8n2b6v0c3x7z1l5k9j3h7g1f5d9s3a7p1o5i9u3y7",
          tx_hash: transactionHash,
          tx_index: 0,
          value: "125000000",
          datum_hash: "5e".repeat(32),
          inline_datum: {
            bytes: "d8799f581c" + "ab".repeat(28) + "1a000f4240ff",
            value: { constructor: 0, fields: [{ bytes: "ab".repeat(28) }, { int: 1_000_000 }] },
          } as unknown as TransactionOutput["inline_datum"],
          reference_script: {
            hash: "6f".repeat(28),
            size: 4_096,
            type: "plutusV2",
            bytes: "5901" + "4e4d01000033222220051200120011".repeat(8),
            value: null,
          },
          asset_list: [
            {
              policy_id: policyId,
              asset_name: assetName,
              fingerprint: "asset1fullfeaturedexample6x9z",
              decimals: 0,
              quantity: "5",
            },
          ],
        },
        {
          payment_addr: { bech32: paymentAddress, cred: "a1".repeat(28) },
          stake_addr: stakingAddress,
          tx_hash: transactionHash,
          tx_index: 1,
          value: "123000000",
          datum_hash: null,
          inline_datum: null,
          reference_script: null,
          asset_list: [
            {
              policy_id: policyId,
              asset_name: assetName,
              fingerprint: "asset1fullfeaturedexample6x9z",
              decimals: 0,
              quantity: "7",
            },
          ],
        },
      ],
      metadata: {
        tx_hash: transactionHash,
        metadata: {
          "721": {
            [policyId]: {
              [assetName]: {
                name: "XRAY Full Feature",
                image: "ipfs://bafybeigdyrzt-example-transaction-asset",
                mediaType: "image/png",
                description: ["A deterministic fixture", "used to review every transaction tab."],
              },
            },
          },
          "674": { msg: ["XRAY transaction details example"] },
        },
      },
      withdrawals: [
        {
          stake_address: stakingAddress,
          amount: "42000000",
        },
      ],
      certificates: [
        {
          index: 0,
          type: "stake_delegation",
          stake_address: stakingAddress,
          pool_id: "pool1xrayexamplepool8v4c2x0z6l3k9j5h1g7f4d2s8a6p3o9i5u1y7",
        },
        {
          index: 1,
          type: "vote_delegation",
          drep_id: "drep1xrayexample8v4c2x0z6l3k9j5h1g7f4d2s8a6p3o9i5u1y7",
        },
      ],
      native_scripts: [
        {
          script_hash: "70".repeat(28),
          type: "all",
          required_signers: ["71".repeat(28), "72".repeat(28)],
        },
      ],
      plutus_contracts: [
        {
          script_hash: "73".repeat(28),
          version: "plutusV2",
          purpose: "spend",
          input_index: 0,
          datum: { constructor: 0, fields: [{ int: 42 }] },
          redeemer: { constructor: 1, fields: [{ bytes: "58524159" }] },
          execution_units: { memory: 5_120_000, steps: 1_432_000_000 },
          bytecode: "5902" + "4e4d01000033222220051200120011".repeat(10),
        },
      ],
      assets_minted: [
        {
          policy_id: policyId,
          asset_name: assetName,
          fingerprint: "asset1fullfeaturedexample6x9z",
          quantity: "100",
          decimals: 0,
        },
        {
          policy_id: "74".repeat(28),
          asset_name: "4255524e",
          fingerprint: "asset1burnexample4k8p",
          quantity: "-25",
          decimals: 0,
        },
      ],
      collateral_inputs: [
        {
          payment_addr: { bech32: paymentAddress, cred: "a1".repeat(28) },
          stake_addr: stakingAddress,
          tx_hash: collateralHash,
          tx_index: 2,
          value: "10000000",
          datum_hash: null,
          inline_datum: null,
          reference_script: null,
          asset_list: [],
        },
      ],
      collateral_output: [
        {
          payment_addr: { bech32: paymentAddress },
          tx_hash: transactionHash,
          tx_index: 2,
          value: "8500000",
        },
      ],
      reference_inputs: [
        {
          payment_addr: { bech32: recipientAddress, cred: "b2".repeat(28) },
          stake_addr: null,
          tx_hash: referenceHash,
          tx_index: 1,
          value: "2500000",
          datum_hash: "75".repeat(32),
          inline_datum: {
            bytes: "d8799f182aff",
            value: { constructor: 0, fields: [{ int: 42 }] },
          } as unknown as TransactionOutput["inline_datum"],
          reference_script: {
            hash: "76".repeat(28),
            size: 2_048,
            type: "plutusV3",
            bytes: "5901" + "4e4d01000033222220051200120011".repeat(6),
            value: null,
          },
          asset_list: [],
        },
      ],
      voting_procedures: [
        {
          voter: "drep1xrayexample8v4c2x0z6l3k9j5h1g7f4d2s8a6p3o9i5u1y7",
          governance_action: `${"77".repeat(32)}#0`,
          vote: "yes",
          anchor: { url: "https://xray.app/governance/example.json", hash: "78".repeat(32) },
        },
      ],
      proposal_procedures: [
        {
          deposit: "100000000000",
          reward_account: stakingAddress,
          action: { type: "info_action", rationale: "Raw-tab governance fixture" },
        },
      ],
    } satisfies TransactionInfo,
  ] satisfies TransactionInfoList,
} as const
