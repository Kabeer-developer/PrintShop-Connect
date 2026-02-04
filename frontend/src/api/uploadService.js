import axiosInstance from "./axiosInstance";

const uploadFile = async (storeId, formData) => {
  const res = await axiosInstance.post(`/api/upload/${storeId}`, formData);
  return res.data;
};

const getStoreFiles = async (storeId) => {
  const res = await axiosInstance.get(`/api/upload/files/${storeId}`);
  return res.data;
};

const deleteFile = async (fileId) => {
  await axiosInstance.delete(`/api/upload/files/${fileId}`);
};

export default {
  uploadFile,
  getStoreFiles,
  deleteFile,
};
