import { PaginatedResponse, RawPaginatedResponse } from '@/core/types/response';

export const PaginationAdapter = {
  /**
   * Transforms a raw paginated API response into a structured PaginatedResponse.
   *
   * @param raw - The raw paginated response returned by the API.
   *              Expected to contain an `_embedded` object with an `events` array,
   *              and a `page` object with pagination metadata.
   * @returns A PaginatedResponse object with:
   *          - `items`: the array of events extracted from `_embedded.events`
   *          - All properties from the `page` object (e.g., number, size, totalElements, totalPages)
   */
  fromApi<T>(raw: RawPaginatedResponse<T>): PaginatedResponse<T> {
    return {
      // Map the list of items (assumed to be under `_embedded.events`)
      items: raw._embedded.events,

      // Spread the pagination details from the `page` object into the result
      ...raw.page,
    };
  },
};
