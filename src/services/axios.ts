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
    // baseURL: "https://artemis-api-production.up.railway.app/api",
    baseURL: "http://localhost:3333/api",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  }) as APIInstanceProps;


  return api;
}
