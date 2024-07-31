import { DATASET_ID, formatDateForApi, trieve } from "./trieve";

const result = await trieve.fetch("/api/analytics/search", "post", {
  requestBody: {
    type: "rps_graph",
    filter: {
      date_range: {
        // 5 minutes ago
        gt: formatDateForApi(new Date(Date.now() - 5 * 60 * 1000)),
      },
    },
    granularity: "minute",
  },
  trDataset: DATASET_ID,
});

console.log(result);
