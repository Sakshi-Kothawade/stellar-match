import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, Menu, X } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import CandidateForm from "@/components/CandidateForm";
import InternshipCard from "@/components/InternshipCard";
import SkillGuidance from "@/components/SkillGuidance";
import MockInterview from "@/components/MockInterview";
import { generateRecommendations, mockSkillGaps } from "@/data/mockData";

type AppState = "hero" | "form" | "recommendations" | "interview" | "skills";

interface CandidateData {
  name: string;
  education: string;
  location: string;
  sectors: string[];
  skills: string[];
}

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("hero");
  const [candidateData, setCandidateData] = useState<CandidateData | null>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll for back-to-top button
  window.addEventListener('scroll', () => {
    setShowScrollTop(window.scrollY > 500);
  });

  const handleGetStarted = () => {
    setCurrentState("form");
    document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFormSubmit = (data: CandidateData) => {
    setCandidateData(data);
    const recs = generateRecommendations(data);
    setRecommendations(recs);
    setCurrentState("recommendations");
    setTimeout(() => {
      document.getElementById("recommendations-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleApply = (internshipId: string) => {
    // Mock application process
    alert(`Application submitted for internship ${internshipId}! You'll receive a confirmation email shortly.`);
  };

  const handleSave = (internshipId: string) => {
    // Mock save functionality
    alert(`Internship ${internshipId} saved to your favorites!`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigationItems = [
    { label: "Home", action: () => setCurrentState("hero") },
    { label: "Find Internships", action: () => setCurrentState("form") },
    { label: "Practice Interview", action: () => setCurrentState("interview") },
    { label: "Skill Guide", action: () => setCurrentState("skills") }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="font-bold text-xl gradient-primary bg-clip-text text-transparent">
              PM Internship AI
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              {navigationItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  onClick={item.action}
                  className="transition-fast hover:text-primary"
                >
                  {item.label}
                </Button>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 space-y-2 animate-fade-in-up">
              {navigationItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  onClick={() => {
                    item.action();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-start transition-fast"
                >
                  {item.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        {currentState === "hero" && (
          <HeroSection onGetStarted={handleGetStarted} />
        )}

        {/* Form Section */}
        {(currentState === "form" || currentState === "recommendations") && (
          <div id="form-section">
            <CandidateForm onSubmit={handleFormSubmit} />
          </div>
        )}

        {/* Recommendations Section */}
        {currentState === "recommendations" && recommendations.length > 0 && (
          <section id="recommendations-section" className="py-12 px-4 bg-muted/30">
            <div className="container max-w-6xl mx-auto">
              <div className="text-center mb-12 animate-fade-in-up">
                <h2 className="text-3xl font-bold mb-4">
                  Perfect Matches for {candidateData?.name}
                </h2>
                <p className="text-muted-foreground text-lg">
                  Based on your profile, here are the top internship recommendations
                </p>
              </div>

              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {recommendations.map((internship, index) => (
                  <div key={internship.id} style={{ animationDelay: `${index * 0.1}s` }}>
                    <InternshipCard
                      internship={internship}
                      onApply={handleApply}
                      onSave={handleSave}
                    />
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button
                  onClick={() => setCurrentState("skills")}
                  className="gradient-secondary text-white hover:shadow-hover transition-smooth"
                  size="lg"
                >
                  View Skill Guidance
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Mock Interview Section */}
        {currentState === "interview" && <MockInterview />}

        {/* Skill Guidance Section */}
        {currentState === "skills" && candidateData && (
          <SkillGuidance
            userSkills={candidateData.skills}
            recommendedSkills={mockSkillGaps}
          />
        )}

        {/* Quick Actions - Always visible after form submission */}
        {candidateData && currentState !== "hero" && (
          <section className="py-8 px-4 border-t border-border">
            <div className="container max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="shadow-card hover:shadow-hover transition-smooth group cursor-pointer">
                  <CardContent className="p-6">
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentState("interview")}
                      className="w-full justify-start h-auto p-0"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                          <span className="text-white font-bold">AI</span>
                        </div>
                        <div className="text-left">
                          <h3 className="font-bold mb-1 group-hover:text-primary transition-fast">
                            Practice Interview
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Get ready with AI-powered mock interviews
                          </p>
                        </div>
                      </div>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-card hover:shadow-hover transition-smooth group cursor-pointer">
                  <CardContent className="p-6">
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentState("skills")}
                      className="w-full justify-start h-auto p-0"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full gradient-secondary flex items-center justify-center">
                          <span className="text-white font-bold">📈</span>
                        </div>
                        <div className="text-left">
                          <h3 className="font-bold mb-1 group-hover:text-primary transition-fast">
                            Skill Development
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Improve your skills with personalized guidance
                          </p>
                        </div>
                      </div>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Back to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-6 right-6 rounded-full gradient-primary text-white hover:shadow-hover transition-smooth animate-bounce-in z-40"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}

      {/* Footer */}
      <footer className="bg-muted/50 py-8 px-4 mt-12">
        <div className="container max-w-6xl mx-auto text-center">
          <div className="font-bold text-lg gradient-primary bg-clip-text text-transparent mb-2">
            PM Internship AI
          </div>
          <p className="text-sm text-muted-foreground">
            Empowering youth across India with AI-powered internship recommendations
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Built for the PM Internship Scheme • Accessible • Mobile-First • Inclusive
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
