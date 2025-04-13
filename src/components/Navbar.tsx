
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setShowSearch(false);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 py-2 px-4 md:px-12 ${isScrolled ? 'bg-netflix-black' : 'bg-gradient-to-b from-netflix-black to-transparent'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/">
            <h1 className="text-netflix-red font-bold text-2xl sm:text-3xl">MOVIEMANIA</h1>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/tv-shows" className="nav-link">TV Shows</Link>
            <Link to="/movies" className="nav-link">Movies</Link>
            <Link to="/my-list" className="nav-link">My List</Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            {showSearch ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <Input
                  type="text"
                  placeholder="Titles, people, genres"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-[200px] bg-black/80 border-white/20 text-white"
                  autoFocus
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  type="button"
                  onClick={() => setShowSearch(false)}
                  className="text-netflix-gray"
                >
                  ✕
                </Button>
              </form>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowSearch(true)}
                className="text-netflix-gray hover:text-white"
              >
                <Search />
              </Button>
            )}
          </div>
          
          <Button variant="ghost" size="icon" className="text-netflix-gray hover:text-white">
            <Bell />
          </Button>
          
          <Button variant="ghost" size="icon" className="text-netflix-gray hover:text-white">
            <User />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
