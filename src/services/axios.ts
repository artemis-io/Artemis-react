/* eslint-disable no-empty-pattern */
import axios, { AxiosInstance } from "axios";
import { refreshAccessTokenRequest } from "./auth";
import {
  AUTH_REFRESH_STORAGE,
  AUTH_TOKEN_STORAGE,
} from "../shared/storage/config";

interface RegisterInterceptTokenManager {
  signOut: () => void;
}

interface APIInstanceProps extends AxiosInstance {
  registerInterceptTokenManager: ({}: RegisterInterceptTokenManager) => () => void;
}

export function getApiClient() {
  const api = axios.create({
    baseURL: "http://localhost:3333/api",

    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  }) as APIInstanceProps;

  api.registerInterceptTokenManager = ({ signOut }) => {
    const interceptTokenManager = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 && !error.config._retry) {
          const refreshToken = localStorage.getItem(AUTH_REFRESH_STORAGE);

          if (refreshToken) {
            try {
              const response = await refreshAccessTokenRequest(refreshToken);

              const newAccessToken = response.accessToken;
              const newRefreshToken = response.refreshToken;

              localStorage.setItem(AUTH_TOKEN_STORAGE, newAccessToken);
              localStorage.setItem(AUTH_REFRESH_STORAGE, newRefreshToken);

              api.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${newAccessToken}`;

              // Retry the original request with the new updated token
              return api(error.config);
            } catch (refreshError) {
              signOut();
            }
          }
        }

        return Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.response.eject(interceptTokenManager);
    };
  };

  return api;
}
