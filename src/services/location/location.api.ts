import superAxios from "../superaxios";

export const getStatesApi = async () => {
  const response = await superAxios.get("/location/states");
  return response.data;
};

export const getDistrictsByStateApi = async (stateIds: any) => {
  const response = await superAxios.post(
    `/location/get-districts-by-states`,
    stateIds
  );
  return response.data;
};

export const getTalukasByDistrictApi = async (districtIds: any) => {
  const response = await superAxios.post(
    `/location/get-talukas-by-districts`,
    districtIds
  );
  return response.data;
};
