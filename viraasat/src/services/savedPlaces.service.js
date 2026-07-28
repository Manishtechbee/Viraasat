import api from "../api/axios";

export const getSavedPlaces = async () => {
  const response = await api.get("/saved-places");
  return response.data;
};

export const savePlace = async (heritageId) => {
  const response = await api.post(`/saved-places/${heritageId}`);
  return response.data;
};

export const removeSavedPlace = async (heritageId) => {
  const response = await api.delete(`/saved-places/${heritageId}`);
  return response.data;
};