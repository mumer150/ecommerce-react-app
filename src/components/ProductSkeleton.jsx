export default function ProductSkeleton() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* IMAGE SKELETON */}
          <div className="w-full bg-gray-200 rounded-xl h-[300px] md:h-[500px]" />

          {/* DETAILS SKELETON */}
          <div className="w-full bg-gray-100 p-6 md:p-10 rounded-xl space-y-5">
            <div className="h-8 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>

            <div className="h-6 bg-gray-300 rounded w-1/4 mt-6"></div>

            <div className="h-20 bg-gray-300 rounded w-full"></div>

            <div className="flex gap-3 mt-6">
              <div className="h-12 bg-gray-300 rounded w-full"></div>
              <div className="h-12 bg-gray-300 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
