import superAxios from "../superaxios";

export const addProductApi = async (product: any) => {
  const response = await superAxios.post("/product", product);

  console.log("addProductApi response", response.data);
  return response.data;
};
