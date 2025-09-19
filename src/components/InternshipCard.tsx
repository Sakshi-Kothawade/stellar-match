import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Building2, 
  TrendingUp,
  ExternalLink,
  Heart
} from "lucide-react";

interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  stipend: string;
  type: string;
  description: string;
  skills: string[];
  responseProb: number;
  matchScore: number;
}

interface InternshipCardProps {
  internship: Internship;
  onApply: (id: string) => void;
  onSave: (id: string) => void;
}

const InternshipCard = ({ internship, onApply, onSave }: InternshipCardProps) => {
  const getProbabilityColor = (prob: number) => {
    if (prob >= 80) return "text-success-foreground bg-success";
    if (prob >= 60) return "text-warning-foreground bg-warning";
    return "text-muted-foreground bg-muted";
  };

  const getProbabilityText = (prob: number) => {
    if (prob >= 80) return "High";
    if (prob >= 60) return "Good";
    return "Fair";
  };

  return (
    <Card className="h-full hover:shadow-hover transition-smooth group cursor-pointer animate-fade-in-up">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-2">
          <Badge 
            className={`${getProbabilityColor(internship.responseProb)} font-medium`}
          >
            <TrendingUp className="h-3 w-3 mr-1" />
            {getProbabilityText(internship.responseProb)} Match
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onSave(internship.id)}
            className="opacity-0 group-hover:opacity-100 transition-fast"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        
        <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-fast">
          {internship.title}
        </h3>
        
        <div className="flex items-center text-muted-foreground mb-3">
          <Building2 className="h-4 w-4 mr-2" />
          <span className="font-medium">{internship.company}</span>
        </div>

        {/* Match Score */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Profile Match</span>
            <span className="text-primary font-bold">{internship.matchScore}%</span>
          </div>
          <Progress 
            value={internship.matchScore} 
            className="h-2"
          />
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {internship.description}
        </p>
        
        {/* Details */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            {internship.location}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Clock className="h-4 w-4 mr-2 text-primary" />
            {internship.duration}
          </div>
          <div className="flex items-center text-muted-foreground">
            <DollarSign className="h-4 w-4 mr-2 text-primary" />
            {internship.stipend}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Badge variant="outline" className="text-xs">
              {internship.type}
            </Badge>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {internship.skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {internship.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{internship.skills.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Response Probability */}
        <div className="mb-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Response Probability</span>
            <span className="text-sm font-bold text-primary">
              {internship.responseProb}%
            </span>
          </div>
          <Progress 
            value={internship.responseProb} 
            className="h-1"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Based on your profile match and company response rate
          </p>
        </div>

        <Button
          onClick={() => onApply(internship.id)}
          className="w-full gradient-primary text-white hover:shadow-hover transition-smooth"
        >
          Apply Now
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default InternshipCard;