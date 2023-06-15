import axios, { AxiosInstance } from "axios";


export const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_API,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
    }
  });