import { useEffect, useState, useRef } from "react";
import {
  ChevronRight,
  Code,
  Database,
  Globe,
  Smartphone,
  Cpu,
  Zap,
  Shield,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

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

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    setIsVisible(true);
  }, []);

  const services = [
    {
      icon: <Cpu className="w-12 h-12" />,
      title: "Semiconductor Solutions",
      description:
        "Advanced semiconductor design and manufacturing solutions for next-generation technology applications.",
      features: [
        "ASIC Design",
        "FPGA Development",
        "Verification Services",
        "Testing Solutions",
      ],
    },
    {
      icon: <Code className="w-12 h-12" />,
      title: "Custom Software Development",
      description:
        "Tailored software solutions built with cutting-edge technologies to meet your unique business requirements.",
      features: [
        "Web Applications",
        "Mobile Apps",
        "Desktop Software",
        "API Development",
      ],
    },
    {
      icon: <Database className="w-12 h-12" />,
      title: "Data Analytics & AI",
      description:
        "Transform your data into actionable insights with our advanced analytics and artificial intelligence solutions.",
      features: [
        "Machine Learning",
        "Data Visualization",
        "Predictive Analytics",
        "Business Intelligence",
      ],
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Cloud Infrastructure",
      description:
        "Scalable cloud solutions designed to support your business growth and digital transformation initiatives.",
      features: [
        "Cloud Migration",
        "DevOps Services",
        "Infrastructure as Code",
        "Security Management",
      ],
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Cybersecurity",
      description:
        "Comprehensive security solutions to protect your digital assets and ensure business continuity.",
      features: [
        "Security Audits",
        "Penetration Testing",
        "Compliance Management",
        "Incident Response",
      ],
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "IoT Solutions",
      description:
        "End-to-end Internet of Things solutions connecting devices and enabling smart operations.",
      features: [
        "Device Connectivity",
        "Edge Computing",
        "Real-time Monitoring",
        "Predictive Maintenance",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-dark-bg via-background to-card-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className={`transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Our <span className="text-gradient">Services</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Comprehensive technology solutions designed to drive innovation
                and accelerate your business growth
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <Section>
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`bg-card border border-border-subtle rounded-xl p-8 card-hover group`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-tech-blue mb-6 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="text-muted-foreground flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 bg-coral rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Section>

      {/* CTA Section */}
      <Section>
        <section className="py-20 bg-card-bg">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Let's discuss how our solutions can drive your success
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/get-started"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg text-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2 group"
                >
                  Get Started
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/get-started"
                  className="border border-border-subtle hover:border-tech-blue text-foreground px-8 py-4 rounded-lg text-lg transition-all duration-200 hover:scale-105 text-center block"
                >
                  Schedule Consultation
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Section>

      <Footer />
    </div>
  );
}
