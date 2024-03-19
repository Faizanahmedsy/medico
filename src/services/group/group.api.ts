import superAxios from "../superaxios";

export const getGroupApi = async (params: any) => {
  const response = await superAxios.get(`/group?companyId=${params.companyId}`);

  console.log("groupQuery response", response);
};
