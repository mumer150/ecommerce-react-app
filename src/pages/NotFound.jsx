import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-3 sm:px-4 py-6">
      
      <div className="text-center max-w-lg w-full">
        
        {/* 404 */}
        <h1 className="text-5xl sm:text-7xl md:text-9xl font-extrabold text-green-800">
          404
        </h1>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mt-3 sm:mt-4 text-green-700">
          Page Not Found
        </h2>

        {/* Message */}
        <p className="text-gray-500 mt-2 sm:mt-3 text-sm sm:text-base px-2">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Info Box */}
        <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 mt-4 sm:mt-6">
          <p className="text-gray-600 text-xs sm:text-sm">
            You may have typed the wrong address or the page may have been removed.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-5 sm:mt-6 justify-center">
          
          <Link
            to="/"
            className="w-full sm:w-auto bg-black text-white px-5 py-2.5 sm:px-6 sm:py-3 
                       text-sm sm:text-base 
                       rounded-xl font-semibold hover:bg-green-800 transition active:scale-95"
          >
            Go Home
          </Link>

          <Link
            to="/products"
            className="w-full sm:w-auto border border-gray-300 px-5 py-2.5 sm:px-6 sm:py-3 
                       text-sm sm:text-base 
                       rounded-xl font-semibold hover:border-green-400 transition"
          >
            Browse Products
          </Link>

        </div>

      </div>
    </div>
  );
}