/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { User } from "../shared/entities/user.entities";

import {
  AUTH_REFRESH_STORAGE,
  AUTH_TOKEN_STORAGE,
} from "../shared/storage/config";

//import jwtDecode from "jwt-decode";

import { apiMed } from "../services/api";
import { loginProps } from "../shared/types";
import { UserAuth } from "../shared/interface";
import { signInRequest } from "../services/auth";

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

const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(AUTH_TOKEN_STORAGE, accessToken);
  localStorage.setItem(AUTH_REFRESH_STORAGE, refreshToken);
};

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const router = useNavigate();

  const [user, setUser] = useState<User | null>(null);

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
      setTokens(data.tokens.accessToken, data.tokens.refreshToken);

      router(`/${data.user.role}/homepage`);

      return data.user;
    } catch (error) {
      console.error("Erro durante a autenticação:", error);
      throw new Error("Erro durante a autenticação");
    }
  };

  const signOut = async (): Promise<void> => {
    const router = useNavigate();

    try {
      localStorage.removeItem(AUTH_REFRESH_STORAGE);
      localStorage.removeItem(AUTH_TOKEN_STORAGE);
      setUser(null);
      apiMed.defaults.headers["Authorization"] = "";
      router("signIn");
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  };

  const authContextData: AuthContextType = {
    user,
    isLoadingUserStorageData,
    signIn,
    signOut,
    isAuthenticated,
  };

  useEffect(() => {
    const subscribe = apiMed.registerInterceptTokenManager({
      signOut,
    });

    return () => {
      subscribe();
    };
  }, [signOut, user]);

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
