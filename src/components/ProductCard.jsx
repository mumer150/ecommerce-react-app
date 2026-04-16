import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white border-green-50 border-2 shadow-md rounded-2xl p-4 w-full max-w-xs hover:shadow-lg transition">
      <Link to={`/products/${product.id}`} onClick={()=>{scrollTo(0,0)}}>
        {/* Image */}
        <div className="h-40 flex items-center justify-center mb-4">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full object-contain"
          />
        </div>

        {/* Title */}
        <h2 className="text-sm font-semibold text-center text-gray-800 line-clamp-2 mb-2">
          {product.title}
        </h2>
      </Link>

      {/* Price */}
      <p className="text-lg text-center font-bold text-green-600">
        ${product.price}
      </p>
    </div>
  );
}
