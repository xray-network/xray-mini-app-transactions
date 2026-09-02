import type { ReactNode } from "react"
import { Col, Row, Tabs, Tag } from "antd"
import {
  ArrowRightIcon,
  BanknotesIcon,
  CircleStackIcon,
  CodeBracketIcon,
  DocumentDuplicateIcon,
  DocumentTextIcon,
  HashtagIcon,
  IdentificationIcon,
  LinkIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline"
import Copy from "@/components/common/Copy"
import Empty from "@/components/common/Empty"
import Informers from "@/components/informers"
import type { CardanoTypes } from "@/types"
import * as Utils from "@/utils"
import type { TransactionInfo, TransactionOutput } from "./transactionTypes"
import style from "./style.module.css"

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value)

const isEmptyValue = (value: unknown): boolean =>
  value === null ||
  value === undefined ||
  (Array.isArray(value) && value.length === 0) ||
  (isRecord(value) && Object.keys(value).length === 0)

const asTransactionOutputs = (value: unknown): TransactionOutput[] =>
  Array.isArray(value) ? (value.filter(isRecord) as TransactionOutput[]) : []

const scalarText = (value: unknown): string => {
  if (value === null || value === undefined || value === "") return "—"
  if (typeof value === "bigint") return value.toString()
  if (typeof value === "boolean") return value ? "Yes" : "No"
  if (typeof value === "string" || typeof value === "number") return String(value)
  return String(value)
}

const safeJson = (value: unknown): string => {
  const normalize = (current: unknown): unknown => {
    if (typeof current === "bigint") return current.toString()
    if (Array.isArray(current)) return current.map(normalize)
    if (isRecord(current)) {
      return Object.fromEntries(
        Object.keys(current)
          .sort((left, right) => left.localeCompare(right))
          .map((key) => [key, normalize(current[key])])
      )
    }
    if (current === undefined) return null
    return current
  }

  return JSON.stringify(normalize(value), null, 2)
}

const SectionTitle = ({ icon, children }: { icon: ReactNode; children: ReactNode }) => (
  <div className={style.sectionTitle}>
    {icon}
    <strong>{children}</strong>
  </div>
)

const TabLabel = ({ icon, children }: { icon: ReactNode; children: ReactNode }) => (
  <span className={style.tabLabel}>
    {icon}
    <strong>{children}</strong>
  </span>
)

const EmptySection = ({ name }: { name: string }) => (
  <div className={style.emptySection}>
    <Empty title={`No ${name}`} descr={`This transaction does not contain ${name.toLowerCase()}.`} />
  </div>
)

const ScalarValue = ({ value }: { value: unknown }) => {
  const text = scalarText(value)
  return (
    <div className={style.scalarValue}>
      <Informers.Text value={text} copy={text === "—" ? undefined : text} />
    </div>
  )
}

type JsonLabelVariant = "muted" | "regular"

const JsonEditor = ({
  value,
  label,
  labelVariant = "muted",
  raw = false,
}: {
  value: unknown
  label?: ReactNode
  labelVariant?: JsonLabelVariant
  raw?: boolean
}) => {
  const json = typeof value === "string" ? value : safeJson(value)

  return (
    <>
      <div className={style.jsonToolbar}>
        {label && <span className={labelVariant === "regular" ? style.jsonLabel : style.cardIndex}>{label}</span>}
        <Copy copy={json}>
          <DocumentDuplicateIcon
            aria-label="Copy JSON"
            className="size-4 cursor-pointer text-gray-500 hover:text-blue-500 transition-colors"
            strokeWidth={2}
          />
        </Copy>
      </div>
      <textarea
        aria-label={raw ? "Complete Koios transaction JSON" : "JSON data"}
        className={`${style.jsonTextarea} ${raw ? style.rawTextarea : ""}`}
        readOnly
        spellCheck={false}
        value={json}
      />
    </>
  )
}

const JsonTextarea = ({
  value,
  label,
  labelVariant = "muted",
  raw = false,
}: {
  value: unknown
  label?: ReactNode
  labelVariant?: JsonLabelVariant
  raw?: boolean
}) => (
  <div className="shared-box mb-3">
    <div className={`shared-box-inner bg-gray-100! dark:bg-gray-950! ${style.jsonCardInner}`}>
      <JsonEditor value={value} label={label} labelVariant={labelVariant} raw={raw} />
    </div>
  </div>
)

