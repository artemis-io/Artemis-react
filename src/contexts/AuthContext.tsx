/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import {
  AUTH_REFRESH_STORAGE,
  AUTH_TOKEN_STORAGE,
  USER_STORAGE,
} from "../shared/storage/config";
import { refreshAccessTokenRequest, signInRequest } from "../services/auth";
import { loginProps } from "../shared/types";
import { UserAuth } from "../shared/interface";
import { apiMed } from "../services/api";

export type User = {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  role: string;
  first_time: boolean;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoadingUserStorageData: boolean;
  signIn: (data: loginProps) => Promise<User | null>;
  signOut: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

const setUserStorage = (user: UserAuth) => {
  localStorage.setItem(USER_STORAGE, JSON.stringify(user));
};

const setTokensStorage = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(AUTH_TOKEN_STORAGE, accessToken);
  localStorage.setItem(AUTH_REFRESH_STORAGE, refreshToken);
};

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const router = useNavigate();

  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem(USER_STORAGE);
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const isAuthenticated = !!user;

  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState(true);

  const signIn = async ({
    email,
    password,
  }: loginProps): Promise<UserAuth | null> => {
    try {
      const data = await signInRequest({ email, password });

      setUser(data.user);
      setUserStorage(data.user);
      setTokensStorage(data.tokens.accessToken, data.tokens.refreshToken);

      if (data.user.first_time) {        
        router(`/${data.user.role}/profile`);
        await apiMed.post(`/user/first_time`, {
          headers: {
            Authorization: `Bearer ${data.tokens.accessToken}`,
          },
        });
      } else {
        router(`/${data.user.role}/homepage`);
      }

      return data.user;
    } catch (error) {
      console.error("Erro durante a autenticação:", error);
      throw new Error("Erro durante a autenticação");
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      localStorage.removeItem(USER_STORAGE);
      localStorage.removeItem(AUTH_TOKEN_STORAGE);
      localStorage.removeItem(AUTH_REFRESH_STORAGE);
      setUser(null);
      apiMed.defaults.headers["Authorization"] = "";
      router("/signIn");
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_STORAGE);
    const refreshToken = localStorage.getItem(AUTH_REFRESH_STORAGE);

    if (token && refreshToken) {
      const refreshAccessToken = async () => {
        const decodedToken: any = jwtDecode(token);
        const currentTimestamp = Date.now() / 1000;

        if (decodedToken.exp < currentTimestamp) {
          try {
            const response = await refreshAccessTokenRequest(refreshToken);
            const newAccessToken = response.accessToken;
            const newRefreshToken = response.refreshToken;

            setTokensStorage(newAccessToken, newRefreshToken);

            // Update API instance's Authorization header with the new token
            apiMed.defaults.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
          } catch (error) {
            signOut();
          }
        }
      };

      refreshAccessToken();
    } else {
      setIsLoadingUserStorageData(false); // No need to continue loading
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoadingUserStorageData,
        signIn,
        signOut,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
