import { TICKET_MASTER_API_KEY, TICKET_MASTER_BASE_URL } from '@env';
import axios from 'axios';

const httpClient = axios.create({ baseURL: TICKET_MASTER_BASE_URL });

// Add a request interceptor to automatically include the API key in all requests
httpClient.interceptors.request.use(
  config => {
    // Ensure the params object exists
    if (!config.params) {
      config.params = {};
    }

    // Append the Ticketmaster API key to every request as a query parameter
    config.params.apikey = TICKET_MASTER_API_KEY;

    // Return the updated config object
    return config;
  },
  // Handle any errors that occur during request configuration
  error => {
    return Promise.reject(error);
  },
);

export { httpClient };
