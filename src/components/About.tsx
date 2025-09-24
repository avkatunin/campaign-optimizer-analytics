
const About = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-cormorant text-4xl md:text-5xl mb-6">About Me</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="font-montserrat text-neutral-700">Designer, developer, and creative problem solver with a passion for creating exceptional digital experiences.</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-2/5">
            <div className="aspect-[4/5] rounded-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" 
                alt="Liya Akhaz professional portrait" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="w-full md:w-3/5">
            <h3 className="font-cormorant text-3xl mb-6">UX Designer & Frontend Developer</h3>
            <p className="font-montserrat text-neutral-700 mb-6">
              I'm a passionate designer and developer with over 5 years of experience creating digital products that are both beautiful and functional. My approach combines user-centered design principles with clean, efficient code to build solutions that delight users and solve real problems.
            </p>
            <p className="font-montserrat text-neutral-700 mb-8">
              With expertise in UX/UI design, responsive web development, and digital strategy, I collaborate with businesses to transform their ideas into compelling digital experiences. I believe that great design is not just about aesthetics but also about creating intuitive, accessible, and impactful solutions.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="font-montserrat font-semibold mb-2">Name:</h4>
                <p className="font-montserrat text-neutral-700">Liya Akhaz</p>
              </div>
              <div>
                <h4 className="font-montserrat font-semibold mb-2">Email:</h4>
                <p className="font-montserrat text-neutral-700">hello@liyaakhaz.com</p>
              </div>
              <div>
                <h4 className="font-montserrat font-semibold mb-2">From:</h4>
                <p className="font-montserrat text-neutral-700">San Francisco, CA</p>
              </div>
              <div>
                <h4 className="font-montserrat font-semibold mb-2">Freelance:</h4>
                <p className="font-montserrat text-neutral-700">Available</p>
              </div>
            </div>
            
            <a 
              href="#resume" 
              className="inline-block bg-neutral-900 text-white font-montserrat text-sm tracking-wider uppercase py-3 px-8 hover:bg-neutral-800 transition-colors"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
