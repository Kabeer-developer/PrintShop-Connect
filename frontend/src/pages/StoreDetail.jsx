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
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const load = async () => {
      const data = await storeService.getStoreById(id);
      setStore(data);
    };
    load();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    if (!userName || !file) {
      setMsg("Name and file required");
      return;
    }

    const fd = new FormData();
    fd.append("userName", userName);
    fd.append("note", note);
    fd.append("file", file);

    await uploadService.uploadFile(id, fd);
    setMsg("Uploaded");
    setUserName("");
    setNote("");
    setFile(null);
    fileRef.current.value = "";
  };

  if (!store) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-2">{store.name}</h2>
      <p className="mb-4 text-gray-600">{store.location}</p>

      <form onSubmit={submit} className="space-y-3">
        <input
          placeholder="Your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="border p-2 w-full"
        />
        <textarea
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="file"
          ref={fileRef}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className="bg-blue-600 text-white px-4 py-2">
          Upload
        </button>
        {msg && <p>{msg}</p>}
      </form>
    </div>
  );
};

export default StoreDetail;
