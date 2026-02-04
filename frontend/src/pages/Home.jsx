import React, { useEffect, useState } from "react";
import storeService from "../api/storeService";
import StoreCard from "../components/StoreCard";
import { Store, Loader2, AlertCircle, Search } from "lucide-react";

const Home = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadStores = async (query = "") => {
    setLoading(true);
    setError(null);
    try {
      const data = await storeService.getAllStores(query);
      setStores(data);
    } catch {
      setError("Failed to load stores. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStores();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    loadStores(search);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-12">

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Store className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold">Print Shops</h1>
          </div>

          <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search shop by name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="bg-blue-600 text-white px-5 rounded-lg">
              Search
            </button>
          </form>
        </div>

        {loading && (
          <div className="flex flex-col items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
            <p>Loading stores...</p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex gap-3">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {stores.length === 0 ? (
              <div className="bg-white p-12 rounded-lg text-center">
                <Store className="w-10 h-10 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No stores found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stores.map((store) => (
                  <StoreCard key={store._id} store={store} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
