import { defineNuxtPlugin } from "#app";
import axios from "axios";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const api = axios.create({
    baseURL: config.public.API_URL || "http://localhost:8000", // Replace with your API URL
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  api.interceptors.request.use((config) => {
    if (process.client) {
      const token = localStorage.getItem("jwt_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  });

  return {
    provide: {
      axios: api,
    },
  };
});