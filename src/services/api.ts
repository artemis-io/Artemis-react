import axios, { AxiosInstance } from "axios";

import {
  AUTH_REFRESH_STORAGE,
  AUTH_TOKEN_STORAGE,
} from "../shared/storage/config";
import { refreshAccessTokenRequest } from "../services/auth";

interface RegisterInterceptTokenManager {
  signOut: () => void;
}

interface APIInstanceProps extends AxiosInstance {
  registerInterceptTokenManager: ({
    signOut,
  }: RegisterInterceptTokenManager) => void;
}

export const apiMed = axios.create({
/*   baseURL: "http://localhost:3333/api", */
  baseURL: "https://artemis-api-production.up.railway.app/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
}) as APIInstanceProps;

// Interceptor for refreshing access token
let isRefreshing = false;
let refreshSubscribers: ((accessToken: string) => void)[] = [];

apiMed.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;

        // Perform the refresh token request
        const refreshToken = localStorage.getItem(AUTH_REFRESH_STORAGE);
        if (refreshToken) {
          refreshAccessTokenRequest(refreshToken)
            .then((response) => {
              if (response.accessToken) {
                // Update the access token in local storage
                localStorage.setItem(AUTH_TOKEN_STORAGE, response.accessToken);

                // Execute all the pending requests with the new token
                refreshSubscribers.forEach((callback) =>
                  callback(response.accessToken)
                );
                refreshSubscribers = [];

                // Retry the original request
                originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;
                return apiMed.request(originalRequest);
              }
            })
            .catch(() => {
              // Handle refresh token failure (e.g., log out user)
            })
            .finally(() => {
              isRefreshing = false;
            });
        }
      }

      return new Promise((resolve) => {
        refreshSubscribers.push((accessToken) => {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          resolve(apiMed.request(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

function registerInterceptTokenManager({
  signOut,
}: RegisterInterceptTokenManager) {
  refreshSubscribers = []; // Reset subscribers on sign out
  // Define other management logic as needed
}

apiMed.registerInterceptTokenManager = registerInterceptTokenManager;
