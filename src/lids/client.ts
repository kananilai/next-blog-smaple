import { createClient } from "microcms-js-sdk"; //ES6

export const client = createClient({
  serviceDomain: "nextjs-blog-sm",
  apiKey: process.env.API_KEY,
});
