import api from "../api/axiosInstance";

export const contentService = {
  getAbout: async () => {
    const res = await api.get("/api/content/about/");
    return res.data;
  },

  createAbout: async (data: FormData) => {
    const res = await api.post("/api/content/about/", data);
    return res.data;
  },

  updateAbout: async (id: number, data: FormData) => {
    const res = await api.patch(`/api/content/about/${id}/`, data);
    return res.data;
  },

  deleteAbout: async (id: number) => {
    const res = await api.delete(`/api/content/about/${id}/`);
    return res.data;
  }
};