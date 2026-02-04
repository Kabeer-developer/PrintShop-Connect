import React from "react";
import { Link } from "react-router-dom";

const StoreCard = ({ store }) => {
  return (
    <Link
      to={`/store/${store._id}`}
      className="block group"
      title={`Open ${store.name}`}
    >
      <div className="bg-white rounded-xl border p-6 hover:shadow-md transition-all">
        <div className="flex items-center gap-4">
          <img
            src={store.logoUrl || "https://via.placeholder.com/72"}
            alt={store.name}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/72";
            }}
            className="w-16 h-16 object-cover rounded-lg"
          />

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate group-hover:text-blue-600">
              {store.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1 truncate">
              {store.location}
            </p>
          </div>

          <svg
            className="w-5 h-5 text-gray-400 group-hover:text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default StoreCard;
