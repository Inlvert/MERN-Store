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

// export const getProducts = async (page) => {
//   const response = await httpClient.get(`/products?page=${page}`);
//   console.log(response.data);
//   return {
//     data: response.data.data,
//     totalPages: response.data.totalPages,
//     currentPage: +response.data.currentPage,
//   };
// };

export const getProducts = async ({page, limit = null}) => {
  const params = limit ? `?page=${page}&limit=${limit}` : `?page=${page}`
  const response = await httpClient.get(`/products${params}`);
  console.log(response.data);
  return {
    data: response.data.data,
    totalPages: response.data.totalPages,
    currentPage: +response.data.currentPage,
    limit: limit || null,
  };
};

export const getProduct = async (productId) => {
  const response = await httpClient.get(`/products/${productId}`);
  return response;
};

export const addProductToCart = async ({ productId, quantity }) => {
  const response = await httpClient.post(`/products/${productId}`, {
    quantity,
  });
  return response;
};

export const getCart = async (cartId) => {
  const response = await httpClient.post(`/cart`, cartId);
  return response;
};

export const updateQuantityProduct = async (cartProductId, quantity) => {
  const response = await httpClient.put(`cart-products/${cartProductId}`, {
    quantity,
  });
  return response;
};

export const deleteProductFromCart = async (cartProductId) => {
  const response = await httpClient.delete(`cart-products/${cartProductId}`);
  return response;
};

export const createOrder = async (orderData) => {
  const response = await httpClient.post("orders", orderData);
  return response;
};

export const getAllUserOrders = async () => {
  const response = await httpClient.get("orders/my-orders");
  return response;
}