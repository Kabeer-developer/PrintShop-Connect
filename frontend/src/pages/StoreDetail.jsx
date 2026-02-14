import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import storeService from "../api/storeService";
import uploadService from "../api/uploadService";

const StoreDetail = () => {
  const { id } = useParams();
  const fileRef = useRef();

  const [store, setStore] = useState(null);
  const [userName, setUserName] = useState("");
  const [note, setNote] = useState("");
  const [file, setFile] = useState(null);
  const [previewName, setPreviewName] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await storeService.getStoreById(id);
        setStore(data);
      } catch {
        setMsg("Store not found");
      }
    };
    load();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();

    if (!userName.trim() || !file) {
      setMsg("Name and file required");
      return;
    }

    const fd = new FormData();
    fd.append("userName", userName.trim());
    fd.append("note", note.trim());
    fd.append("file", file);

    try {
      setLoading(true);
      await uploadService.uploadFile(id, fd);

      setMsg("File uploaded successfully ✅");
      setUserName("");
      setNote("");
      setFile(null);
      setPreviewName("");
      fileRef.current.value = "";
    } catch {
      setMsg("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading store...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-10">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        {/* Store Info */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={store.logoUrl || "https://via.placeholder.com/80"}
            alt="store"
            className="w-16 h-16 rounded-lg object-cover border"
          />
          <div>
            <h2 className="text-2xl font-bold">{store.name}</h2>
            <p className="text-gray-500">{store.location}</p>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-4">
          Upload Document for Printing
        </h3>

        <form onSubmit={submit} className="space-y-4">

          <input
            placeholder="Your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            placeholder="Note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* File Upload */}
          <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition">
            <input
              type="file"
              ref={fileRef}
              onChange={(e) => {
                const selected = e.target.files[0];
                if (!selected) return;
                setFile(selected);
                setPreviewName(selected.name);
              }}
              className="hidden"
              id="fileInput"
            />

            <label htmlFor="fileInput" className="cursor-pointer">
              {previewName
                ? `Selected: ${previewName}`
                : "Click to select file (PDF / Image)"}
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload File"}
          </button>

          {msg && (
            <div className="text-center text-sm mt-2 text-gray-600">
              {msg}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default StoreDetail;
