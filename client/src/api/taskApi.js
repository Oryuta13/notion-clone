import axiosClient from "./axiosClient";

const taskApi = {
  create: () => axiosClient.post("task"),
  getAll: () => axiosClient.get("task"),
};

export default taskApi;
