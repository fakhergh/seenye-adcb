export interface RawPaginatedResponse<T> {
  _embedded: {
    events: T[];
  };
  _links: {
    first: {
      href: string;
    };
    self: {
      href: string;
    };
    next: {
      href: string;
    };
    last: {
      href: string;
    };
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}
