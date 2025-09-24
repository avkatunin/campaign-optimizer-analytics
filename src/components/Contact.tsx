
import { MapPin, Mail, Phone } from "lucide-react";

const ContactInfo = ({ icon, title, details }) => (
  <div className="flex flex-col items-center text-center mb-8 md:mb-0">
    <div className="w-16 h-16 flex items-center justify-center bg-primary rounded-full mb-4">
      {icon}
    </div>
    <h3 className="font-cormorant text-xl mb-2">{title}</h3>
    <p className="font-montserrat text-neutral-700">{details}</p>
  </div>
);

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-cormorant text-4xl md:text-5xl mb-6">Get in Touch</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="font-montserrat text-neutral-700">I'd love to hear from you. Drop me a line for inquiries, collaborations, or just to say hello.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <ContactInfo 
            icon={<MapPin className="w-6 h-6 text-neutral-800" />}
            title="Address"
            details="123 Design Street, San Francisco, CA 94103"
          />
          <ContactInfo 
            icon={<Mail className="w-6 h-6 text-neutral-800" />}
            title="Email"
            details="hello@liyaakhaz.com"
          />
          <ContactInfo 
            icon={<Phone className="w-6 h-6 text-neutral-800" />}
            title="Phone"
            details="+1 (415) 555-0123"
          />
        </div>
        
        <div className="max-w-3xl mx-auto">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block font-montserrat text-sm font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full font-montserrat p-3 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-montserrat text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full font-montserrat p-3 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Your Email"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block font-montserrat text-sm font-medium mb-2">Subject</label>
              <input 
                type="text" 
                id="subject" 
                className="w-full font-montserrat p-3 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Subject"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block font-montserrat text-sm font-medium mb-2">Message</label>
              <textarea 
                id="message" 
                rows={6} 
                className="w-full font-montserrat p-3 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button 
                type="submit" 
                className="bg-neutral-900 text-white font-montserrat text-sm tracking-wider uppercase py-3 px-8 hover:bg-neutral-800 transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
