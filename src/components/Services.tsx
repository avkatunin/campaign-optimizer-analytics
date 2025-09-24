
import { Palette, Code, BarChart3, Lightbulb } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Palette className="w-12 h-12 mb-6 text-neutral-900" />,
      title: "UI/UX Design",
      description: "Creating intuitive, accessible, and visually appealing user interfaces that enhance user experience."
    },
    {
      icon: <Code className="w-12 h-12 mb-6 text-neutral-900" />,
      title: "Web Development",
      description: "Building responsive, performant websites using modern technologies and best practices."
    },
    {
      icon: <BarChart3 className="w-12 h-12 mb-6 text-neutral-900" />,
      title: "Digital Strategy",
      description: "Developing comprehensive digital strategies to achieve business goals and engage target audiences."
    },
    {
      icon: <Lightbulb className="w-12 h-12 mb-6 text-neutral-900" />,
      title: "Creative Direction",
      description: "Guiding creative processes to ensure cohesive, on-brand visual and interactive experiences."
    },
  ];

  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-cormorant text-4xl md:text-5xl mb-6">Skills & Services</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="font-montserrat text-neutral-700">
            I offer a range of services to help businesses create meaningful digital experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-8 text-center transition-transform hover:-translate-y-2 duration-300"
            >
              {service.icon}
              <h3 className="font-cormorant text-2xl mb-4">{service.title}</h3>
              <p className="font-montserrat text-neutral-700">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
