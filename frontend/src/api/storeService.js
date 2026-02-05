import axios from "./axiosInstance";

const registerStore = async (formData) => {
  const res = await axios.post("/api/store/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

const loginStore = async (data) => {
  const res = await axios.post("/api/store/login", data);
  return res.data;
};

const getAllStores = async (search = "") => {
  const res = await axios.get(`/api/store?search=${search}`);
  return res.data;
};

const getStoreById = async (id) => {
  const res = await axios.get(`/api/store/${id}`);
  return res.data;
};

export default {
  registerStore,
  loginStore,
  getAllStores,
  getStoreById,
};
