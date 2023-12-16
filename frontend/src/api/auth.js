import axios from "./axios";

export const registerRequest = async (user) => axios.post(`/register`, user);

export const loginRequest = async (user) => axios.post(`/login`, user);

export const verify = () => axios.get(`/verifyToken`);