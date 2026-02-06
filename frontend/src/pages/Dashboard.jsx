import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchStoreFiles, deleteFile } from "../redux/slices/uploadSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  const storeInfo = useSelector((state) => state.store.storeInfo);
  const { files, loading } = useSelector((state) => state.uploads);

  useEffect(() => {
    if (!storeInfo?.id) return;

    dispatch(fetchStoreFiles(storeInfo.id));
  }, [dispatch, storeInfo?.id]);

  console.log("STORE FROM REDUX:", storeInfo);
  console.log("FILES FROM REDUX:", files);

  if (!storeInfo) {
    return <p className="p-6">Please login</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Uploads</h2>

      {loading && <p>Loading...</p>}

      {!loading && files.length === 0 && (
        <p>No files uploaded yet</p>
      )}

      {files.map((f) => (
        <div
          key={f._id}
          className="border p-3 flex justify-between items-center mb-2"
        >
          <div>
            <p className="font-semibold">{f.userName}</p>
            <p className="text-sm text-gray-600">
              {f.originalFileName}
            </p>
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
