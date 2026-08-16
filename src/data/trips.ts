export interface Trip {
  slug: string;
  name: string;
  /** Short name for cards where the full name would wrap badly. */
  shortName?: string;
  water: string;
  species: string;
  duration: string;
  price: string;
  blurb: string;
  image: string;
  /** Grouping used on the Charters page. */
  group: 'Signature Trips' | 'Half Day Trips' | 'Family & Getaways';
  /** Shown as "Request to Book" rather than "Book Now". */
  requestOnly?: boolean;
  featured?: boolean;
}

// Trip names, durations, and prices are migrated from the live Wix
// "Book Online" service list. Prices move season to season — confirm with the
// captain before publishing. The blurbs are new copy written for this rebuild
// and should get his sign-off too.
export const trips: Trip[] = [
  {
    slug: 'lake-st-clair-bass',
    name: 'Lake St Clair Bass Trip',
    shortName: 'Lake St. Clair Bass',
    water: 'Lake St. Clair',
    species: 'Smallmouth bass',
    duration: '8 hours',
    price: 'From $500',
    blurb:
      'A full day on one of the best smallmouth fisheries in the country. Clear water, hard-pulling fish, and plenty of room to move if the wind changes.',
    image: '/images/gallery-01.jpg',
    group: 'Signature Trips',
    featured: true,
  },
  {
    slug: 'detroit-river-walleye',
    name: 'Detroit River Walleye Fishing Trip',
    shortName: 'Detroit River Walleye',
    water: 'Detroit River',
    species: 'Walleye',
    duration: '6 hours',
    price: 'From $500',
    blurb:
      'The Detroit River walleye run is a Michigan tradition. Vertical jigging in current, with fast action when the fish are stacked up.',
    image: '/images/gallery-05.jpg',
    group: 'Signature Trips',
    featured: true,
  },
  {
    slug: 'huron-chain-bass',
    name: 'Huron River Chain of Lakes Bass Trip',
    shortName: 'Huron Chain Bass',
    water: 'Huron River Chain of Lakes',
    species: 'Largemouth & smallmouth bass',
    duration: '8 hours',
    price: 'From $250',
    blurb:
      'Protected inland water close to home, which makes it the right call on a windy day and a great place to learn. A full day at the friendliest price on the board.',
    image: '/images/gallery-10.jpg',
    group: 'Signature Trips',
    featured: true,
  },
  {
    slug: 'saginaw-bay-bass',
    name: 'Saginaw Bay Bass Fishing',
    shortName: 'Saginaw Bay Bass',
    water: 'Saginaw Bay',
    species: 'Smallmouth bass',
    duration: '6 hours',
    price: 'From $500',
    blurb:
      'Big water, big smallmouth. Saginaw Bay rewards covering ground, and the Nitro gets you to the fish quickly.',
    image: '/images/gallery-07.jpg',
    group: 'Signature Trips',
  },
  {
    slug: 'perch-fishing',
    name: 'Perch Fishing Trip',
    water: 'Michigan lakes',
    species: 'Yellow perch',
    duration: '6 hours',
    price: 'From $375',
    blurb:
      'Steady bites, simple technique, and the best eating fish in the state. A favorite with families and first-timers.',
    image: '/images/gallery-11.jpg',
    group: 'Family & Getaways',
  },
  {
    slug: 'kids-fishing-lesson',
    name: 'Kids Fishing Lesson',
    water: 'Local water',
    species: 'Whatever is biting',
    duration: '3 hours',
    price: '$100',
    blurb:
      'A patient, hands-on introduction for anglers 16 and under. Knot tying, casting, and reading the water — plus catching fish.',
    image: '/images/gallery-04.jpg',
    group: 'Family & Getaways',
    requestOnly: true,
  },
  {
    slug: 'northern-michigan-weekend',
    name: 'Northern Michigan Weekend Bass Trip',
    shortName: 'Northern MI Weekend',
    water: 'Northern Michigan',
    species: 'Smallmouth & largemouth bass',
    duration: '2 days',
    price: 'Price varies',
    blurb:
      'Two days up north on the clearest water in the state. Built around your schedule — reach out and we will put a plan together.',
    image: '/images/gallery-09.jpg',
    group: 'Family & Getaways',
  },
  {
    slug: 'half-day-lake-st-clair-bass',
    name: '1/2 Day Lake St Clair Bass Trip',
    shortName: '1/2 Day Lake St. Clair',
    water: 'Lake St. Clair',
    species: 'Smallmouth bass',
    duration: '4 hours',
    price: 'From $400',
    blurb: 'The same world-class smallmouth water, in a morning or an afternoon.',
    image: '/images/gallery-03.jpg',
    group: 'Half Day Trips',
  },
  {
    slug: 'half-day-detroit-river-walleye',
    name: '1/2 Day Detroit River Walleye Trip',
    shortName: '1/2 Day Detroit River',
    water: 'Detroit River',
    species: 'Walleye',
    duration: '4 hours',
    price: 'From $400',
    blurb: 'A short, focused run at the walleye bite — ideal when the fish are close and thick.',
    image: '/images/gallery-06.jpg',
    group: 'Half Day Trips',
  },
  {
    slug: 'half-day-northern-michigan-bass',
    name: 'Northern Michigan 1/2 Day Bass Trip',
    shortName: '1/2 Day Northern MI',
    water: 'Northern Michigan',
    species: 'Smallmouth & largemouth bass',
    duration: '4 hours',
    price: 'Price varies',
    blurb: 'A half day up north, perfect to tack onto a weekend at the cottage.',
    image: '/images/gallery-08.jpg',
    group: 'Half Day Trips',
  },
];

export const tripGroups = ['Signature Trips', 'Half Day Trips', 'Family & Getaways'] as const;

export const featuredTrips = trips.filter((t) => t.featured);
