import type { ReactNode } from "react"
import { Col, Row, Tabs } from "antd"
import {
  ArrowRightIcon,
  BanknotesIcon,
  CircleStackIcon,
  CodeBracketIcon,
  DocumentDuplicateIcon,
  DocumentTextIcon,
  IdentificationIcon,
  LinkIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline"
import Copy from "@/components/common/Copy"
import Empty from "@/components/common/Empty"
import Informers from "@/components/informers"
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

const humanizeKey = (key: string): string => {
  const abbreviations: Record<string, string> = {
    ada: "ADA",
    cbor: "CBOR",
    drep: "DRep",
    id: "ID",
    tx: "Tx",
    url: "URL",
    utxo: "UTxO",
  }

  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/[_\s-]+/)
    .filter(Boolean)
    .map((part) => abbreviations[part.toLowerCase()] ?? `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(" ")
}

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

const StructuredValue = ({ value, depth = 0 }: { value: unknown; depth?: number }) => {
  if (Array.isArray(value)) {
    if (value.length === 0) return <span className="text-gray-500">—</span>
    return (
      <div className={style.nestedList}>
        {value.map((item, index) => (
          <div key={index} className={style.nestedItem}>
            <div className={style.itemIndex}>#{index + 1}</div>
            <StructuredValue value={item} depth={depth + 1} />
          </div>
        ))}
      </div>
    )
  }

  if (isRecord(value)) {
    const entries = Object.entries(value)
    if (entries.length === 0) return <span className="text-gray-500">—</span>
    const scalarEntries = entries.filter(([, child]) => !Array.isArray(child) && !isRecord(child))
    const nestedEntries = entries.filter(([, child]) => Array.isArray(child) || isRecord(child))

    return (
      <div className={style.structuredRecord}>
        {scalarEntries.length > 0 && (
          <Informers.Breakdown
            compact={depth > 0}
            items={scalarEntries.map(([key, child]) => ({
              title: humanizeKey(key),
              children: <ScalarValue value={child} />,
            }))}
          />
        )}
        {nestedEntries.map(([key, child]) => (
          <div key={key} className={style.nestedBlock}>
            <div className={style.nestedTitle}>{humanizeKey(key)}</div>
            <StructuredValue value={child} depth={depth + 1} />
          </div>
        ))}
      </div>
    )
  }

  return <ScalarValue value={value} />
}

const StructuredData = ({ value, emptyName }: { value: unknown; emptyName: string }) => {
  if (isEmptyValue(value)) return <EmptySection name={emptyName} />
  const values = Array.isArray(value) ? value : [value]

  return (
    <div className={style.dataGrid}>
      {values.map((item, index) => (
        <div key={index} className="shared-box">
          <div className="shared-box-inner bg-gray-100! dark:bg-gray-950!">
            {values.length > 1 && <div className={style.cardIndex}>#{index + 1}</div>}
            <StructuredValue value={item} />
          </div>
        </div>
      ))}
    </div>
  )
}

const UtxoCard = ({ utxo, extended = false }: { utxo: TransactionOutput; extended?: boolean }) => (
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
          <div className={style.nestedTitle}>Datum Hash</div>
          <ScalarValue value={utxo.datum_hash} />
        </div>
      )}
      {extended && !isEmptyValue(utxo.inline_datum) && (
        <div className={style.utxoDetail}>
          <div className={style.nestedTitle}>Inline Datum</div>
          <StructuredValue value={utxo.inline_datum} />
        </div>
      )}
      {extended && !isEmptyValue(utxo.reference_script) && (
        <div className={style.utxoDetail}>
          <div className={style.nestedTitle}>Reference Script</div>
          <StructuredValue value={utxo.reference_script} />
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

const UtxoTab = ({ transaction }: { transaction: TransactionInfo }) => (
  <Row gutter={24}>
    <Col xs={24} sm={12}>
      <SectionTitle icon={<ArrowRightIcon className="size-5" strokeWidth={2} />}>Inputs</SectionTitle>
      <UtxoList items={transaction.inputs ?? []} emptyName="inputs" />
    </Col>
    <Col xs={24} sm={12}>
      <SectionTitle icon={null}>
        Outputs <ArrowRightIcon className="size-5" strokeWidth={2} />
      </SectionTitle>
      <UtxoList items={transaction.outputs ?? []} emptyName="outputs" />
    </Col>
  </Row>
)

const CollateralTab = ({ transaction }: { transaction: TransactionInfo }) => {
  const collateralOutput = asTransactionOutputs(transaction.collateral_output)

  return (
    <Row gutter={24}>
      <Col xs={24} sm={12}>
        <SectionTitle icon={<ShieldCheckIcon className="size-5" strokeWidth={2} />}>Collateral Inputs</SectionTitle>
        <UtxoList items={transaction.collateral_inputs ?? []} emptyName="collateral inputs" extended />
      </Col>
      <Col xs={24} sm={12}>
        <SectionTitle icon={<ShieldCheckIcon className="size-5" strokeWidth={2} />}>Collateral Output</SectionTitle>
        <UtxoList items={collateralOutput} emptyName="collateral output" extended />
      </Col>
    </Row>
  )
}

const ContractsTab = ({ transaction }: { transaction: TransactionInfo }) => (
  <Row gutter={24}>
    <Col xs={24} sm={12}>
      <SectionTitle icon={<CodeBracketIcon className="size-5" strokeWidth={2} />}>Native Scripts</SectionTitle>
      <StructuredData value={transaction.native_scripts} emptyName="native scripts" />
    </Col>
    <Col xs={24} sm={12}>
      <SectionTitle icon={<CodeBracketIcon className="size-5" strokeWidth={2} />}>Plutus Contracts</SectionTitle>
      <StructuredData value={transaction.plutus_contracts} emptyName="Plutus contracts" />
    </Col>
  </Row>
)

const WithdrawalsTab = ({ value }: { value: unknown }) => {
  if (isEmptyValue(value)) return <EmptySection name="withdrawals" />
  if (!Array.isArray(value) || value.some((item) => !isRecord(item))) {
    return <StructuredData value={value} emptyName="withdrawals" />
  }

  return (
    <div className={style.dataGrid}>
      {value.map((withdrawal, index) => {
        const stakeAddress = scalarText(withdrawal.stake_address ?? withdrawal.stake_addr)
        const amount = scalarText(withdrawal.amount ?? withdrawal.value)
        const details = Object.fromEntries(
          Object.entries(withdrawal).filter(
            ([key]) => !["stake_address", "stake_addr", "amount", "value"].includes(key)
          )
        )
        return (
          <div key={index} className="shared-box">
            <div className="shared-box-inner bg-gray-100! dark:bg-gray-950!">
              <Informers.Explorer
                type="stakingAddress"
                value={stakeAddress === "—" ? undefined : stakeAddress}
                title="Stake Address"
              />
              <div className="mt-3">
                <Informers.Breakdown
                  items={[
                    {
                      title: "Amount",
                      children: <Informers.Ada value={amount === "—" ? "0" : amount} />,
                    },
                  ]}
                />
              </div>
              {!isEmptyValue(details) && (
                <div className={style.utxoDetail}>
                  <StructuredValue value={details} />
                </div>
              )}
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
    return <StructuredData value={value} emptyName="minted or burned assets" />
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
  return (
    <div className="shared-box">
      <div className="shared-box-inner bg-gray-100! dark:bg-gray-950!">
        <div className={style.rawToolbar}>
          <strong>Complete Koios Transaction</strong>
          <Copy copy={raw}>
            <span className="shared-link cursor-pointer inline-flex items-center">
              <DocumentDuplicateIcon className="size-4 me-1" strokeWidth={2} />
              Copy JSON
            </span>
          </Copy>
        </div>
        <pre className={style.rawCode}>{raw}</pre>
      </div>
    </div>
  )
}

export default function TransactionDetails({ transaction }: { transaction: TransactionInfo }) {
  return (
    <Tabs
      destroyOnHidden
      className={style.detailTabs}
      items={[
        { key: "utxos", label: <strong>UTXOs</strong>, children: <UtxoTab transaction={transaction} /> },
        {
          key: "metadata",
          label: <strong>Metadata</strong>,
          children: (
            <>
              <SectionTitle icon={<DocumentTextIcon className="size-5" strokeWidth={2} />}>Metadata</SectionTitle>
              <StructuredData value={transaction.metadata} emptyName="metadata" />
            </>
          ),
        },
        {
          key: "withdrawals",
          label: <strong>Withdrawals</strong>,
          children: (
            <>
              <SectionTitle icon={<BanknotesIcon className="size-5" strokeWidth={2} />}>
                Reward Withdrawals
              </SectionTitle>
              <WithdrawalsTab value={transaction.withdrawals} />
            </>
          ),
        },
        {
          key: "certificates",
          label: <strong>Certificates</strong>,
          children: (
            <>
              <SectionTitle icon={<IdentificationIcon className="size-5" strokeWidth={2} />}>Certificates</SectionTitle>
              <StructuredData value={transaction.certificates} emptyName="certificates" />
            </>
          ),
        },
        { key: "contracts", label: <strong>Contracts</strong>, children: <ContractsTab transaction={transaction} /> },
        {
          key: "token_mint",
          label: <strong>TokenMint</strong>,
          children: (
            <>
              <SectionTitle icon={<CircleStackIcon className="size-5" strokeWidth={2} />}>
                Minted and Burned Assets
              </SectionTitle>
              <MintTab value={transaction.assets_minted} />
            </>
          ),
        },
        {
          key: "collateral",
          label: <strong>Collateral</strong>,
          children: <CollateralTab transaction={transaction} />,
        },
        {
          key: "reference_inputs",
          label: <strong>InputRefs</strong>,
          children: (
            <>
              <SectionTitle icon={<LinkIcon className="size-5" strokeWidth={2} />}>Reference Inputs</SectionTitle>
              <UtxoList items={transaction.reference_inputs ?? []} emptyName="reference inputs" extended />
            </>
          ),
        },
        { key: "raw", label: <strong>Raw</strong>, children: <RawTab transaction={transaction} /> },
      ]}
    />
  )
}
