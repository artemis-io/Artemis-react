import { apiMed } from "./api";
import { loginProps } from "../shared/types";
import { AUTH_TOKEN_STORAGE } from "../shared/storage/config";

export const signInRequest = async ({ email, password }: loginProps) => {
  // Retire o | null aqui, já que não estamos retornando null
  try {
    const response = await apiMed.post(`/auth`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Erro durante a autenticação:", error);
  }
};

export const recoverUserInformation = async () => {
  try {
    // Obtenha o token de acesso armazenado em localStorage ou de qualquer outra fonte
    const accessToken = localStorage.getItem(AUTH_TOKEN_STORAGE);

    // Verifique se o token de acesso está disponível
    if (accessToken) {
      // Faça a chamada para a API
      const response = await apiMed.get(`/auth`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } else {
      // Trate o caso em que o token de acesso não está disponível
      console.error("Token de acesso não encontrado.");
      return null;
    }
  } catch (error) {
    console.error("Erro durante a autenticação:", error);
    throw error; // Você pode optar por lançar o erro novamente para que seja tratado em outro lugar
  }
};

export const refreshAccessTokenRequest = async (refreshToken: string) => {
  try {
    const response = await apiMed.get("/auth/refresh", {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    console.log(response);

    return response.data;
  } catch (error) {
    console.error("RefreshToken Error:", error);
  }
};

export const getUserInformationRequest = async (accessToken: string) => {
  try {
    const response = await apiMed.get("/auth", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao recuperar informações do usuário:", error);
    throw error;
  }
};
