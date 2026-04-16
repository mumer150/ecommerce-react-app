import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/api";
import { useQuery } from "@tanstack/react-query";

export const Home = () => {
  // const [products, setProducts] = useState([]);
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await getProducts();
  //       setProducts(data);
  //     } catch (err) {
  //       setError(err.message || "Failed to fetch products");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const {
    data: products,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h2 className="text-2xl md:text-4xl font-bold text-green-600 animate-pulse">
          Loading...
        </h2>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-[60vh] px-4">
        <h2 className="text-xl md:text-3xl font-semibold text-red-600 text-center">
          ERR: {error}
        </h2>
      </div>
    );

  return (
    <div className="px-4 md:px-8 lg:px-12 py-6 md:py-10">
      {/* Title */}
      <h1 className="text-center font-bold text-2xl md:text-3xl lg:text-4xl mb-6 md:mb-10">
        Products
      </h1>

      {/* Responsive Grid with centered items */}
      <div
        className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        gap-4 
        md:gap-6 
        lg:gap-8
        justify-items-center
      "
      >
        {products?.map((item) => (
          <div key={item.id} className="w-full max-w-xs sm:max-w-[260px]">
            <ProductCard product={item} />
          </div>
        ))}
      </div>
    </div>
  );
};
