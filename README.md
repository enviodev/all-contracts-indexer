# All Contracts Indexer

[![Discord](https://img.shields.io/badge/Discord-Join%20Chat-7289da?logo=discord&logoColor=white)](https://discord.com/invite/envio)

An [Envio HyperIndex](https://docs.envio.dev/docs/HyperIndex/overview) indexer that tracks every contract deployment on Ethereum Mainnet and Gnosis Chain. Built as a reference example of indexing factory and deployment patterns at scale.

## What This Indexes

- All contracts created via `ContractCreated` events on Ethereum Mainnet and Gnosis Chain
- Contract address, deployer, deployment transaction, and block data

## Use Cases

- Track all contract deployments across a chain
- Analyze deployment patterns and trends
- Build a contract registry or explorer
- Reference implementation for indexing at high volume

## Prerequisites

- [Node.js](https://nodejs.org/en/download/current) v22 or newer
- [pnpm](https://pnpm.io/installation) v8 or newer
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Quick Start

```bash
# Install dependencies
pnpm install

# Run locally (starts indexer + GraphQL API at http://localhost:8080)
pnpm dev
```

The GraphQL Playground is available at [http://localhost:8080](http://localhost:8080). Local password: `testing`.

## Regenerate Files

```bash
pnpm codegen
```

## Built With

- [Envio HyperIndex](https://docs.envio.dev/docs/HyperIndex/overview) - multichain indexing framework
- [HyperSync](https://docs.envio.dev/docs/HyperSync/overview) - high-performance blockchain data retrieval

## Documentation

- [HyperIndex Docs](https://docs.envio.dev/docs/HyperIndex/overview)
- [Getting Started with HyperIndex](https://docs.envio.dev/docs/HyperIndex/getting-started)
- [Envio Explorer](https://envio.dev/explorer) - more example indexers

## Support

- [Discord community](https://discord.com/invite/envio)
- [Envio Docs](https://docs.envio.dev)
