# NFT Marketplace

A full-stack NFT Marketplace on Solana

<img width="1640" height="808" alt="image" src="https://github.com/user-attachments/assets/b5d688c3-77b1-47af-a2fe-fcec62a91f0d" />

## 📂 Project Structure

- **`apps/web`**: Frontend application (React, Vite, Tailwind CSS).
- **`apps/api`**: Backend application (Cloudflare Workers, Hono/Express-like).
- **`contracts`**: Solana Smart Contracts (Anchor Framework).

## 🛠 Prerequisites

- **Node.js** (v18+ recommended)
- **pnpm** (or npm/yarn)
- **Rust** (for Anchor)
- **Solana CLI** ([Install Guide](https://docs.solana.com/cli/install-solana-cli-tools))
- **Anchor CLI** ([Install Guide](https://www.anchor-lang.com/docs/installation))
- **Phantom Wallet** (or any Solana wallet extension) installed in your browser.

## 🚀 Getting Started

### 1. Install Dependencies

Run this from the root directory to install dependencies for all workspaces:

```bash
npm install
# OR
pnpm install
```

### 2. Smart Contract Setup (Anchor)

Before running the app, you must deploy the smart contract to the Solana Devnet.

1.  **Navigate to contracts:**
    ```bash
    cd contracts
    ```

2.  **Build the program:**
    ```bash
    anchor build
    ```

3.  **Get the new Program ID:**
    ```bash
    solana address -k target/deploy/nftmarketplace-keypair.json
    ```

4.  **Update the Program ID in the code:**
    Copy the address you just got and replace the existing one in:
    *   `contracts/Anchor.toml` (key: `nftmarketplace`)
    *   `contracts/programs/nftmarketplace/src/lib.rs` (inside `declare_id!(...)`)
    *   `apps/api/src/escrow.ts` (variable: `ESCROW_PROGRAM_ID`)

5.  **Re-build and Deploy:**
    ```bash
    anchor build
    anchor deploy
    ```

    *Note: Ensure you are on Devnet (`solana config set --url devnet`) and have some SOL (`solana airdrop 2`).*

### 3. Backend Setup (Cloudflare Worker)

1.  **Start the backend:**
    From the root directory:
    ```bash
    npm run dev:api
    ```
    This starts the worker on `http://localhost:8787`.

    *Note: If you deployed a new program, ensure you updated the ID in `apps/api/src/escrow.ts`.*

### 4. Frontend Setup

1.  **Start the frontend:**
    From the root directory (in a new terminal):
    ```bash
    npm run dev:web
    ```
    This starts the web app on `http://localhost:5173`.

2.  **Connect Wallet:**
    Open the URL, connect your Phantom wallet (set to Devnet), and start testing!

## 📜 Scripts Reference

Run these from the root directory:

| Command | Description |
| :--- | :--- |
| `npm run dev:web` | Starts the React Frontend |
| `npm run dev:api` | Starts the Backend Worker |
| `npm run test:contracts` | Runs Anchor tests |
| `npm run build:web` | Builds Frontend for production |
| `npm run deploy:api` | Deploys Backend to Cloudflare |

## ⚠️ Important Notes

*   **API URL:** The frontend expects the backend to be running at `http://localhost:8787`. If your worker runs on a different port, update `apps/web/src/services/api.ts`.
*   **Wallet:** Ensure your wallet is set to **Devnet**.
