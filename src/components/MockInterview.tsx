import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Mic, 
  Play, 
  Pause, 
  RotateCcw, 
  Star, 
  MessageCircle,
  Clock,
  Award,
  TrendingUp
} from "lucide-react";

interface Question {
  id: string;
  text: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tips: string[];
}

const mockQuestions: Question[] = [
  {
    id: "1",
    text: "Tell me about yourself and why you're interested in this internship.",
    category: "General",
    difficulty: "Easy",
    tips: [
      "Keep it under 2 minutes",
      "Focus on relevant experiences",
      "Connect your goals to the role"
    ]
  },
  {
    id: "2", 
    text: "Describe a challenging project you worked on and how you overcame obstacles.",
    category: "Behavioral",
    difficulty: "Medium",
    tips: [
      "Use the STAR method",
      "Be specific about your actions",
      "Highlight the positive outcome"
    ]
  },
  {
    id: "3",
    text: "Where do you see yourself in 5 years, and how does this internship fit into your plans?",
    category: "Future Goals",
    difficulty: "Medium",
    tips: [
      "Show ambition but be realistic",
      "Connect to the company's mission",
      "Demonstrate long-term thinking"
    ]
  }
];

const MockInterview = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [responses, setResponses] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  
  const question = mockQuestions[currentQuestion];
  
  const startRecording = () => {
    setIsRecording(true);
    // Simulate recording for demo
    setTimeout(() => {
      setIsRecording(false);
      setShowFeedback(true);
    }, 3000);
  };

  const nextQuestion = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(false);
    } else {
      setIsCompleted(true);
    }
  };

  const restartInterview = () => {
    setCurrentQuestion(0);
    setIsCompleted(false);
    setShowFeedback(false);
    setResponses([]);
  };

  if (isCompleted) {
    return (
      <section className="py-12 px-4">
        <div className="container max-w-4xl mx-auto">
          <Card className="shadow-card animate-bounce-in">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 mx-auto gradient-success rounded-full flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold mb-2">Interview Complete!</CardTitle>
              <p className="text-muted-foreground">
                Great job! Here's your performance summary
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Overall Score */}
              <div className="text-center p-6 bg-success/10 rounded-lg">
                <div className="text-4xl font-bold text-success mb-2">85%</div>
                <div className="text-lg font-medium mb-1">Overall Performance</div>
                <div className="text-sm text-muted-foreground">Above Average</div>
              </div>

              {/* Detailed Scores */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">92%</div>
                  <div className="text-sm text-muted-foreground">Clarity</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">78%</div>
                  <div className="text-sm text-muted-foreground">Content</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">85%</div>
                  <div className="text-sm text-muted-foreground">Confidence</div>
                </div>
              </div>

              {/* Feedback */}
              <div className="space-y-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Key Strengths
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-success" />
                    <span className="text-sm">Clear and articulate communication</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-success" />
                    <span className="text-sm">Good use of specific examples</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-success" />
                    <span className="text-sm">Confident body language</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-warning" />
                  Areas for Improvement
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-warning" />
                    <span className="text-sm">Elaborate more on technical skills</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-warning" />
                    <span className="text-sm">Practice behavioral question responses</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button onClick={restartInterview} variant="outline" className="flex-1">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
                <Button className="flex-1 gradient-primary text-white">
                  Save Results
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-fade-in-up">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
            <Mic className="h-8 w-8 text-primary" />
            AI Mock Interview
          </h2>
          <p className="text-muted-foreground">
            Practice with real interview questions and get instant feedback
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Question Card */}
          <div className="lg:col-span-2">
            <Card className="shadow-card animate-slide-in">
              <CardHeader>
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="outline">
                    Question {currentQuestion + 1} of {mockQuestions.length}
                  </Badge>
                  <Badge 
                    variant={question.difficulty === "Easy" ? "secondary" : 
                           question.difficulty === "Medium" ? "default" : "destructive"}
                  >
                    {question.difficulty}
                  </Badge>
                </div>
                
                <div className="mb-4">
                  <Progress 
                    value={((currentQuestion + 1) / mockQuestions.length) * 100} 
                    className="h-2"
                  />
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Badge variant="outline" className="mb-3">
                      {question.category}
                    </Badge>
                    <h3 className="text-xl font-bold leading-relaxed">
                      {question.text}
                    </h3>
                  </div>

                  {/* Recording Controls */}
                  <div className="text-center p-8 bg-muted/30 rounded-lg">
                    {!isRecording && !showFeedback && (
                      <div className="space-y-4">
                        <div className="w-20 h-20 mx-auto gradient-primary rounded-full flex items-center justify-center hover:shadow-hover transition-smooth cursor-pointer">
                          <Button
                            onClick={startRecording}
                            size="icon"
                            className="w-full h-full rounded-full bg-transparent hover:bg-transparent"
                          >
                            <Mic className="h-8 w-8 text-white" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Click to start recording your answer
                        </p>
                      </div>
                    )}

                    {isRecording && (
                      <div className="space-y-4">
                        <div className="w-20 h-20 mx-auto bg-destructive rounded-full flex items-center justify-center animate-pulse">
                          <Mic className="h-8 w-8 text-white" />
                        </div>
                        <p className="text-sm font-medium">Recording... Speak clearly</p>
                        <div className="flex justify-center">
                          <Badge variant="destructive" className="animate-pulse">
                            <Clock className="h-3 w-3 mr-1" />
                            00:30
                          </Badge>
                        </div>
                      </div>
                    )}

                    {showFeedback && (
                      <div className="space-y-4">
                        <div className="w-20 h-20 mx-auto gradient-success rounded-full flex items-center justify-center">
                          <Star className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-success mb-2">Great response!</p>
                          <p className="text-sm text-muted-foreground">
                            Your answer was clear and well-structured. Good use of specific examples.
                          </p>
                        </div>
                        <Button 
                          onClick={nextQuestion}
                          className="gradient-primary text-white hover:shadow-hover transition-smooth"
                        >
                          {currentQuestion < mockQuestions.length - 1 ? "Next Question" : "Finish Interview"}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tips Sidebar */}
          <div>
            <Card className="shadow-card animate-fade-in-up sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Tips for Success
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {question.tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full gradient-primary text-white text-xs flex items-center justify-center font-bold mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-sm">{tip}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-medium text-primary">Time Limit</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Aim for 1-2 minutes per answer. Quality over quantity!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MockInterview;