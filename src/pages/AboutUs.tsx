
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Github, Linkedin, Mail } from "lucide-react";

const AboutUs = () => {
  const developers = [
    {
      name: "Premkumar Border",
      role: "Frontend Developer",
      bio: "Passionate about creating seamless user experiences with React and TypeScript.",
      image: "https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-9904-61f7-9af3-9daf34388556/raw?se=2025-04-13T12%3A03%3A38Z&sp=r&sv=2024-08-04&sr=b&scid=d098ba57-0686-55d1-adb6-b32619ec33a0&skoid=dfdaf859-26f6-4fed-affc-1befb5ac1ac2&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-13T06%3A15%3A27Z&ske=2025-04-14T06%3A15%3A27Z&sks=b&skv=2024-08-04&sig=ZPxQ0PBE5e0xQpBx6RkgK1mLL7ys6m4IprkXHcdHwPc%3D",
      email: "john@moviemania.com"
    },
    {
      name: "Jane Smith",
      role: "UI/UX Designer",
      bio: "Creative designer focused on intuitive interfaces and engaging visual experiences.",
      image: "https://picsum.photos/id/1027/300/300",
      github: "https://github.com/janesmith",
      linkedin: "https://linkedin.com/in/janesmith",
      email: "jane@moviemania.com"
    },
    {
      name: "Michael Johnson",
      role: "Backend Developer",
      bio: "API specialist with expertise in building scalable and secure backend solutions.",
      image: "https://picsum.photos/id/1025/300/300",
      github: "https://github.com/michaeljohnson",
      linkedin: "https://linkedin.com/in/michaeljohnson",
      email: "michael@moviemania.com"
    }
  ];

  return (
    <div className="bg-netflix-black text-white min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4 md:px-12 max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">About Us</h1>
        <p className="text-netflix-gray mb-8 max-w-3xl">
          Moviemania was created by a team of passionate developers who love movies and 
          wanted to build a platform that offers an immersive streaming experience.
        </p>
        
        <h2 className="text-2xl font-bold mb-6 text-white">Meet Our Team</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {developers.map((developer, index) => (
            <div 
              key={index} 
              className="bg-netflix-black-light rounded-lg overflow-hidden border border-netflix-gray/20 hover:border-netflix-gray/50 transition-all duration-300 hover:shadow-lg hover:shadow-netflix-red/5 hover:-translate-y-1"
            >
              <img 
                src={developer.image} 
                alt={developer.name} 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1">{developer.name}</h3>
                <p className="text-netflix-red mb-3">{developer.role}</p>
                <p className="text-netflix-gray text-sm mb-4">{developer.bio}</p>
                
                <div className="flex items-center gap-4">
                  <a 
                    href={developer.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-netflix-gray hover:text-white transition-colors"
                    aria-label={`${developer.name}'s GitHub`}
                  >
                    <Github size={20} />
                  </a>
                  <a 
                    href={developer.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-netflix-gray hover:text-white transition-colors"
                    aria-label={`${developer.name}'s LinkedIn`}
                  >
                    <Linkedin size={20} />
                  </a>
                  <a 
                    href={`mailto:${developer.email}`} 
                    className="text-netflix-gray hover:text-white transition-colors"
                    aria-label={`Email ${developer.name}`}
                  >
                    <Mail size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
