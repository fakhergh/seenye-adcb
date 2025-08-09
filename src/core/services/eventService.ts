import type { InfiniteData } from '@tanstack/query-core';
import {
  DefinedInitialDataInfiniteOptions,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { EventAdapter } from '@/core/adapters/EventAdapter';
import { PaginationAdapter } from '@/core/adapters/PaginationAdapter';
import {
  getEvent,
  getEvents,
  GetEventsQueryParams,
} from '@/core/services/apiService';
import { Event } from '@/core/types/event';
import { PaginatedResponse } from '@/core/types/response';

export function useGetEvent(eventId: string) {
  return useQuery({
    queryKey: ['event', eventId],
    queryFn: async () => {
      const rawResponse = await getEvent(eventId);

      return EventAdapter.fromApi(rawResponse);
    },
  });
}

export function useGetEvents(
  { keyword, size }: Omit<GetEventsQueryParams, 'page'> = { size: 10 },
  options?: Pick<
    DefinedInitialDataInfiniteOptions<
      PaginatedResponse<Event>,
      AxiosError,
      InfiniteData<PaginatedResponse<Event>>,
      any,
      number
    >,
    'enabled'
  >,
) {
  return useInfiniteQuery<
    PaginatedResponse<Event>,
    AxiosError,
    InfiniteData<PaginatedResponse<Event>>,
    any,
    number
  >({
    ...options,
    queryKey: ['events', size, keyword],
    queryFn: async ({ pageParam }) => {
      const rawResponse = await getEvents({ page: pageParam, keyword, size });

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
    initialPageParam: 0,
  });
}
