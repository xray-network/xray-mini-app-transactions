# xray-mini-app-cardano-transactions

The mini app uses the direct, versioned XRAY bridge namespaces. Platform status and preferences come
from `platformV1`, while Cardano tip, account, and explorer data come from `cardanoV1`; calls do not
require a handshake.

## Full transaction example

Run `npm run dev:example` to start the app on port 10003 with one deterministic, full-featured
transaction. This mode works without an XRAY host or Koios connection and provides representative
UTxO, metadata, withdrawal, certificate, contract, token mint/burn, collateral, reference-input,
and raw data for visual review of every transaction tab.

Example mode is development-only. Normal `npm run dev` and production builds continue to use the
XRAY bridge and the selected network's live Koios endpoint.
