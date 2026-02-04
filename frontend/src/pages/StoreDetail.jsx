import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import storeService from "../api/storeService";
import uploadService from "../api/uploadService";

const StoreDetail = () => {
  const { id } = useParams();
  const fileInputRef = useRef(null);

  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userName, setUserName] = useState("");
  const [note, setNote] = useState("");
  const [file, setFile] = useState(null);

  const [status, setStatus] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const loadStore = async () => {
      try {
        const data = await storeService.getStoreById(id);
        setStore(data);
      } catch {
        setError("Store not found");
      } finally {
        setLoading(false);
      }
    };
    loadStore();
  }, [id]);

  const validateFile = (file) => {
    if (file.size > 10 * 1024 * 1024)
      return "File must be less than 10MB";
    if (
      ![
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/jpg",
      ].includes(file.type)
    )
      return "Only PDF or image files allowed";
    return null;
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    const error = validateFile(selected);
    if (error) {
      setStatus({ type: "error", msg: error });
      setFile(null);
      e.target.value = null;
      return;
    }

    setFile(selected);
    setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !userName.trim()) {
      setStatus({ type: "error", msg: "Name and file are required" });
      return;
    }

    const fd = new FormData();
    fd.append("userName", userName.trim());
    fd.append("note", note.trim());
    fd.append("file", file);

    try {
      setIsUploading(true);
      setStatus({ type: "loading", msg: "Uploading..." });

      await uploadService.uploadFile(id, fd);

      setStatus({ type: "success", msg: "File uploaded successfully" });
      setUserName("");
      setNote("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = null;
    } catch (err) {
      setStatus({
        type: "error",
        msg: err.response?.data?.message || "Upload failed",
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) return <p className="text-center p-6">Loading...</p>;
  if (error) return <p className="text-center text-red-600 p-6">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <div className="flex gap-4 items-center">
        <img
          src={store.logoUrl || "https://via.placeholder.com/100"}
          className="w-24 h-24 rounded object-cover"
        />
        <div>
          <h2 className="text-xl font-bold">{store.name}</h2>
          <p className="text-gray-600">{store.location}</p>
        </div>
      </div>

      <hr className="my-4" />

      <h3 className="text-lg font-semibold mb-3">
        Upload document for printing
      </h3>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Your name"
          className="w-full border px-3 py-2 rounded"
          disabled={isUploading}
        />

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Note (optional)"
          className="w-full border px-3 py-2 rounded"
          rows={2}
          disabled={isUploading}
        />

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          disabled={isUploading}
        />

        <button
          type="submit"
          disabled={isUploading || !file || !userName}
          className={`px-4 py-2 rounded text-white ${
            isUploading || !file || !userName
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>

        {status && (
          <div
            className={`p-3 rounded text-sm ${
              status.type === "error"
                ? "bg-red-50 text-red-700"
                : status.type === "success"
                ? "bg-green-50 text-green-700"
                : "bg-blue-50 text-blue-700"
            }`}
          >
            {status.msg}
          </div>
        )}
      </form>
    </div>
  );
};

export default StoreDetail;
