
import { Briefcase as BriefcaseIcon, GraduationCap } from "lucide-react";

const ResumeItem = ({ title, period, organization, description }) => (
  <div className="mb-10 relative pl-8 border-l-2 border-primary py-2">
    <span className="absolute top-0 left-[-9px] w-4 h-4 rounded-full bg-primary"></span>
    <h3 className="font-cormorant text-2xl font-medium mb-1">{title}</h3>
    <p className="font-montserrat text-sm text-neutral-600 uppercase tracking-wider mb-3">{period} | {organization}</p>
    <p className="font-montserrat text-neutral-700">{description}</p>
  </div>
);

const Resume = () => {
  const experiences = [
    {
      title: "Senior UX Designer",
      period: "2021 - Present",
      organization: "DesignHub Inc.",
      description: "Lead UX designer for multiple enterprise-level projects, creating intuitive digital experiences through research-driven design methodologies. Collaborate with cross-functional teams to align design solutions with business objectives."
    },
    {
      title: "UI/UX Designer",
      period: "2018 - 2021",
      organization: "Creative Solutions",
      description: "Designed user interfaces for various web and mobile applications, focusing on responsive design and accessibility. Conducted user testing and implemented feedback to improve product usability."
    },
    {
      title: "Junior Web Developer",
      period: "2016 - 2018",
      organization: "TechStart Agency",
      description: "Developed responsive websites using HTML, CSS, and JavaScript. Collaborated with designers to implement pixel-perfect interfaces based on design specifications."
    }
  ];

  const education = [
    {
      title: "Master of Design",
      period: "2014 - 2016",
      organization: "California Institute of Design",
      description: "Specialized in User Experience Design with focus on human-computer interaction. Thesis project on improving accessibility in digital interfaces for users with visual impairments."
    },
    {
      title: "Bachelor of Fine Arts",
      period: "2010 - 2014",
      organization: "State University of Arts",
      description: "Major in Graphic Design with minor in Computer Science. Graduated with honors and received the Outstanding Student Award."
    },
    {
      title: "UX Design Certification",
      period: "2015",
      organization: "Nielsen Norman Group",
      description: "Completed comprehensive UX certification program covering research methods, design principles, information architecture, and interaction design."
    }
  ];

  return (
    <section id="resume" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-cormorant text-4xl md:text-5xl mb-6">Experience & Education</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="font-montserrat text-neutral-700">My professional journey and academic background.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <BriefcaseIcon className="w-6 h-6" />
              <h3 className="font-cormorant text-3xl">Work Experience</h3>
            </div>
            
            {experiences.map((item, index) => (
              <ResumeItem key={index} {...item} />
            ))}
          </div>
          
          <div>
            <div className="flex items-center gap-4 mb-8">
              <GraduationCap className="w-6 h-6" />
              <h3 className="font-cormorant text-3xl">Education</h3>
            </div>
            
            {education.map((item, index) => (
              <ResumeItem key={index} {...item} />
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="/resume.pdf" 
            className="inline-block bg-neutral-900 text-white font-montserrat text-sm tracking-wider uppercase py-3 px-8 hover:bg-neutral-800 transition-colors"
            target="_blank" 
            rel="noopener noreferrer"
          >
            Download Full Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default Resume;
