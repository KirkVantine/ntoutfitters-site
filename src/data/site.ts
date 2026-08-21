// Single source of truth for contact details and links. Everything on the
// site reads from here so a phone number or email only ever changes once.

export const site = {
  name: 'N&T Outfitters',
  legalName: 'N&T Outfitters LLC',
  tagline: 'Guided Fishing Charters',
  /** Full name with title — headings, first mentions, link previews. */
  captain: 'Captain Nathaniel TerBush',
  /** Bare name, for structured data where the title isn't part of the name. */
  captainName: 'Nathaniel TerBush',
  /** Conversational, for repeat mentions where the full name would read stiff. */
  captainShort: 'Captain Nathaniel',
  phone: '734-717-0773',
  phoneHref: 'tel:+17347170773',
  smsHref: 'sms:+17347170773',
  email: 'nathanielterbush@ntoutfitters.org',
  instagram: 'https://www.instagram.com/nt_outfitters/',
  instagramHandle: '@nt_outfitters',
  region: 'Southeast Michigan',
  areaServed: [
    'Lake St. Clair',
    'Detroit River',
    'Huron River Chain of Lakes',
    'Saginaw Bay',
    'Northern Michigan',
  ],
} as const;

/** Pre-filled booking email. `subject` keeps inquiries sortable in his inbox. */
export function mailto(subject: string, body?: string): string {
  const params = new URLSearchParams({ subject });
  if (body) params.set('body', body);
  // URLSearchParams encodes spaces as "+", which some mail clients show
  // literally in the subject line. %20 is safe everywhere.
  return `mailto:${site.email}?${params.toString().replace(/\+/g, '%20')}`;
}

/** Booking inquiry with the trip name and the questions he always has to ask. */
export function bookingHref(tripName: string): string {
  return mailto(
    `Booking inquiry: ${tripName}`,
    [
      `Trip: ${tripName}`,
      '',
      'Preferred date(s):',
      'Backup date(s):',
      'Number of anglers:',
      'Experience level:',
      'Name:',
      'Phone:',
      '',
      'Anything else I should know:',
    ].join('\n'),
  );
}

/**
 * Google Calendar appointment-schedule booking pages.
 *
 * Nathaniel connects Stripe to Google Calendar himself via OAuth — no API keys
 * are involved and none belong in this repo. Once he sends the public booking
 * link, drop it in `url` below and every "Book Now" button switches over at
 * once. Until then all of them stay as pre-filled email inquiries, so the site
 * is never in a broken half-state.
 *
 * If he sets up a separate schedule per trip, add them to `bySlug` keyed by the
 * trip slug from trips.ts; anything not listed falls back to `url`.
 */
export const booking = {
  url: null as string | null,
  bySlug: {} as Record<string, string>,
};

/**
 * The href for a trip's Book button: a real booking page when one is
 * configured, otherwise the email fallback.
 */
export function bookNowHref(trip: { slug: string; name: string }): string {
  return booking.bySlug[trip.slug] ?? booking.url ?? bookingHref(trip.name);
}

/** Booking pages are external; email links must not get target="_blank". */
export function isExternalBooking(trip: { slug: string }): boolean {
  return Boolean(booking.bySlug[trip.slug] ?? booking.url);
}
