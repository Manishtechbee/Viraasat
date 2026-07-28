import axios from "../api/axios";

// GET ALL JOURNEYS
export const getJourneys = async () => {
  const response = await axios.get("/journeys");
  return response.data;
};

// GET SINGLE JOURNEY
export const getJourney = async (id) => {
  const response = await axios.get(`/journeys/${id}`);
  return response.data;
};

// CREATE
export const createJourney = async (data) => {
  const response = await axios.post("/journeys", data);
  return response.data;
};

// DELETE
export const deleteJourney = async (id) => {
  const response = await axios.delete(`/journeys/${id}`);
  return response.data;
};

// TOGGLE VISITED
export const toggleJourneyPlace = async (journeyId, heritageId) => {
  const response = await axios.patch(
    `/journeys/${journeyId}/places/${heritageId}`
  );

  return response.data;
};