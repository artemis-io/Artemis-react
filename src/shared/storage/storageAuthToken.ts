import { AUTH_TOKEN_STORAGE } from "./config";

export async function storageAuthTokenSave(token: string) {
  localStorage.setItem(AUTH_TOKEN_STORAGE, token);
}

export async function storageAuthTokenGet() {
  const token = localStorage.getItem(AUTH_TOKEN_STORAGE);

  return token;
}

export async function storageAuthTokenRemove() {
  localStorage.removeItem(AUTH_TOKEN_STORAGE);
}
