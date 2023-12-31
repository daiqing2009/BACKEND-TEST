import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/v1",
});

export const apis = {
  fetchPlanets: () => instance.get(`/planets`),
  fetchAsteroids: () => instance.get(`/asteroids`),
  fetchMiners: () => instance.get(`/miners`),
  fetchMinerByName: (name) =>
    instance.get(`/miners`, {
      params: {
        name: name
      },
    }),
  fetchMinerByPlanetId: (id) => {
    return instance.get(`/miners`, {
      params: {
        planet: id,
      },
    });
  },
  fetchHistoryByMinerId: (id) => instance.get(`/miners/${id}/history`),
  createMiner: (props) => instance.post(`/miners`, props),
};