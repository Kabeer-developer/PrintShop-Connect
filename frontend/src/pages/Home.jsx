import { useEffect, useState } from "react";
import storeService from "../api/storeService";
import StoreCard from "../components/StoreCard";

const Home = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await storeService.getAllStores();
        setStores(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Available Print Stores
          </h1>
          <p className="text-gray-500 mt-1">
            Select a store to upload your documents for printing
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
          </div>
        )}

        {/* Empty */}
        {!loading && stores.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No stores available right now
            </p>
          </div>
        )}

        {/* Store Grid */}
        {!loading && stores.length > 0 && (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {stores.map((store) => (
              <StoreCard key={store._id} store={store} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
