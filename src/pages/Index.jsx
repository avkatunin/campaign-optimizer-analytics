import { ChartBar, Users, DollarSign, Target, Rocket } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg z-50 border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-6">
              <a
                target="_blank"
                href="https://app.vneshka.pro"
                className="bg-primary px-6 py-2 rounded-full text-white font-medium hover:bg-secondary transition-colors"
              >
                Попробовать сейчас
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <span
            className="inline-block px-4 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6 animate-fade-up opacity-0"
            style={{ animationDelay: "0.2s" }}
          >
            Transform Your Influencer Marketing
          </span>
          <h1
            className="font-display text-5xl md:text-6xl font-bold mb-6 animate-fade-up opacity-0"
            style={{ animationDelay: "0.4s" }}
          >
            Optimize Your Influencer Campaigns with Data-Driven Insights
          </h1>
          <p
            className="text-gray-600 text-xl mb-10 animate-fade-up opacity-0"
            style={{ animationDelay: "0.6s" }}
          >
            Make informed decisions and maximize ROI with our advanced analytics
            platform designed for marketplace sellers.
          </p>
          <div
            className="flex justify-center gap-4 animate-fade-up opacity-0"
            style={{ animationDelay: "0.8s" }}
          >
            <button className="bg-primary px-8 py-3 rounded-full text-white font-medium hover:bg-secondary transition-colors">
              Start Free Trial
            </button>
            <Link
              to="/links"
              className="border border-gray-200 px-8 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors"
            >
              View Links Table
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-medium">Features</span>
            <h2 className="font-display text-4xl font-bold mt-2 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Powerful tools to analyze, optimize, and scale your influencer
              marketing campaigns.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <ChartBar className="w-6 h-6" />,
                title: "Advanced Analytics",
                description:
                  "Track performance metrics and ROI in real-time with detailed insights.",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Influencer Matching",
                description:
                  "Find the perfect influencers for your brand using AI-powered matching.",
              },
              {
                icon: <DollarSign className="w-6 h-6" />,
                title: "ROI Optimization",
                description:
                  "Maximize returns with data-driven campaign optimization strategies.",
              },
              {
                icon: <Target className="w-6 h-6" />,
                title: "Campaign Tracking",
                description:
                  "Monitor campaign performance and engagement in real-time.",
              },
              {
                icon: <Rocket className="w-6 h-6" />,
                title: "Performance Insights",
                description:
                  "Get actionable insights to improve campaign effectiveness.",
              },
              {
                icon: <ChartBar className="w-6 h-6" />,
                title: "Custom Reports",
                description:
                  "Generate comprehensive reports with key metrics and insights.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-display text-xl font-bold mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-primary rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50"></div>
            <div className="relative z-10">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to optimize your campaigns?
              </h2>
              <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
                Join thousands of marketplace sellers who are already maximizing
                their ROI with our platform.
              </p>
              <button className="bg-white text-primary px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12">
        <div className="container mx-auto px-6 text-center text-gray-600">
          <p>&copy; 2024 ВнешкаПРО. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
