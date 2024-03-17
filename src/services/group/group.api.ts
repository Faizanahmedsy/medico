import superAxios from "../superaxios";

export const getGroupApi = async () => {
  const response = await superAxios.get("/group");

  console.log("groupQuery response", response);
};
