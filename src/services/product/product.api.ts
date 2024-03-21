import { API } from "../api";
import superAxios from "../superaxios";

export const addProductApi = async (product: any) => {
  const response = await superAxios.post(API.addProduct.addProduct, product);

  console.log("addProductApi response", response.data);
  return response.data;
};

export const addOccupationApi = async (occupation: any) => {
  const response = await superAxios.post(
    API.addProduct.addOccupation,
    occupation
  );

  console.log("addOccupationApi response", response.data);
  return response.data;
};

export const addPriceForBuyerApi = async (price: any) => {
  const response = await superAxios.post(
    API.addProduct.addPriceForBuyers,
    price
  );

  console.log("addPriceForButeApi response", response.data);
  return response.data;
};

export const addOccupationGetApi = async ({
  groupId,
  payload,
}: {
  groupId: string;
  payload: any;
}) => {
  const response = await superAxios.get(
    `/group/${groupId}/buyers-for-talukas`,
    payload
  );

  console.log("addOccupationGetApi response", response.data);
  return response.data;
};
