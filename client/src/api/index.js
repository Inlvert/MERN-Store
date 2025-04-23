import axios from "axios";
import CONSTANTS from "../constants";

const httpClient = axios.create({
  baseURL: CONSTANTS.HTTP_SERVER_URL,
});

let accessToken = null;

export const clearToken = () => {
  accessToken = null;
  localStorage.removeItem(CONSTANTS.REFRESH_TOKEN);
};

// Add a request interceptor
httpClient.interceptors.request.use(
  function (config) {
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
httpClient.interceptors.response.use(
  function (response) {
    if (response?.data?.data?.tokenPair) {
      const { tokenPair } = response.data.data;

      accessToken = tokenPair.accessToken;

      localStorage.setItem(CONSTANTS.REFRESH_TOKEN, tokenPair.refreshToken);
    }
    return response;
  },
  async function (error) {
    const {
      response: { status },
    } = error;
    const refreshTokenFromLS = localStorage.getItem("refreshToken");

    if (refreshTokenFromLS && status === 419) {
      const {
        data: {
          data: { tokenPair },
        },
      } = await axios.post(`${CONSTANTS.HTTP_SERVER_URL}/auth/refresh`, {
        refreshToken: refreshTokenFromLS,
      });

      accessToken = tokenPair.accessToken;

      localStorage.setItem(CONSTANTS.REFRESH_TOKEN, tokenPair.refreshToken);

      error.config.headers["Authorization"] = `Bearer ${accessToken}`;

      return httpClient.request(error.config);
    }

    return Promise.reject(error);
  }
);

export const registration = (userData) =>
  httpClient.post("/auth/registration", userData);

export const login = (userData) => httpClient.post("/auth/login", userData);

export const refresh = (token) =>
  httpClient.post("/auth/refresh", { refreshToken: token });

export const createProduct = async (productData) => {
  const response = await httpClient.post("/products", productData);
  return response;
};
