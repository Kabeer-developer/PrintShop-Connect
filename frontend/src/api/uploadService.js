import axios from "./axiosInstance";

const uploadFile = async (storeId, formData) => {
  const res = await axios.post(`/api/upload/${storeId}`, formData);
  return res.data;
};

const getStoreFiles = async (storeId) => {
  const res = await axios.get(`/api/upload/files/${storeId}`);
  return res.data;
};

const deleteFile = async (fileId) => {
  await axios.delete(`/api/upload/files/${fileId}`);
};

export default {
  uploadFile,
  getStoreFiles,
  deleteFile,
};
