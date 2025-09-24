
import { useState } from "react";

const ProjectCard = ({ image, category, title, link }) => (
  <div className="group relative overflow-hidden">
    <div className="aspect-square overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>
    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
      <div className="text-center p-4">
        <span className="block font-montserrat text-primary text-sm uppercase tracking-wider mb-2">{category}</span>
        <h3 className="font-cormorant text-white text-2xl mb-4">{title}</h3>
        <a 
          href={link} 
          className="inline-block border border-white text-white font-montserrat text-sm tracking-wider uppercase py-2 px-4 hover:bg-white hover:text-black transition-colors"
        >
          View Project
        </a>
      </div>
    </div>
  </div>
);

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  
  const filters = ["all", "web design", "mobile app", "ux research", "branding"];
  
  const projects = [
    {
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      category: "web design",
      title: "E-commerce Website Redesign",
      link: "#"
    },
    {
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
      category: "ux research",
      title: "Financial App User Testing",
      link: "#"
    },
    {
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      category: "mobile app",
      title: "Health Tracking Application",
      link: "#"
    },
    {
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      category: "web design",
      title: "Portfolio Website Template",
      link: "#"
    },
    {
      image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=800&q=80",
      category: "mobile app",
      title: "Fitness Wearable Interface",
      link: "#"
    },
    {
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800&q=80",
      category: "branding",
      title: "Tech Startup Brand Identity",
      link: "#"
    },
  ];
  
  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-cormorant text-4xl md:text-5xl mb-6">My Projects</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="font-montserrat text-neutral-700">Showcasing some of my recent work and creative projects.</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`font-montserrat text-sm uppercase tracking-wider px-4 py-2 transition-colors ${
                activeFilter === filter 
                  ? 'bg-neutral-900 text-white' 
                  : 'bg-white text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
