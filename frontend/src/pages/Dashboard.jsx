import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoreFiles, deleteFile } from "../redux/slices/uploadSlice";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { storeInfo } = useSelector((state) => state.storeAuth);
  const { files, loading } = useSelector((state) => state.uploads);

  useEffect(() => {
    if (!storeInfo) {
      navigate("/login");
      return;
    }
    dispatch(fetchStoreFiles(storeInfo._id));
  }, [dispatch, storeInfo, navigate]);

  const handleDelete = (fileId) => {
    if (!window.confirm("Delete this file?")) return;
    dispatch(deleteFile(fileId));
  };

  if (!storeInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Login to continue
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="bg-white p-6 rounded-lg mb-6 flex items-center gap-4">
          <img
            src={storeInfo.logoUrl || "https://via.placeholder.com/80"}
            className="w-20 h-20 rounded object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{storeInfo.name}</h2>
            <p className="text-gray-600">{storeInfo.location}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">
            Uploaded Files ({files.length})
          </h3>

          {loading && <p>Loading...</p>}

          {!loading && files.length === 0 && (
            <p className="text-gray-500">No files uploaded yet</p>
          )}

          <div className="space-y-3">
            {files.map((file) => (
              <div
                key={file._id}
                className="flex justify-between items-center border p-4 rounded"
              >
                <div>
                  <p className="font-medium">
                    {file.userName || "Anonymous"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {file.originalFileName}
                  </p>
                </div>

                <div className="flex gap-2">
                  <a
                    href={file.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 text-blue-600"
                  >
                    View
                  </a>
                  <button
                    onClick={() => handleDelete(file._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
