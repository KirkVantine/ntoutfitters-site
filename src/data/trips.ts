export interface Trip {
  name: string;
  duration: string;
  price: string;
  requestOnly?: boolean;
}

// Migrated from the live Wix "Book Online" service list. Durations and
// prices are what the site currently shows — confirm with the captain
// before publishing, since these change season to season.
export const trips: Trip[] = [
  { name: 'Lake St Clair Bass Trip', duration: '8 hr', price: 'From $500' },
  { name: 'Detroit River Walleye Fishing Trip', duration: '6 hr', price: 'From $500' },
  { name: 'Huron River Chain of Lakes Bass Trip', duration: '8 hr', price: 'From $250' },
  { name: 'Kids Fishing Lesson', duration: '3 hr', price: '$100', requestOnly: true },
  { name: 'Northern Michigan Weekend Bass Trip', duration: '2 days', price: 'Price varies' },
  { name: '1/2 Day Lake St Clair Bass Trip', duration: '4 hr', price: 'From $400' },
  { name: '1/2 Day Detroit River Walleye Trip', duration: '4 hr', price: 'From $400' },
  { name: 'Perch Fishing Trip', duration: '6 hr', price: 'From $375' },
  { name: 'Saginaw Bay Bass Fishing', duration: '6 hr', price: 'From $500' },
  { name: 'Northern Michigan 1/2 Day Bass Trip', duration: '4 hr', price: 'Price varies' },
];
