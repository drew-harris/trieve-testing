import { Trieve } from "./client/index";

export const trieve = new Trieve({
  apiKey: "admin",
  baseUrl: "http://localhost:8090",
  debug: false,
});

export const DATASET_ID = "c65a2dd7-298e-48e6-ac90-e336ccbbe74f";
