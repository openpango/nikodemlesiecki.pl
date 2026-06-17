const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
});

const newLocations = [
  // England
  {
    _type: 'location',
    country: { en: 'England', pl: 'Anglia' },
    cityOrRegion: 'London',
    coordinates: { lat: 51.5074, lng: -0.1278 },
    description: { en: 'The city that never sleeps', pl: 'Miasto, które nigdy nie śpi' },
    status: 'visited',
  },
  {
    _type: 'location',
    country: { en: 'England', pl: 'Anglia' },
    cityOrRegion: 'Luton',
    coordinates: { lat: 51.8787, lng: -0.4200 },
    description: { en: 'Visited', pl: 'Odwiedzone' },
    status: 'visited',
  },
  // Spain
  {
    _type: 'location',
    country: { en: 'Spain', pl: 'Hiszpania' },
    cityOrRegion: 'Barcelona',
    coordinates: { lat: 41.3851, lng: 2.1734 },
    description: { en: 'Gaudí and Mediterranean vibes', pl: 'Gaudí i śródziemnomorski klimat' },
    status: 'visited',
  },
  {
    _type: 'location',
    country: { en: 'Spain', pl: 'Hiszpania' },
    cityOrRegion: 'Malaga',
    coordinates: { lat: 36.7213, lng: -4.4214 },
    description: { en: 'Sunny Costa del Sol', pl: 'Słoneczne Costa del Sol' },
    status: 'visited',
  },
  {
    _type: 'location',
    country: { en: 'Spain', pl: 'Hiszpania' },
    cityOrRegion: 'Marbella',
    coordinates: { lat: 36.5101, lng: -4.8824 },
    description: { en: 'Beautiful beaches', pl: 'Piękne plaże' },
    status: 'visited',
  },
  // Portugal
  {
    _type: 'location',
    country: { en: 'Portugal', pl: 'Portugalia' },
    cityOrRegion: 'Lisbon',
    coordinates: { lat: 38.7223, lng: -9.1393 },
    description: { en: 'Pastéis de nata and hills', pl: 'Pastéis de nata i wzgórza' },
    status: 'visited',
  },
  {
    _type: 'location',
    country: { en: 'Portugal', pl: 'Portugalia' },
    cityOrRegion: 'Cascais',
    coordinates: { lat: 38.6979, lng: -9.4215 },
    description: { en: 'Coastal beauty', pl: 'Nadbrzeżne piękno' },
    status: 'visited',
  },
  {
    _type: 'location',
    country: { en: 'Portugal', pl: 'Portugalia' },
    cityOrRegion: 'Almada',
    coordinates: { lat: 38.6803, lng: -9.1583 },
    description: { en: 'Across the Tagus river', pl: 'Po drugiej stronie rzeki Tag' },
    status: 'visited',
  },
];

async function seed() {
  console.log('Fetching existing locations...');
  const existing = await client.fetch(`*[_type == "location"]`);
  
  console.log('Finding broad entries to delete...');
  const toDelete = existing.filter(loc => 
    !loc.cityOrRegion && 
    ['Spain', 'England', 'Portugal'].includes(loc.country?.en)
  );
  
  const transaction = client.transaction();
  
  for (const loc of toDelete) {
    console.log(`Deleting broad entry: ${loc.country?.en} (${loc._id})`);
    transaction.delete(loc._id);
  }
  
  for (const newLoc of newLocations) {
    console.log(`Adding specific city: ${newLoc.cityOrRegion}, ${newLoc.country.en}`);
    transaction.create(newLoc);
  }
  
  console.log('Committing transaction...');
  await transaction.commit();
  console.log('Success! Locations updated.');
}

seed().catch(console.error);
