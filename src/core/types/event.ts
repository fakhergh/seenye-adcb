interface RawVenue {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  images: {
    ratio: string;
    url: string;
    width: number;
    height: number;
    fallback: boolean;
  }[];
  postalCode: string;
  timezone: string;
  city: {
    name: string;
  };
  country: {
    name: string;
    countryCode: string;
  };
  address: {
    line1: string;
  };
  location: {
    longitude: string;
    latitude: string;
  };
}

interface Venue {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  location: {
    longitude: number;
    latitude: number;
  };
}

export interface RawEvent {
  id: string;
  name: string;
  url: string;
  images: Array<{
    url: string;
    ratio: string;
    width: number;
    height: number;
  }>;
  info: string;
  pleaseNote: string;
  dates: {
    start: {
      dateTime: string;
      localDate: string;
      localTime: string;
    };
    timezone: string;
  };
  seatmap: {
    staticUrl: string;
    id: string;
  };
  _embedded: {
    venues: Array<RawVenue>;
  };
}

export interface Event {
  id: string;
  name: string;
  date: string;
  imageUrl: string;
  venue: Venue;
}
