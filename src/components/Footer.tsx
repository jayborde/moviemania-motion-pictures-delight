
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-10 px-4 md:px-12 text-netflix-gray mt-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-6 mb-6">
          <a href="#" className="hover:text-white transition-colors">
            <Facebook size={24} />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <Twitter size={24} />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <Instagram size={24} />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <Youtube size={24} />
          </a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Audio Description</a></li>
              <li><a href="#" className="hover:underline">Investor Relations</a></li>
              <li><a href="#" className="hover:underline">Legal Notices</a></li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Help Center</a></li>
              <li><a href="#" className="hover:underline">Jobs</a></li>
              <li><a href="#" className="hover:underline">Cookie Preferences</a></li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Gift Cards</a></li>
              <li><a href="#" className="hover:underline">Terms of Use</a></li>
              <li><a href="#" className="hover:underline">Corporate Information</a></li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Media Center</a></li>
              <li><a href="#" className="hover:underline">Privacy</a></li>
              <li><a href="#" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
