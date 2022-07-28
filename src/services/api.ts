import axios from 'axios';

import {
  REACT_APP_VONAGE_ENDPOINT,
  REACT_APP_API_KEY_VONAGE,
} from '../env-files/env';

const apiVonageURL = axios.create({
  baseURL: REACT_APP_VONAGE_ENDPOINT,
  validateStatus: () => true,
});

const apiKeyVonage = REACT_APP_API_KEY_VONAGE;

export { apiKeyVonage, apiVonageURL };
