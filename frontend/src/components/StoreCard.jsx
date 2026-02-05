import { Link } from "react-router-dom";

const StoreCard = ({ store }) => {
  return (
    <Link
      to={`/store/${store._id}`}
      className="border rounded p-4 hover:shadow"
    >
      <img
        src={store.logoUrl || "https://via.placeholder.com/100"}
        alt={store.name}
        className="w-20 h-20 object-cover mb-2"
      />
      <h3 className="font-semibold">{store.name}</h3>
      <p className="text-sm text-gray-500">{store.location}</p>
    </Link>
  );
};

export default StoreCard;
