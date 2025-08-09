import { httpClient } from '@/core/lib/httpClient';
import { RawEvent } from '@/core/types/event';
import { RawPaginatedResponse } from '@/core/types/response';

export interface GetEventsQueryParams {
  size?: number;
  page?: number;
  keyword?: string;
}

export async function getEvent(eventId: string): Promise<RawEvent> {
  const response = await httpClient.get(`/events/${eventId}`);

  return response.data;
}

export async function getEvents(
  queryParams: GetEventsQueryParams,
): Promise<RawPaginatedResponse<RawEvent>> {
  const response = await httpClient.get('/events', { params: queryParams });

  return response.data;
}