const JsonData = ({
  value,
  emptyName,
  label,
  labelVariant = "muted",
}: {
  value: unknown
  emptyName: string
  label?: string
  labelVariant?: JsonLabelVariant
}) => {
  if (isEmptyValue(value)) return <EmptySection name={emptyName} />
  const values = Array.isArray(value) ? value : [value]

  return (
    <div className={style.dataGrid}>
      {values.map((item, index) => (
        <JsonTextarea
          key={index}
          value={item}
          label={
            label
              ? `${label}${values.length > 1 ? ` #${index + 1}` : ""}`
              : values.length > 1
                ? `#${index + 1}`
                : undefined
          }
          labelVariant={labelVariant}
        />
      ))}
    </div>
  )
}

const UtxoCard = ({
  utxo,
  extended = false,
  jsonDetails,
  jsonLabel,
}: {
  utxo: TransactionOutput
  extended?: boolean
  jsonDetails?: unknown
  jsonLabel?: string
}) => (
  <div className="shared-box mb-3">
    <div className="shared-box-inner bg-gray-100! dark:bg-gray-950!">
      <Informers.Explorer type="paymentAddress" value={utxo.payment_addr?.bech32 || ""} />
      <div className="text-gray-500 font-bold text-xs flex flex-wrap">
        <span className="flex items-center me-2 min-w-0">
          <span className="me-1">Tx:</span>
          <Informers.Explorer type="tx" value={utxo.tx_hash || ""} />
        </span>
        <span>#{utxo.tx_index}</span>
      </div>
      <Informers.Breakdown
        items={[
          { children: <Informers.Ada value={utxo.value || "0"} /> },
          ...(utxo.asset_list?.map((asset, index) => ({
            children: (
              <Informers.Asset
                key={index}
                policyId={asset.policy_id || ""}
                assetName={asset.asset_name || ""}
                quantity={asset.quantity || "0"}
                decimals={asset.decimals || 0}
              />
            ),
          })) ?? []),
        ]}
      />
      {extended && !isEmptyValue(utxo.datum_hash) && (
        <div className={style.utxoDetail}>
          <div className={style.fieldTitle}>Datum Hash</div>
          <ScalarValue value={utxo.datum_hash} />
        </div>
      )}
      {extended && !isEmptyValue(utxo.inline_datum) && (
        <div className={style.utxoDetail}>
          <JsonEditor value={utxo.inline_datum} label="Inline Datum" />
        </div>
      )}
      {extended && !isEmptyValue(utxo.reference_script) && (
        <div className={style.utxoDetail}>
          <JsonEditor value={utxo.reference_script} label="Reference Script" />
        </div>
      )}
      {jsonDetails !== undefined && (
        <div className={style.utxoDetail}>
          <JsonEditor value={jsonDetails} label={jsonLabel} labelVariant="regular" />
        </div>
      )}
    </div>
  </div>
)

const UtxoList = ({
  items,
  emptyName,
  extended = false,
}: {
  items: TransactionOutput[]
  emptyName: string
  extended?: boolean
}) =>
  items.length > 0 ? (
    <>
      {items.map((item, index) => (
        <UtxoCard key={`${item.tx_hash}-${item.tx_index}-${index}`} utxo={item} extended={extended} />
      ))}
    </>
  ) : (
    <EmptySection name={emptyName} />
  )

