import { onBlock } from "generated";
import { createEffect, S } from "envio";
import {
  HypersyncClient,
  type FieldSelection,
  type TraceSelection,
} from "@envio-dev/hypersync-client";

const client = new HypersyncClient({
  url: "https://1-traces.hypersync.xyz",
  apiToken: process.env.ENVIO_API_TOKEN!,
});

const tracesFilter = [
  { include: { type: ["create"] } },
] as const satisfies TraceSelection[];
const fieldSelection = {
  transaction: ["BlockNumber", "ContractAddress"],
  trace: ["BlockNumber", "Address"],
} as const satisfies FieldSelection;

const getCreatedContracts = createEffect(
  {
    name: "getCreatedContracts",
    input: S.tuple((ctx) => ({
      fromBlock: ctx.item(0, S.number),
      toBlock: ctx.item(1, S.number),
    })),
    output: S.array(
      S.schema({
        id: S.string,
        blockNumber: S.number,
      })
    ),
    rateLimit: false,
  },
  async ({ input }) => {
    const result = [];
    let nextBlock = input.fromBlock;
    while (nextBlock < input.toBlock) {
      const data = await client.get({
        fromBlock: nextBlock,
        toBlock: input.toBlock,
        traces: tracesFilter,
        fieldSelection: fieldSelection,
      });
      nextBlock = data.nextBlock;
      for (const trace of data.data.traces) {
        if (!trace.address) continue;
        if (!trace.blockNumber) continue;
        result.push({
          id: trace.address,
          blockNumber: trace.blockNumber,
        });
      }
      for (const transaction of data.data.transactions) {
        if (!transaction.contractAddress) continue;
        if (!transaction.blockNumber) continue;
        result.push({
          id: transaction.contractAddress,
          blockNumber: transaction.blockNumber,
        });
      }
    }
    return result;
  }
);

const interval = 200;
const maxReorgThreshold = 200;
const safeBlock = (await client.getHeight()) - maxReorgThreshold;

const makeBlockHandler =
  (interval: number): Parameters<typeof onBlock>[1] =>
  async ({ context, block }) => {
    const contracts = await context.effect(getCreatedContracts, {
      fromBlock: block.number,
      toBlock: block.number + interval - 1,
    });
    for (const contract of contracts) {
      context.Contract.set(contract);
    }
  };

onBlock(
  {
    name: "onBlock",
    chain: 1,
    interval,
    startBlock: 1, // Start block 0 doesn't show in the UI in a good way
    endBlock: safeBlock,
  },
  makeBlockHandler(interval)
);
onBlock(
  {
    name: "onBlock",
    chain: 1,
    interval: 1,
    // This + interval is needed, because the historical block handler
    // processes block forward to the current block
    startBlock: safeBlock + interval,
  },
  makeBlockHandler(1)
);
