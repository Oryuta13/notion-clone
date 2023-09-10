import axiosClient from "./axiosClient";

const taskApi = {
  create: () => axiosClient.post("task"),
};

export default taskApi;
