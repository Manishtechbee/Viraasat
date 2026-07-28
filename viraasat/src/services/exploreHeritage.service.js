import api from "../api/axios";

export const getHeritages = (params = {}) => {
  return api.get("/exploreHeritages", {
    params,
  });
};

export const getHeritageBySlug = (slug) =>
  api.get(`/exploreHeritages/${slug}`);