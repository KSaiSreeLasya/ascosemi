import { useEffect, useRef, useState } from "react";
import {
  Code,
  Database,
  Globe,
  Smartphone,
  ChevronRight,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

function Section({ children, className = "" }: SectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function ContentSections() {
  return (
    <div className="py-20 bg-background">
      {/* Services Section */}
      <Section>
        <section id="services" className="container mx-auto px-4 lg:px-8 mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Our <span className="text-gradient">Capabilities</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Driving Technological Advancements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Code className="w-8 h-8" />,
                title: "Custom Development",
                description: "Tailored solutions for your unique requirements",
                delay: "delay-0",
              },
              {
                icon: <Database className="w-8 h-8" />,
                title: "Data Analytics",
                description: "Transform data into actionable insights",
                delay: "delay-200",
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Cloud Solutions",
                description: "Scalable infrastructure for modern businesses",
                delay: "delay-400",
              },
              {
                icon: <Smartphone className="w-8 h-8" />,
                title: "Mobile Apps",
                description: "Native and cross-platform mobile solutions",
                delay: "delay-600",
              },
            ].map((service, index) => (
              <div
                key={index}
                className={`card-hover bg-card border border-border-subtle rounded-lg p-6 text-center group ${service.delay}`}
              >
                <div className="text-tech-blue mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </section>
      </Section>

      {/* Feature Grid Section */}
      <Section>
        <section className="container mx-auto px-4 lg:px-8 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Experience the Power of{" "}
                <span className="text-gradient">Technological Innovation</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We deliver cutting-edge solutions that transform your business
                operations and drive sustainable growth through innovative
                technology implementations.
              </p>
              <Link
                to="/services"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 flex items-center gap-2 group w-fit"
              >
                Learn More
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right Visual Grid */}
            <div className="order-1 lg:order-2 grid grid-cols-2 gap-4 max-w-md mx-auto lg:max-w-none">
              <div
                className="bg-card border border-border-subtle rounded-lg pt-11 px-6 pb-6 card-hover"
                style={{ marginTop: "10px" }}
              >
                <BarChart3 className="w-6 h-6 lg:w-8 lg:h-8 text-tech-blue mb-3 lg:mb-4" />
                <h4 className="text-base lg:text-lg font-semibold text-foreground mb-1 lg:mb-2">
                  Analytics
                </h4>
                <p className="text-muted-foreground text-xs lg:text-sm">
                  Real-time insights and data visualization
                </p>
              </div>
              <div className="bg-card border border-border-subtle rounded-lg p-4 lg:p-6 card-hover mt-8 lg:mt-8">
                <Database className="w-6 h-6 lg:w-8 lg:h-8 text-coral mb-3 lg:mb-4" />
                <h4 className="text-base lg:text-lg font-semibold text-foreground mb-1 lg:mb-2">
                  Storage
                </h4>
                <p className="text-muted-foreground text-xs lg:text-sm">
                  Secure and scalable data management
                </p>
              </div>
              <div className="bg-card border border-border-subtle rounded-lg p-4 lg:p-6 card-hover mt-4 lg:mt-4">
                <Globe className="w-6 h-6 lg:w-8 lg:h-8 text-tech-blue mb-3 lg:mb-4" />
                <h4 className="text-base lg:text-lg font-semibold text-foreground mb-1 lg:mb-2">
                  Global
                </h4>
                <p className="text-muted-foreground text-xs lg:text-sm">
                  Worldwide deployment and support
                </p>
              </div>
              <div className="bg-card border border-border-subtle rounded-lg p-4 lg:p-6 card-hover mt-2 lg:mt-4">
                <Code className="w-6 h-6 lg:w-8 lg:h-8 text-coral mb-3 lg:mb-4" />
                <h4 className="text-base lg:text-lg font-semibold text-foreground mb-1 lg:mb-2">
                  Custom
                </h4>
                <p className="text-muted-foreground text-xs lg:text-sm">
                  Tailored solutions for your needs
                </p>
              </div>
            </div>
          </div>
        </section>
      </Section>

      {/* Statistics Section */}
      <Section>
        <section className="container mx-auto px-4 lg:px-8 mb-32">
          <div className="bg-card border border-border-subtle rounded-2xl p-8 lg:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Numbers That Matter
              </h2>
              <p className="text-lg text-muted-foreground">
                Our track record speaks for itself
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: "4", label: "Years Experience", suffix: "+" },
                { number: "3", label: "Team Members", suffix: "" },
                { number: "99", label: "Success Rate", suffix: "%" },
                { number: "24", label: "Support Hours", suffix: "/7" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl lg:text-6xl font-bold text-gradient mb-2">
                    {stat.number}
                    <span className="text-2xl lg:text-4xl">{stat.suffix}</span>
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Section>

      {/* About Section */}
      <Section>
        <section id="about" className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Stay updated with the latest technological innovations and
              industry insights. Join our community of forward-thinking
              professionals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-card border border-border-subtle rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-tech-blue"
              />
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </Section>
    </div>
  );
}
