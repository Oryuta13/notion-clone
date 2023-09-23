import axiosClient from "./axiosClient";

type UpdatedMemo = {
  title?: string;
  description?: string;
  icon?: string;
};

const memoApi = {
  // 新規登録API
  create: () => axiosClient.post("memo"),
  // メモ一覧取得API
  getAll: () => axiosClient.get("memo"),
  // 1つのメモ詳細取得API
  getOne: (id: string) => axiosClient.get(`memo/${id}`),
  // メモ更新API
  update: (id: string, params: UpdatedMemo) =>
    axiosClient.put(`memo/${id}`, params),
  // メモ削除API
  delete: (id: string) => axiosClient.delete(`memo/${id}`),
};

export default memoApi;
