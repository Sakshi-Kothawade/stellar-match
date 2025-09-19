import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  TrendingUp, 
  BookOpen, 
  Award, 
  ArrowRight,
  CheckCircle2,
  Circle
} from "lucide-react";

interface SkillGap {
  skill: string;
  importance: number;
  currentLevel: number;
  targetLevel: number;
  resources: string[];
}

interface SkillGuidanceProps {
  userSkills: string[];
  recommendedSkills: SkillGap[];
}

const SkillGuidance = ({ userSkills, recommendedSkills }: SkillGuidanceProps) => {
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-success";
    if (progress >= 60) return "bg-warning";
    return "bg-primary";
  };

  return (
    <section className="py-12 px-4 bg-muted/30">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
            <Target className="h-8 w-8 text-primary" />
            Your Skill Journey
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Personalized recommendations to boost your internship success
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Current Skills */}
          <Card className="shadow-card animate-fade-in-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-success">
                <CheckCircle2 className="h-5 w-5" />
                Your Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userSkills.map((skill) => (
                  <div key={skill} className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <Badge variant="secondary" className="gradient-success text-white">
                      {skill}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-success/10 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-4 w-4 text-success" />
                  <span className="font-medium text-success">Well Done!</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  You have {userSkills.length} strong skills that match current market demands.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Skill Gaps */}
          <Card className="shadow-card animate-fade-in-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warning">
                <TrendingUp className="h-5 w-5" />
                Skills to Develop
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recommendedSkills.slice(0, 4).map((skillGap) => {
                  const progress = (skillGap.currentLevel / skillGap.targetLevel) * 100;
                  return (
                    <div key={skillGap.skill} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skillGap.skill}</span>
                        <Badge 
                          variant="outline"
                          className={skillGap.importance >= 80 ? "border-warning text-warning" : ""}
                        >
                          {skillGap.importance >= 80 ? "High Priority" : "Recommended"}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{Math.round(progress)}%</span>
                        </div>
                        <Progress 
                          value={progress} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Learning Path */}
          <Card className="shadow-card animate-fade-in-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <BookOpen className="h-5 w-5" />
                Learning Roadmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendedSkills.slice(0, 3).map((skillGap, index) => (
                  <div key={skillGap.skill} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full gradient-primary text-white text-xs flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{skillGap.skill}</div>
                        <div className="text-sm text-muted-foreground">
                          {skillGap.resources.length} resources available
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-9 space-y-2">
                      {skillGap.resources.slice(0, 2).map((resource, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <Circle className="h-2 w-2 text-muted-foreground" />
                          <span className="text-muted-foreground">{resource}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <Button className="w-full mt-6 gradient-secondary text-white hover:shadow-hover transition-smooth">
                Start Learning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Card className="shadow-card hover:shadow-hover transition-smooth group cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold mb-1 group-hover:text-primary transition-fast">
                    Practice Interview
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Test your skills with AI-powered mock interviews
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-fast" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-hover transition-smooth group cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full gradient-secondary flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold mb-1 group-hover:text-primary transition-fast">
                    Skill Courses
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Curated learning paths for your target skills
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-fast" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SkillGuidance;