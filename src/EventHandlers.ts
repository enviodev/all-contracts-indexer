import { Greeter, onBlock } from "generated";
import { experimental_createEffect, S } from "envio";
import { HypersyncClient, TraceField } from "@envio-dev/hypersync-client";

const client = HypersyncClient.new({
  url: "https://1-traces.hypersync.xyz",
});

Greeter.NewGreeting.handler(async (_) => {
  // Keep it just to make the block handler work
});

const getCreatedContracts = experimental_createEffect(
  {
    name: "getCreatedContracts",
    input: S.tuple((ctx) => ({
      fromBlock: ctx.item(0, S.number),
      toBlock: ctx.item(1, S.number),
    })),
    output: S.array(
      S.schema({
        id: S.string,
        startBlock: S.number,
      })
    ),
  },
  async ({ input }) => {
    const result = [];
    let nextBlock = input.fromBlock;
    while (nextBlock < input.toBlock) {
      const data = await client.get({
        fromBlock: nextBlock,
        toBlock: input.toBlock,
        traces: tracesFilter,
        fieldSelection: tracesFieldSelection,
      });
      nextBlock = data.nextBlock;
      for (const trace of data.data.traces) {
        if (!trace.address) continue;
        if (!trace.blockNumber) continue;
        result.push({
          id: trace.address,
          startBlock: trace.blockNumber,
        });
      }
    }
    return result;
  }
);

const interval = 1000;
const tracesFilter = [{ kind: ["create"] }];
const tracesFieldSelection = {
  trace: [TraceField.BlockNumber, TraceField.Address],
};
onBlock(
  {
    name: "onBlock",
    chain: 1,
    interval,
    startBlock: 0,
    endBlock: 20000000,
  },
  async ({ context, block }) => {
    const contracts = await context.effect(getCreatedContracts, {
      fromBlock: block.number,
      toBlock: block.number + interval - 1,
    });
    for (const contract of contracts) {
      context.Contract.set(contract);
    }
  }
);