const TxInfoTab = ({
  transaction,
  network,
  tipBlock,
}: {
  transaction: TransactionInfo
  network: CardanoTypes.NetworkName | undefined
  tipBlock: number
}) => {
  const confirmations = Math.max(0, tipBlock - Number(transaction.block_height || 0))
  const ttl =
    transaction.invalid_after && network
      ? new Date(Utils.slotToUnixTime(Number(transaction.invalid_after), network) || 0).toLocaleString()
      : "—"
  const timestamp = transaction.tx_timestamp ? new Date(Number(transaction.tx_timestamp) * 1000).toLocaleString() : "—"

  return (
    <Row gutter={24}>
      <Col xs={24} sm={12}>
        <SectionTitle icon={<HashtagIcon className="size-5" strokeWidth={2} />}>General Info</SectionTitle>
        <div className="shared-box mb-3">
          <div className="shared-box-inner bg-gray-100! dark:bg-gray-950!">
            <Informers.Breakdown
              items={[
                {
                  title: "Tx Hash",
                  children: (
                    <Informers.Text
                      value={Utils.truncate(transaction.tx_hash || "")}
                      copy={transaction.tx_hash || ""}
                    />
                  ),
                },
                {
                  title: "Tx Index",
                  children: (
                    <Informers.Text
                      value={Utils.quantityWithCommas(transaction.tx_block_index || "0")}
                      copy={(transaction.tx_block_index || "0").toString()}
                    />
                  ),
                },
                { title: "TTL", children: <Informers.Text value={ttl} copy={ttl === "—" ? undefined : ttl} /> },
                {
                  title: "Size (Bytes)",
                  children: (
                    <Informers.Text
                      value={Utils.quantityWithCommas(transaction.tx_size || "0")}
                      copy={(transaction.tx_size || "0").toString()}
                    />
                  ),
                },
                { title: "Total Output", children: <Informers.Ada value={transaction.total_output || "0"} /> },
                { title: "Fee", children: <Informers.Ada value={transaction.fee || "0"} /> },
              ]}
            />
          </div>
        </div>
      </Col>
      <Col xs={24} sm={12}>
        <SectionTitle icon={<CircleStackIcon className="size-5" strokeWidth={2} />}>Block Info</SectionTitle>
        <div className="shared-box mb-3">
          <div className="shared-box-inner bg-gray-100! dark:bg-gray-950!">
            <Informers.Breakdown
              items={[
                {
                  title: "Block Hash",
                  children: (
                    <Informers.Text
                      value={Utils.truncate(transaction.block_hash || "")}
                      copy={transaction.block_hash || ""}
                    />
                  ),
                },
                {
                  title: "Block",
                  children: (
                    <Informers.Text
                      value={Utils.quantityWithCommas(transaction.block_height || "0")}
                      copy={(transaction.block_height || "0").toString()}
                    />
                  ),
                },
                {
                  title: "Epoch / Slot",
                  children: (
                    <Informers.Text
                      value={`${Utils.quantityWithCommas(transaction.epoch_no || "0")} / ${Utils.quantityWithCommas(transaction.epoch_slot || "0")}`}
                      copy={`${transaction.epoch_no || "0"} / ${transaction.epoch_slot || "0"}`}
                    />
                  ),
                },
                {
                  title: "Absolute Slot",
                  children: (
                    <Informers.Text
                      value={Utils.quantityWithCommas(transaction.absolute_slot || "0")}
                      copy={(transaction.absolute_slot || "0").toString()}
                    />
                  ),
                },
                {
                  title: "Timestamp",
                  children: <Informers.Text value={timestamp} copy={timestamp === "—" ? undefined : timestamp} />,
                },
                {
                  title: "Confirmations",
                  children: (
                    <Informers.Text
                      value={
                        <>
                          <Tag
                            color={confirmations <= 3 ? "danger" : confirmations <= 9 ? "warning" : "success"}
                            className="font-size-12 me-2!"
                          >
                            {confirmations <= 3 ? "Low" : confirmations <= 9 ? "Medium" : "High"}
                          </Tag>
                          {Utils.quantityWithCommas(confirmations)}
                        </>
                      }
                      copy={confirmations.toString()}
                    />
                  ),
                },
              ]}
            />
          </div>
        </div>
      </Col>
    </Row>
  )
}

const UtxoTab = ({ transaction }: { transaction: TransactionInfo }) => (
  <Row gutter={24}>
    <Col xs={24} sm={12}>
      <SectionTitle icon={<ArrowRightIcon className="size-5" strokeWidth={2} />}>Inputs</SectionTitle>
      <UtxoList items={transaction.inputs ?? []} emptyName="inputs" />
    </Col>
    <Col xs={24} sm={12}>
      <SectionTitle icon={<ArrowRightIcon className="size-5" strokeWidth={2} />}>Outputs</SectionTitle>
      <UtxoList items={transaction.outputs ?? []} emptyName="outputs" />
    </Col>
  </Row>
)

const CollateralTab = ({ transaction }: { transaction: TransactionInfo }) => {
  const collateralOutput = asTransactionOutputs(transaction.collateral_output)

  return (
    <Row gutter={24}>
      <Col xs={24} sm={12}>
        <SectionTitle icon={<ArrowRightIcon className="size-5" strokeWidth={2} />}>Collateral Inputs</SectionTitle>
        <UtxoList items={transaction.collateral_inputs ?? []} emptyName="collateral inputs" extended />
      </Col>
      <Col xs={24} sm={12}>
        <SectionTitle icon={<ArrowRightIcon className="size-5" strokeWidth={2} />}>Collateral Output</SectionTitle>
        <UtxoList items={collateralOutput} emptyName="collateral output" extended />
      </Col>
    </Row>
  )
}

const ContractsTab = ({ transaction }: { transaction: TransactionInfo }) => (
  <>
    <JsonData
      value={transaction.native_scripts}
      emptyName="native scripts"
      label="Native Scripts"
      labelVariant="regular"
    />
    <JsonData
      value={transaction.plutus_contracts}
      emptyName="Plutus contracts"
      label="Plutus Contracts"
      labelVariant="regular"
    />
  </>
)

