
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";

const MyListPage = () => {
  const [isListEmpty] = useState(true);

  return (
    <div className="min-h-screen bg-netflix-dark">
      <Navbar />
      
      <div className="pt-20 px-4 md:px-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">My List</h1>
        
        {isListEmpty ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <h2 className="text-2xl text-white mb-4">Your list is empty</h2>
            <p className="text-gray-400 mb-8 max-w-lg">
              Add movies and TV shows to your list to watch them later.
              Click the "+" button on any movie or show to add it to your list.
            </p>
            <Link to="/">
              <Button className="button-netflix">
                <Play className="mr-2 h-4 w-4" /> Browse Content
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* My List content would go here */}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default MyListPage;
