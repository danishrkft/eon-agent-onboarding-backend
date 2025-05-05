
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-eon-light-gray">
      <div className="text-center max-w-md px-4">
        <div className="bg-eon-blue rounded-md w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-bold text-2xl">EON</span>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
        <Link 
          to="/dashboard" 
          className="bg-eon-blue text-white px-6 py-3 rounded-md hover:bg-eon-dark-blue transition-colors inline-block"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
