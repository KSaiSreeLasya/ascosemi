import { useEffect, useState } from "react";
import { X, Mail, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { GoogleAuthService, GoogleUser } from "../services/googleAuth";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    document.documentElement.classList.add("dark");
    setIsVisible(true);

    // Initialize Google Auth
    GoogleAuthService.initialize().catch(console.error);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoogleLogin = async () => {
    try {
      // Show loading
      Swal.fire({
        title: "Connecting to Google...",
        text: "Please wait while we authenticate with Google",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });

      const user: GoogleUser | null = await GoogleAuthService.signIn();

      if (user) {
        // Store user data
        localStorage.setItem("google_user", JSON.stringify(user));

        Swal.fire({
          title: "Welcome!",
          text: `Successfully signed in as ${user.name}`,
          icon: "success",
          confirmButtonText: "Continue",
          confirmButtonColor: "#4285F4",
        }).then(() => {
          navigate("/"); // Redirect to home page
        });
      }
    } catch (error) {
      console.error("Google Auth Error:", error);

      Swal.fire({
        title: "Authentication Failed",
        text: "Please check if Google OAuth is properly configured. For demo purposes, this requires Google Cloud Console setup.",
        icon: "warning",
        confirmButtonText: "Got it!",
        confirmButtonColor: "#4285F4",
      });
    }
  };

  const handleFacebookLogin = () => {
    // Show loading
    Swal.fire({
      title: "Connecting to Facebook...",
      text: "Please wait while we redirect you to Facebook",
      icon: "info",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    // Simulate OAuth process
    setTimeout(() => {
      Swal.fire({
        title: "Facebook Sign-In",
        text: "Facebook OAuth would be implemented here with proper credentials",
        icon: "info",
        confirmButtonText: "Got it!",
        confirmButtonColor: "#1877F2",
      });
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignUp && formData.password !== formData.confirmPassword) {
      Swal.fire({
        title: "Error!",
        text: "Passwords do not match",
        icon: "error",
        confirmButtonText: "Try again",
        confirmButtonColor: "#FF6B5A",
      });
      return;
    }

    // Show loading
    Swal.fire({
      title: isSignUp ? "Creating Account..." : "Signing In...",
      text: "Please wait while we process your request",
      icon: "info",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    // Simulate authentication
    setTimeout(() => {
      console.log("Form submitted:", formData);

      Swal.fire({
        title: "Success!",
        text: isSignUp ? "Account created successfully!" : "Welcome back!",
        icon: "success",
        confirmButtonText: "Continue",
        confirmButtonColor: "#FF6B5A",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className={
          'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Ccircle cx="7" cy="7" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] opacity-50'
        }
      ></div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-tech-blue rounded-full animate-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Close Button */}
      <Link
        to="/"
        className="absolute top-6 right-6 w-10 h-10 bg-card border border-border-subtle rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-tech-blue transition-all duration-200 z-10"
      >
        <X className="w-5 h-5" />
      </Link>

      {/* Login/Signup Form */}
      <div
        className={`w-full max-w-md transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="bg-card border border-border-subtle rounded-2xl p-8 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {isSignUp ? "Sign Up" : "Sign In"}
            </h1>
            <p className="text-muted-foreground">
              {isSignUp ? (
                <>
                  Already a member?{" "}
                  <button
                    onClick={() => setIsSignUp(false)}
                    className="text-tech-blue hover:text-coral transition-colors"
                  >
                    Log in
                  </button>
                </>
              ) : (
                <>
                  New to ASOCSEMI?{" "}
                  <button
                    onClick={() => setIsSignUp(true)}
                    className="text-tech-blue hover:text-coral transition-colors"
                  >
                    Sign up
                  </button>
                </>
              )}
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-3 border"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign {isSignUp ? "up" : "in"} with Google
            </button>

            <button
              onClick={handleFacebookLogin}
              className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white py-3 px-4 rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Sign {isSignUp ? "up" : "in"} with Facebook
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-subtle"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-card px-2 text-muted-foreground">or</span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-background border border-border-subtle rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-tech-blue transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-background border border-border-subtle rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-tech-blue transition-all duration-200"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-background border border-border-subtle rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-tech-blue transition-all duration-200"
                required
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-background border border-border-subtle rounded-lg px-4 py-3 pr-12 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-tech-blue transition-all duration-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {isSignUp && (
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full bg-background border border-border-subtle rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-tech-blue transition-all duration-200"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg transition-all duration-200 hover:scale-105 font-medium"
            >
              {isSignUp ? "Create Account" : "Sign In"}
            </button>
          </form>

          {/* Terms */}
          {isSignUp && (
            <div className="mt-6">
              <label className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  className="mt-1 accent-tech-blue"
                  required
                />
                <span className="text-muted-foreground">
                  Sign up to this site with a public profile.{" "}
                  <Link
                    to="#"
                    className="text-tech-blue hover:text-coral transition-colors"
                  >
                    Read more
                  </Link>
                </span>
              </label>
            </div>
          )}

          {!isSignUp && (
            <div className="mt-6 text-center">
              <Link
                to="#"
                className="text-tech-blue hover:text-coral transition-colors text-sm"
              >
                Forgot your password?
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
