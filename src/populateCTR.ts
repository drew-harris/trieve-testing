import { Trieve } from "./client/index";
import type { SearchResponseBody } from "./client/types.gen";

const trieve = new Trieve({
  apiKey: "admin",
  baseUrl: "http://localhost:8090",
  debug: false,
});

const DATASET_ID = "c65a2dd7-298e-48e6-ac90-e336ccbbe74f";

for (let i = 0; i < 20; i++) {
  const results = (await trieve.fetch("/api/chunk/search", "post", {
    requestBody: {
      query: "lsij",
      search_type: "fulltext",
    },
    xApiVersion: "V2",
    trDataset: DATASET_ID,
  })) as SearchResponseBody;

  console.log(results);

  // Click on a result
  const response = await trieve.fetch("/api/analytics/ctr", "put", {
    requestBody: {
      ctr_type: "search",
      position: 2,
      clicked_chunk_id:
        results.chunks[Math.min(i, results.chunks.length - 1)].chunk.id,
      request_id: results.id as string,
    },
    trDataset: DATASET_ID,
  });

  console.log(response);
}

const ctrResults = await trieve.fetch("/api/analytics/ctr", "post", {
  requestBody: {
    type: "searches_with_clicks",
  },
  trDataset: DATASET_ID,
});

console.log(ctrResults);
