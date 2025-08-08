export interface Event {
  id: string;
  name: string;
  date: string;
  imageUrl: string;
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
  _embedded?: {
    venues?: Array<{
      name: string;
      city?: { name: string };
      state?: { name: string };
    }>;
  };
}
