import axios from 'axios';

import {
  REACT_APP_INTEGRATION_PACIENTE_URL,
  REACT_APP_PACIENTE_URL,
  REACT_APP_BASE_URL,
  REACT_APP_TWILIO_ENDPOINT,
  REACT_APP_VONAGE_ENDPOINT,
  REACT_APP_API_KEY_VONAGE,
  REACT_APP_API_KEY_ZOOM,
  REACT_APP_API_SECRET_ZOOM,
  REACT_APP_API_KEY_ZENDESK,
} from '../env-files/env';

const api = axios.create({
  baseURL: REACT_APP_INTEGRATION_PACIENTE_URL,
  validateStatus: () => true,
});

const apiPaciente = axios.create({
  baseURL: REACT_APP_PACIENTE_URL,
});

const apiBaseURL = axios.create({
  baseURL: REACT_APP_BASE_URL,
  validateStatus: () => true,
});

// API Vídeo Chamada
const apiVonage = REACT_APP_VONAGE_ENDPOINT;

const apiTwilio = REACT_APP_TWILIO_ENDPOINT;

const apiKeyVonage = REACT_APP_API_KEY_VONAGE;

const apiKeyZoom = REACT_APP_API_KEY_ZOOM;

const apiSecretZoom = REACT_APP_API_SECRET_ZOOM;

const apiKeyZendesk = REACT_APP_API_KEY_ZENDESK;

api.interceptors.request.use((config) => {
  const { store } = require('../store');
  if (store.getState().chosenClinic?.clinicToken) {
    // config.headers = {
    //   token: store.getState().chosenClinic.clinicToken,
    // };
  }
  // bodyFormData.append('_so', Platform.OS);
  // bodyFormData.append('_version', DeviceInfo.getVersion());

  return config;
});

// api.interceptors.response.use((config) => {
//   console.log(config.status);
//   if (config.status >= 200 && config.status <= 300) {
//     return config;
//   }
//   if (config.status === 404) {
//     // navigate('Login');
//     Alert.alert('Erro', 'Rota não encontrada!');
//     return { status: false, data: null };
//   }
//   if (config.status >= 400 && config.status <= 403) {
//     // navigate('Login');
//     Alert.alert('Erro', 'Não autorizado, faça login novamente!');
//     return { status: false, data: null };
//   }
//   if (config.status >= 500) {
//     // navigate('Login');
//     Alert.alert(
//       'Erro',
//       'Erro interno do servidor, tente novamente mais tarde.'
//     );
//     return { status: false, data: null };
//   }
//   // navigate('Login');
//   Alert.alert('Erro', 'Sessão expirada!');
//   return { status: false, data: null };
// });

export default api;
export {
  apiPaciente,
  apiBaseURL,
  apiVonage,
  apiTwilio,
  apiKeyVonage,
  apiKeyZoom,
  apiSecretZoom,
  apiKeyZendesk,
};

// api - api integration paciente
