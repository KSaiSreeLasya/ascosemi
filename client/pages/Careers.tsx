import { useEffect, useState, useRef } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  ChevronRight,
  Send,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ApplicationModal from "../components/ApplicationModal";
import Swal from "sweetalert2";

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

export default function Careers() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    setIsVisible(true);
  }, []);

  const handleApplyClick = (job: any) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const handleFileUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.doc,.docx";

    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        // Show loading
        Swal.fire({
          title: "Uploading Resume...",
          text: "Please wait while we process your file",
          icon: "info",
          allowOutsideClick: false,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
        });

        // Simulate file upload
        setTimeout(() => {
          console.log("File uploaded:", file.name);

          Swal.fire({
            title: "Resume Uploaded!",
            text: `Thank you for submitting your resume (${file.name}). We'll review it and get back to you soon.`,
            icon: "success",
            confirmButtonText: "Great!",
            confirmButtonColor: "#FF6B5A",
          });
        }, 2000);
      }
    };

    input.click();
  };

  const jobOpenings = [
    {
      title: "Senior VLSI Design Engineer",
      department: "Engineering",
      location: "Bangalore, India",
      type: "Full-time",
      description:
        "Lead VLSI design projects for next-generation semiconductor solutions.",
    },
    {
      title: "Software Developer - AI/ML",
      department: "Software Development",
      location: "Hyderabad, India",
      type: "Full-time",
      description: "Develop cutting-edge AI and machine learning applications.",
    },
    {
      title: "Hardware Verification Engineer",
      department: "Verification",
      location: "Chennai, India",
      type: "Full-time",
      description:
        "Verify complex hardware designs using industry-standard methodologies.",
    },
    {
      title: "Product Manager - IoT Solutions",
      department: "Product",
      location: "Mumbai, India",
      type: "Full-time",
      description: "Drive product strategy for innovative IoT solutions.",
    },
    {
      title: "DevOps Engineer",
      department: "Infrastructure",
      location: "Remote",
      type: "Full-time",
      description:
        "Build and maintain scalable cloud infrastructure and deployment pipelines.",
    },
    {
      title: "UI/UX Designer",
      department: "Design",
      location: "Pune, India",
      type: "Full-time",
      description:
        "Create intuitive and engaging user experiences for our technology platforms.",
    },
  ];

  const benefits = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaborative Environment",
      description:
        "Work with talented professionals in a supportive team atmosphere",
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Career Growth",
      description:
        "Continuous learning opportunities and clear advancement paths",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Work-Life Balance",
      description: "Flexible working hours and remote work options",
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
                Join Our <span className="text-gradient">Team</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Build the future of technology with ASOCSEMI
              </p>
              <p className="text-lg text-muted-foreground">
                We're looking for passionate individuals who want to make a
                difference in the world of technology
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <Section>
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Why Choose <span className="text-gradient">ASOCSEMI</span>?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Join a company that values innovation, growth, and work-life
                  balance
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-card border border-border-subtle rounded-xl p-8 text-center card-hover group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-tech-blue mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Section>

      {/* Job Openings */}
      <Section>
        <section className="py-20 bg-card-bg">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Current <span className="text-gradient">Openings</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Discover exciting opportunities to advance your career
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {jobOpenings.map((job, index) => (
                  <div
                    key={index}
                    className="bg-card border border-border-subtle rounded-xl p-6 card-hover group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-tech-blue transition-colors">
                        {job.title}
                      </h3>
                      <span className="bg-tech-blue/10 text-tech-blue px-3 py-1 rounded-full text-sm">
                        {job.type}
                      </span>
                    </div>

                    <p className="text-muted-foreground mb-4">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        {job.department}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                    </div>

                    <button
                      onClick={() => handleApplyClick(job)}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2 group"
                    >
                      Apply Now
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Section>

      {/* Contact Section */}
      <Section>
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card border border-border-subtle rounded-2xl p-8 lg:p-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                    Don't See the Right Role?
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    We're always looking for talented individuals. Send us your
                    resume and we'll keep you in mind for future opportunities.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Contact Our HR Team
                    </h3>
                    <div className="space-y-3">
                      <p className="text-muted-foreground">
                        Email: careers@asocsemi.com
                      </p>
                      <p className="text-muted-foreground">
                        Phone: +91 9599544288
                      </p>
                      <p className="text-muted-foreground">
                        Address: ASOCSEMI SOLUTIONS PVT LTD, Network Rajupatha
                        Summit, Rajupatha, Financial District, Hyderabad,
                        Telangana 500032
                      </p>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={handleFileUpload}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 rounded-lg text-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2 group"
                    >
                      <Send className="w-5 h-5" />
                      Send Your Resume
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Section>

      <Footer />

      {/* Application Modal */}
      {selectedJob && (
        <ApplicationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          jobTitle={selectedJob.title}
          jobDepartment={selectedJob.department}
          jobLocation={selectedJob.location}
        />
      )}
    </div>
  );
}
