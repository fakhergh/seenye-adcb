import { httpClient } from '@/core/lib/httpClient';
import { RawEvent } from '@/core/types/event';
import { RawPaginatedResponse } from '@/core/types/response';

export async function getEvents({
  page,
}: any): Promise<RawPaginatedResponse<RawEvent>> {
  const response = await httpClient.get('/events.json', {
    params: {
      page,
      //sort: 'date,asc',
      //startDateTime: '2025-08-07T13:02:10Z',
    },
  });

  return response.data;
}
