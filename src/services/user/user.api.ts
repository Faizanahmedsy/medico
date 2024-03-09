import { API } from "../api";
import superAxios from "../superaxios";

export const registerAsCompanyApi = async (payload: any) => {
  const resp = await superAxios.post(API.user.registerAsCompany, payload, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("medico_access_token")}`,
    },
  });

  console.log("socialSignUp resp", resp);

  return resp.data;
};

export const registerAsBuyerApi = async (payload: any) => {
  const resp = await superAxios.post(API.user.registerAsBuyer, payload, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("medico_access_token")}`,
    },
  });

  console.log("registerAsBuyerApi resp", resp);

  return resp;
};
