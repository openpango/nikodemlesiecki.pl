const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
});

async function check() {
  const locations = await client.fetch(`*[_type == "location"]{ _id, "country": country.en, cityOrRegion }`);
  console.log("Locations in Sanity:", locations);
}

check();
