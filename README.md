# All Contracts Indexer

[![Discord](https://img.shields.io/badge/Discord-Join%20Chat-7289da?logo=discord&logoColor=white)](https://discord.com/invite/envio)

An [Envio HyperIndex](https://docs.envio.dev/docs/HyperIndex/overview) indexer that tracks every contract deployment on Ethereum Mainnet and Gnosis Chain. Uses HyperSync's traces endpoint to detect contract creations across both chains.

## What's Indexed

The GraphQL API exposes every contract deployment including contract address, deployer address, deployment transaction, and block data across Ethereum Mainnet (chain ID 1) and Gnosis Chain (chain ID 100). Data is sourced from execution traces via HyperSync's dedicated traces endpoint.

This is a useful reference implementation for trace-based indexing at scale, and a starting point for building contract registries, deployment analytics tools, or chain explorers.

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
- [HyperSync](https://docs.envio.dev/docs/HyperSync/overview) - high-performance blockchain data retrieval (traces endpoint)

## Documentation

- [HyperIndex Docs](https://docs.envio.dev/docs/HyperIndex/overview)
- [Getting Started with HyperIndex](https://docs.envio.dev/docs/HyperIndex/getting-started)
- [More Example Indexers](https://envio.dev/explorer)

## Support

- [Discord community](https://discord.com/invite/envio)
- [Envio Docs](https://docs.envio.dev)
