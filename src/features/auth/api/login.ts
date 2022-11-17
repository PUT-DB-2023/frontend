import axios from "axios";

export type LoginCredentials = {
    email: string;
    password: string;
  };
  
  export const login = (data: LoginCredentials) => {
    return axios.post('/auth/login', data);
  };