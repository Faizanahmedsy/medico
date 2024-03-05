import superAxios from "../superaxios";
import { API } from "../api";

export const signUpApi = async (payload: any) => {
  const resp = await superAxios.post(API.auth.signup, payload);

  console.log("socialSignUp resp", resp);

  return resp.data;
};

export const loginApi = async (payload: any) => {
  const resp = await superAxios.post(API.auth.login, payload);

  console.log("socialSignUp resp", resp);

  return resp.data;
};
