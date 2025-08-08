import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { EventAdapter } from '@/core/adapters/EventAdapter';
import { PaginationAdapter } from '@/core/adapters/PaginationAdapter';
import { getEvents } from '@/core/services/ApiService';
import { Event } from '@/core/types/event';
import { PaginatedResponse } from '@/core/types/response';

export interface GetEventsQueryParams {
  page?: number;
}

export function useGetEvents({ page }: GetEventsQueryParams = {}) {
  return useInfiniteQuery<PaginatedResponse<Event>, AxiosError>({
    queryKey: ['events'],
    queryFn: async ({ pageParam }) => {
      const rawResponse = await getEvents({ page: pageParam });

      const paginatedRaw = PaginationAdapter.fromApi(rawResponse);

      return {
        ...paginatedRaw,
        items: paginatedRaw.items.map(EventAdapter.fromApi),
      };
    },
    getNextPageParam: lastPage => {
      const { number: currentPage, totalPages } = lastPage;
      const nextPage = currentPage + 1;

      return nextPage < totalPages ? nextPage : undefined;
    },
    initialPageParam: page ?? 0,
  });
}
