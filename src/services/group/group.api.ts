import { getItem } from "@/lib/localStorage";
import superAxios from "../superaxios";

export const getGroupApi = async (params: any) => {
  const response = await superAxios.get(`/group?companyId=${params.companyId}`);

  console.log("groupQuery response", response);
};

export const addGroupApi = async (payload: any) => {
  const token = getItem("medico_access_token");

  const response = await superAxios.post(`/group`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("groupQuery response", response);

  return response.data;
};
