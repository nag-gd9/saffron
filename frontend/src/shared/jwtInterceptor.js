import axios from "axios";
import store from '../store/index';
 
const jwtInterceptor = axios.create({});
 
 
jwtInterceptor.interceptors.request.use((config) => {
    const authData = store.getters["auth/getAuthData"];
    if (authData == null) {
      return config;
    }
  
    config.headers.common["Authorization"] = 'bearer ${authData.token}';
    return config;
  });
  
  jwtInterceptor.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response.status === 401) {
        const authData = store.getters["auth/getAuthData"];
        const payload = {
          access_token: authData.access_token,
          refresh_token: authData.refreshToken,
        };
  
        var response = await axios.post(
          "https://8000-naggd9-saffron-odav1i506ko.ws-us31.gitpod.io/api/refreshtoken",
          payload
        );
        await store.dispatch("auth/saveTokensToStorage", response.data);
        error.config.headers[
          "Authorization"
        ] = `bearer ${response.data.access}`;
        return axios(error.config);
      } else {
        return Promise.reject(error);
      }
    }
  );
  
  export default jwtInterceptor;
