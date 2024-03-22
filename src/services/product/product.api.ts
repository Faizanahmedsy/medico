import { API } from "../api";
import superAxios from "../superaxios";

export const addProductApi = async (product: any) => {
  const response = await superAxios.post(API.addProduct.addProduct, product);

  console.log("addProductApi response", response.data);
  return response.data;
};

export const addPriceForBuyerApi = async (payload: any) => {
  const response = await superAxios.post(
    API.addProduct.addPriceForBuyers,
    payload
  );

  console.log("addPriceForButeApi response", response.data);
  return response.data;
};

export const addOccupationApi = async ({
  groupId,
  payload,
}: {
  groupId: string;
  payload: any;
}) => {
  const response = await superAxios.post(
    `/group/${groupId}/buyers-for-talukas`,
    payload
  );

  console.log("addOccupationGetApi response", response.data);
  return response.data;
};
