import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchStoreFiles,
  deleteFile,
} from "../redux/slices/uploadSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  const storeInfo = useSelector((state) => state.store.storeInfo);
  const { files = [], loading } = useSelector((state) => state.uploads);

  useEffect(() => {
    if (!storeInfo?.id) return;
    dispatch(fetchStoreFiles(storeInfo.id));
  }, [dispatch, storeInfo?.id]);

  if (!storeInfo) {
    return <p className="p-6">Please login</p>;
  }

  const handleDelete = (id) => {
    if (window.confirm("Delete this file?")) {
      dispatch(deleteFile(id));
    }
  };

  const handleDownload = async (fileId, fileName) => {
  const token = JSON.parse(
    localStorage.getItem("storeInfo")
  )?.token;

  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/upload/download/${fileId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    alert("Download failed");
    return;
  }

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();

  window.URL.revokeObjectURL(url);
};


  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Uploaded Files</h2>

      {loading && <p>Loading...</p>}

      {!loading && files.length === 0 && (
        <p className="text-gray-500">No files uploaded yet</p>
      )}

      <div className="space-y-4">
        {files.map((f) => (
          <div
            key={f._id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{f.userName}</p>
              <p className="text-sm text-gray-600">
                {f.originalFileName}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(f.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="flex gap-4">
             
              <button
                onClick={() =>
                  handleDownload(
                    f._id,
                    f.originalFileName
                  )
                }
                className="text-blue-600 hover:underline"
              >
                Download
              </button>

            
              <button
                onClick={() => handleDelete(f._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

