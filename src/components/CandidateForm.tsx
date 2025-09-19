import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  MapPin, 
  Briefcase, 
  Star, 
  X,
  Plus,
  ArrowRight
} from "lucide-react";

interface CandidateData {
  name: string;
  education: string;
  location: string;
  sectors: string[];
  skills: string[];
}

interface CandidateFormProps {
  onSubmit: (data: CandidateData) => void;
}

const skillOptions = [
  "Communication", "Programming", "Data Analysis", "Marketing", 
  "Design", "Research", "Project Management", "Leadership",
  "Social Media", "Content Writing", "Sales", "Teaching"
];

const sectorOptions = [
  "Technology", "Healthcare", "Education", "Finance", 
  "Agriculture", "Manufacturing", "Government", "NGO"
];

const CandidateForm = ({ onSubmit }: CandidateFormProps) => {
  const [formData, setFormData] = useState<CandidateData>({
    name: "",
    education: "",
    location: "",
    sectors: [],
    skills: []
  });

  const [skillInput, setSkillInput] = useState("");

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const toggleSector = (sector: string) => {
    setFormData(prev => ({
      ...prev,
      sectors: prev.sectors.includes(sector)
        ? prev.sectors.filter(s => s !== sector)
        : [...prev.sectors, sector]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isValid = formData.name && formData.education && formData.location && 
                 formData.sectors.length > 0 && formData.skills.length > 0;

  return (
    <section className="py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        <Card className="shadow-card animate-fade-in-up">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3">
              <Star className="h-8 w-8 text-primary" />
              Tell Us About You
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Simple details to find your perfect internship match
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base font-medium flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="transition-fast"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-base font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Preferred Location
                  </Label>
                  <Input
                    id="location"
                    placeholder="City, State"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="transition-fast"
                  />
                </div>
              </div>

              {/* Education */}
              <div className="space-y-2">
                <Label className="text-base font-medium flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  Education Level
                </Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, education: value }))}>
                  <SelectTrigger className="transition-fast">
                    <SelectValue placeholder="Select your education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12th">12th Grade</SelectItem>
                    <SelectItem value="diploma">Diploma</SelectItem>
                    <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                    <SelectItem value="master">Master's Degree</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sectors */}
              <div className="space-y-4">
                <Label className="text-base font-medium flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-primary" />
                  Interested Sectors
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {sectorOptions.map((sector) => (
                    <Badge
                      key={sector}
                      variant={formData.sectors.includes(sector) ? "default" : "outline"}
                      className={`cursor-pointer text-center py-2 transition-fast hover:shadow-soft ${
                        formData.sectors.includes(sector)
                          ? "gradient-primary text-white"
                          : "hover:border-primary"
                      }`}
                      onClick={() => toggleSector(sector)}
                    >
                      {sector}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-4">
                <Label className="text-base font-medium flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" />
                  Your Skills
                </Label>
                
                <div className="flex gap-2">
                  <Select onValueChange={addSkill}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Add a skill" />
                    </SelectTrigger>
                    <SelectContent>
                      {skillOptions.map((skill) => (
                        <SelectItem key={skill} value={skill}>
                          {skill}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => addSkill(skillInput)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="py-1 pr-1 transition-fast hover:shadow-soft"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-2 hover:text-destructive transition-fast"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={!isValid}
                className={`w-full transition-smooth ${
                  isValid
                    ? "gradient-primary text-white hover:shadow-hover"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                Find My Internships
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CandidateForm;