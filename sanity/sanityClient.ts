import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2024-03-06",
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
});
