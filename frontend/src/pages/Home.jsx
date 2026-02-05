import { useEffect, useState } from "react";
import storeService from "../api/storeService";
import StoreCard from "../components/StoreCard";

const Home = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await storeService.getAllStores();
      setStores(data);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {stores.map((store) => (
        <StoreCard key={store._id} store={store} />
      ))}
    </div>
  );
};

export default Home;
