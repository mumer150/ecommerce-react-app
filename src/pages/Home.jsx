import { useContext, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/api";
import { useQuery } from "@tanstack/react-query";
import { Searchcontexts } from "../context/SearchContext";

export const Home = () => {
  const [sortOrder, setSortOrder] = useState("");

  const { search } = useContext(Searchcontexts);

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

  // SORTING LOGIC
  const sortedProducts = useMemo(() => {
    if (!products) return [];

    let copy = [...products];

    if (search !== "") {
      copy = copy.filter((item) =>
        item.title.toLowerCase().includes(search.trim().toLowerCase()),
      );
    }

    if (sortOrder === "low") {
      return copy.sort((a, b) => a.price - b.price);
    }

    if (sortOrder === "high") {
      return copy.sort((a, b) => b.price - a.price);
    }

    return copy;
  }, [products, sortOrder, search]);

  // LOADING STATE
  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h2 className="text-2xl md:text-4xl font-bold text-green-600 animate-pulse">
          Loading...
        </h2>
      </div>
    );

  // ERROR STATE
  if (error)
    return (
      <div className="flex justify-center items-center h-[60vh] px-4 text-center">
        <h2 className="text-xl md:text-3xl font-semibold text-red-600">
          {error.message || "Something went wrong"}
        </h2>
      </div>
    );

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-12 py-6 md:py-10">
      {/* TITLE */}
      <h1 className="text-center font-bold text-2xl md:text-3xl lg:text-4xl mb-6 md:mb-10">
        Products
      </h1>

      {/* SORT DROPDOWN */}
      <div className="flex justify-center sm:justify-end mb-8">
        <div className="relative w-full sm:w-64 max-w-xs">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-700 shadow-sm 
                       focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition"
          >
            <option value="">Default Sorting</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
            ▼
          </div>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          gap-4 
          sm:gap-6 
          lg:gap-8
          justify-items-center
        "
      >
        {sortedProducts?.map((item) => (
          <div key={item.id} className="w-full max-w-xs sm:max-w-[260px]">
            <ProductCard product={item} />
          </div>
        ))}
      </div>
    </div>
  );
};
