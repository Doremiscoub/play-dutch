
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="dutch-card max-w-md text-center">
        <div className="mb-6">
          <h1 className="text-6xl font-bold text-dutch-blue mb-2">404</h1>
          <p className="text-xl text-gray-600 mb-6">
            Cette page n'existe pas
          </p>
        </div>
        <Link to="/">
          <Button className="dutch-button bg-dutch-blue hover:bg-dutch-blue/90">
            <Home className="mr-2 h-5 w-5" /> Retour à l'accueil
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
