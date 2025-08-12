import { useEffect, useState, useRef } from "react";
import { Award, Users, Lightbulb, Target, ChevronRight } from "lucide-react";
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

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    setIsVisible(true);
  }, []);

  const expertise = [
    {
      title: "EXPERTISE",
      description:
        "Our team consists of experienced software developers and designers who have worked on a variety of projects. We have expertise in a range of technologies and tools, including cloud computing, machine learning, and blockchain technology.",
    },
    {
      title: "QUALITY",
      description:
        "We are committed to delivering high-quality software solutions to our clients. Our team follows best practices in software development and testing to ensure that our clients receive a reliable and bug-free product.",
    },
  ];

  const achievements = [
    {
      number: "500+",
      label: "Projects Completed",
      icon: <Target className="w-8 h-8" />,
    },
    {
      number: "50+",
      label: "Happy Clients",
      icon: <Users className="w-8 h-8" />,
    },
    {
      number: "15+",
      label: "Years Experience",
      icon: <Award className="w-8 h-8" />,
    },
    {
      number: "24/7",
      label: "Support Available",
      icon: <Lightbulb className="w-8 h-8" />,
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
                About <span className="text-gradient">Us</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Finding Inspiration in Every Turn
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <Section>
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                ASOCSEMI was founded in 2021 by a group of VLSI DV Engineers &
                software developers with a passion for creating innovative
                solutions. Over the years, we have grown into a leading
                VLSI-SOC&IP service providers and software development company,
                serving clients in a wide range of industries.
              </p>
            </div>
          </div>
        </section>
      </Section>

      {/* Expertise & Quality */}
      <Section>
        <section className="py-20 bg-card-bg">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {expertise.map((item, index) => (
                  <div
                    key={index}
                    className="bg-card border border-border-subtle rounded-xl p-8"
                  >
                    <h2 className="text-2xl font-bold text-gradient mb-6 text-center">
                      {item.title}
                    </h2>
                    <p className="text-muted-foreground text-center leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Section>

      {/* Statistics */}
      <Section>
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Our <span className="text-gradient">Achievements</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Numbers that reflect our commitment to excellence
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="bg-card border border-border-subtle rounded-xl p-6 text-center card-hover group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-tech-blue mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                      {achievement.icon}
                    </div>
                    <div className="text-3xl lg:text-4xl font-bold text-gradient mb-2">
                      {achievement.number}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {achievement.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Section>

      {/* Training Section */}
      <Section>
        <section className="py-20 bg-card-bg">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
                Training the <span className="text-gradient">Best</span>
              </h2>

              <div className="bg-card border border-border-subtle rounded-xl p-8 mb-8">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Training candidates on domains like VLSI, AI, and supporting
                  hardware and software is a strategic investment for any
                  technology-focused organization. It equips the workforce with
                  specialized skills, enabling them to work on complex projects
                  and remain at the forefront of innovation.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Providing in-house training offers several benefits, including
                  customization to fit company-specific needs and fostering a
                  culture of continuous learning. It also allows for
                  cross-functional collaboration, encouraging employees to share
                  knowledge across teams.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Keeping trained candidates "on the bench" — ready to be
                  deployed when needed — ensures flexibility in resource
                  management. This approach can reduce project downtime and
                  provide a pool of skilled talent for new or unexpected
                  projects, ultimately contributing to a more agile and
                  adaptable organization.
                </p>
              </div>

              <Link
                to="/services"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg text-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2 group mx-auto"
              >
                Learn About Our Training Programs
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </Section>

      <Footer />
    </div>
  );
}
