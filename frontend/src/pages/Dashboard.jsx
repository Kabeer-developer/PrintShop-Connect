import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchStoreFiles, deleteFile } from "../redux/slices/uploadSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { storeInfo } = useSelector((s) => s.store);
  const { files, loading } = useSelector((s) => s.uploads);

  useEffect(() => {
    if (storeInfo?._id) {
      dispatch(fetchStoreFiles(storeInfo._id));
    }
  }, [dispatch, storeInfo?._id]);

  if (!storeInfo) return null;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Uploads</h2>

      {loading && <p>Loading...</p>}

      {files.length === 0 && !loading && <p>No files</p>}

      {files.map((f) => (
        <div
          key={f._id}
          className="border p-3 flex justify-between mb-2"
        >
          <div>
            <p className="font-semibold">{f.userName}</p>
            <p className="text-sm">{f.originalFileName}</p>
          </div>

          <button
            onClick={() => dispatch(deleteFile(f._id))}
            className="text-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