const InputRefsTab = ({ transaction }: { transaction: TransactionInfo }) => {
  const references = transaction.reference_inputs ?? []
  if (references.length === 0) return <EmptySection name="reference inputs" />

  return (
    <>
      {references.map((reference, index) => (
        <UtxoCard
          key={`${reference.tx_hash}-${reference.tx_index}-${index}`}
          utxo={reference}
          jsonLabel="InputRef Details"
          jsonDetails={{
            datum_hash: reference.datum_hash,
            inline_datum: reference.inline_datum,
            reference_script: reference.reference_script,
          }}
        />
      ))}
    </>
  )
}

const MetadataTab = ({ value }: { value: unknown }) => {
  if (isEmptyValue(value)) return <EmptySection name="metadata" />
  const metadata = isRecord(value) && "metadata" in value ? value.metadata : value

  if (isRecord(metadata)) {
    return (
      <div className={style.dataGrid}>
        {Object.entries(metadata).map(([index, item]) => (
          <JsonTextarea
            key={index}
            value={item}
            label={
              <Tag className="mb-0!" color="blue">
                {index}
              </Tag>
            }
          />
        ))}
      </div>
    )
  }

  return <JsonData value={metadata} emptyName="metadata" />
}

const WithdrawalsTab = ({ transaction }: { transaction: TransactionInfo }) => {
  const value = transaction.withdrawals
  if (isEmptyValue(value)) return <EmptySection name="withdrawals" />
  const withdrawals = Array.isArray(value) ? value.filter(isRecord) : isRecord(value) ? [value] : []
  if (withdrawals.length === 0) return <EmptySection name="withdrawals" />

  return (
    <div className={style.dataGrid}>
      {withdrawals.map((withdrawal, index) => {
        const rewardAccount = scalarText(withdrawal.reward_account ?? withdrawal.stake_address ?? withdrawal.stake_addr)
        const amount = scalarText(withdrawal.amount ?? withdrawal.value)
        const stakeKeyType = scalarText(
          withdrawal.stake_key_type ?? withdrawal.stake_credential_type ?? withdrawal.credential_type ?? "Key"
        )
        const explicitReceivingAddress = scalarText(
          withdrawal.receiving_address ?? withdrawal.receiving_addr ?? withdrawal.payment_address
        )
        const outputAddress = transaction.outputs?.find(
          (output) => output.stake_addr && output.stake_addr === rewardAccount
        )?.payment_addr?.bech32
        const receivingAddress = explicitReceivingAddress === "—" ? outputAddress : explicitReceivingAddress

        return (
          <div key={index} className="shared-box">
            <div className="shared-box-inner bg-gray-100! dark:bg-gray-950!">
              <Informers.Breakdown
                items={[
                  {
                    title: "Reward Account",
                    children: (
                      <Informers.Explorer
                        type="stakingAddress"
                        value={rewardAccount === "—" ? undefined : rewardAccount}
                      />
                    ),
                  },
                  { title: "Stake Key Type", children: <ScalarValue value={stakeKeyType} /> },
                  {
                    title: "Amount",
                    children: <Informers.Ada value={amount === "—" ? "0" : amount} />,
                  },
                  {
                    title: "Receiving Address",
                    children: <Informers.Explorer type="paymentAddress" value={receivingAddress} />,
                  },
                ]}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

const MintTab = ({ value }: { value: unknown }) => {
  if (isEmptyValue(value)) return <EmptySection name="minted or burned assets" />
  if (!Array.isArray(value) || value.some((item) => !isRecord(item))) {
    return <JsonData value={value} emptyName="minted or burned assets" />
  }

  return (
    <div className={style.dataGrid}>
      {value.map((asset, index) => {
        const policyId = scalarText(asset.policy_id ?? asset.policyId)
        const assetName = scalarText(asset.asset_name ?? asset.assetName)
        const quantity = scalarText(asset.quantity)
        const decimals = Number(asset.decimals ?? 0)
        const fingerprint = scalarText(asset.fingerprint)
        return (
          <div key={index} className="shared-box">
            <div className="shared-box-inner bg-gray-100! dark:bg-gray-950!">
              <Informers.Breakdown
                items={[
                  {
                    title: "Asset",
                    children: (
                      <Informers.Asset
                        policyId={policyId === "—" ? "" : policyId}
                        assetName={assetName === "—" ? "" : assetName}
                        quantity={quantity === "—" ? "0" : quantity}
                        decimals={Number.isFinite(decimals) ? decimals : 0}
                      />
                    ),
                  },
                  {
                    title: "Policy ID",
                    children: <ScalarValue value={policyId} />,
                  },
                  ...(fingerprint === "—"
                    ? []
                    : [
                        {
                          title: "Fingerprint",
                          children: <ScalarValue value={fingerprint} />,
                        },
                      ]),
                ]}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

const RawTab = ({ transaction }: { transaction: TransactionInfo }) => {
  const raw = safeJson(transaction)
  return <JsonTextarea value={raw} label="Complete Koios Transaction" labelVariant="regular" raw />
}

export default function TransactionDetails({
  transaction,
  network,
  tipBlock,
}: {
  transaction: TransactionInfo
  network: CardanoTypes.NetworkName | undefined
  tipBlock: number
}) {
  const metadata =
    isRecord(transaction.metadata) && "metadata" in transaction.metadata
      ? transaction.metadata.metadata
      : transaction.metadata
  const hasUtxos = !isEmptyValue(transaction.inputs) || !isEmptyValue(transaction.outputs)
  const hasContracts = !isEmptyValue(transaction.native_scripts) || !isEmptyValue(transaction.plutus_contracts)
  const hasCollateral = !isEmptyValue(transaction.collateral_inputs) || !isEmptyValue(transaction.collateral_output)

  return (
    <Tabs
      destroyOnHidden
      className={style.detailTabs}
      items={[
        {
          key: "tx_info",
          label: <TabLabel icon={<HashtagIcon className="size-4" strokeWidth={2} />}>Tx Info</TabLabel>,
          children: <TxInfoTab transaction={transaction} network={network} tipBlock={tipBlock} />,
        },
        ...(hasUtxos
          ? [
              {
                key: "utxos",
                label: <TabLabel icon={<ArrowRightIcon className="size-4" strokeWidth={2} />}>UTXOs</TabLabel>,
                children: <UtxoTab transaction={transaction} />,
              },
            ]
          : []),
        ...(!isEmptyValue(metadata)
          ? [
              {
                key: "metadata",
                label: <TabLabel icon={<DocumentTextIcon className="size-4" strokeWidth={2} />}>Metadata</TabLabel>,
                children: <MetadataTab value={transaction.metadata} />,
              },
            ]
          : []),
        ...(!isEmptyValue(transaction.withdrawals)
          ? [
              {
                key: "withdrawals",
                label: <TabLabel icon={<BanknotesIcon className="size-4" strokeWidth={2} />}>Withdrawals</TabLabel>,
                children: <WithdrawalsTab transaction={transaction} />,
              },
            ]
          : []),
        ...(!isEmptyValue(transaction.certificates)
          ? [
              {
                key: "certificates",
                label: (
                  <TabLabel icon={<IdentificationIcon className="size-4" strokeWidth={2} />}>Certificates</TabLabel>
                ),
                children: <JsonData value={transaction.certificates} emptyName="certificates" />,
              },
            ]
          : []),
        ...(hasContracts
          ? [
              {
                key: "contracts",
                label: <TabLabel icon={<CodeBracketIcon className="size-4" strokeWidth={2} />}>Contracts</TabLabel>,
                children: <ContractsTab transaction={transaction} />,
              },
            ]
          : []),
        ...(!isEmptyValue(transaction.assets_minted)
          ? [
              {
                key: "token_mint",
                label: <TabLabel icon={<CircleStackIcon className="size-4" strokeWidth={2} />}>TokenMint</TabLabel>,
                children: <MintTab value={transaction.assets_minted} />,
              },
            ]
          : []),
        ...(hasCollateral
          ? [
              {
                key: "collateral",
                label: <TabLabel icon={<ShieldCheckIcon className="size-4" strokeWidth={2} />}>Collateral</TabLabel>,
                children: <CollateralTab transaction={transaction} />,
              },
            ]
          : []),
        ...(!isEmptyValue(transaction.reference_inputs)
          ? [
              {
                key: "reference_inputs",
                label: <TabLabel icon={<LinkIcon className="size-4" strokeWidth={2} />}>InputRefs</TabLabel>,
                children: <InputRefsTab transaction={transaction} />,
              },
            ]
          : []),
        {
          key: "raw",
          label: <TabLabel icon={<DocumentDuplicateIcon className="size-4" strokeWidth={2} />}>Raw</TabLabel>,
          children: <RawTab transaction={transaction} />,
        },
      ]}
    />
  )
}
