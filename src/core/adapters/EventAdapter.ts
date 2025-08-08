import { Event, RawEvent } from '@/core/types/event';

export const EventAdapter = {
  /**
   * Converts a raw API event object into a normalized Event object for frontend use.
   *
   * @param raw - The raw event object from the API, typically includes nested fields.
   * @returns A simplified Event object containing:
   *          - `id`: Unique identifier of the event.
   *          - `name`: Name of the event.
   *          - `date`: Date and time of the event, extracted from nested fields.
   */
  fromApi(raw: RawEvent): Event {
    const rawVenue = raw._embedded.venues[0];

    return {
      // Directly map the event's ID
      id: raw.id,

      // Map the event's name
      name: raw.name,

      // Extract the date and time from a nested structure (e.g., raw.dates.start.dateTime)
      date: raw.dates.start.dateTime,

      imageUrl: raw.images[0].url,

      venue: {
        id: rawVenue.id,
        name: rawVenue.name,
        city: rawVenue.city.name,
        country: rawVenue.country.name,
        address: rawVenue.address.line1,
        location: {
          latitude: Number(rawVenue.location.latitude),
          longitude: Number(rawVenue.location.longitude),
        },
      },
    };
  },
};
