
const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center relative bg-primary/10 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="bg-[url('https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=2000&q=80')] w-full h-full bg-cover bg-center opacity-20"></div>
      </div>
      <div className="container mx-auto px-4 md:px-8 z-10 pt-20">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-12 md:mb-0 text-center md:text-left">
            <h4 className="font-montserrat text-lg uppercase tracking-widest mb-4 text-neutral-700">Hello, I am</h4>
            <h1 className="font-cormorant text-5xl md:text-7xl font-light mb-6">Liya Akhaz</h1>
            <p className="font-montserrat text-lg md:text-xl mb-8 max-w-xl mx-auto md:mx-0 text-neutral-700">
              UX Designer & Frontend Developer specializing in creating beautiful, functional digital experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a 
                href="#projects" 
                className="bg-neutral-900 text-white font-montserrat text-sm tracking-wider uppercase py-3 px-8 hover:bg-neutral-800 transition-colors"
              >
                View My Work
              </a>
              <a 
                href="#contact" 
                className="border border-neutral-900 text-neutral-900 font-montserrat text-sm tracking-wider uppercase py-3 px-8 hover:bg-neutral-100 transition-colors"
              >
                Contact Me
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="max-w-md mx-auto">
              <div className="aspect-[3/4] rounded-md overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?auto=format&fit=crop&w=800&q=80" 
                  alt="Liya Akhaz" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
