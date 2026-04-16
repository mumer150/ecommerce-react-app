export default function ProductSkeleton() {
  return (
    <div className="w-full max-w-xs sm:max-w-[260px] animate-pulse">
      {/* Image */}
      <div className="h-40 bg-gray-300 rounded-xl"></div>

      {/* Title */}
      <div className="h-4 bg-gray-300 mt-3 rounded w-3/4"></div>

      {/* Price */}
      <div className="h-4 bg-gray-300 mt-2 rounded w-1/2"></div>
    </div>
  );
}