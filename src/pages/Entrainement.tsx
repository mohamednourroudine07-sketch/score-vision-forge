import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react";

interface Question {
  id: number;
  image: string;
  correctOdds: { team1: number; draw: number; team2: number };
  teams: { team1: string; team2: string };
}

export default function Entrainement() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const questions: Question[] = [
    {
      id: 1,
      image: "screenshot1.jpg",
      correctOdds: { team1: 1.85, draw: 3.20, team2: 2.10 },
      teams: { team1: "PSG", team2: "Real Madrid" }
    },
    {
      id: 2,
      image: "screenshot2.jpg",
      correctOdds: { team1: 2.30, draw: 3.40, team2: 1.75 },
      teams: { team1: "Barcelona", team2: "Bayern Munich" }
    },
    {
      id: 3,
      image: "screenshot3.jpg",
      correctOdds: { team1: 2.05, draw: 3.10, team2: 1.95 },
      teams: { team1: "Liverpool", team2: "Manchester City" }
    }
  ];

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (selectedOdds: string) => {
    setSelectedAnswer(selectedOdds);
    const isCorrect = selectedOdds === `${currentQ.correctOdds.team1}-${currentQ.correctOdds.draw}-${currentQ.correctOdds.team2}`;
    
    setTimeout(() => {
      const newAnswers = [...answers, isCorrect];
      setAnswers(newAnswers);
      
      if (isCorrect) {
        setScore(score + 1);
      }

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetTraining = () => {
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "text-positive";
    if (percentage >= 60) return "text-yellow-500";
    return "text-negative";
  };

  if (showResult) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Résultats d'Entraînement</h1>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Entraînement Terminé !</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="space-y-2">
              <div className={`text-6xl font-bold ${getScoreColor()}`}>
                {score}/{questions.length}
              </div>
              <p className="text-muted-foreground">
                Précision : {Math.round((score / questions.length) * 100)}%
              </p>
            </div>

            <div className="space-y-3">
              {questions.map((_, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span>Question {index + 1}</span>
                  {answers[index] ? (
                    <CheckCircle className="w-5 h-5 text-positive" />
                  ) : (
                    <XCircle className="w-5 h-5 text-negative" />
                  )}
                </div>
              ))}
            </div>

            <Button onClick={resetTraining} size="lg" className="w-full">
              <RotateCcw className="w-4 h-4 mr-2" />
              Recommencer l'Entraînement
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Target className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold">Mode Entraînement</h1>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Progression */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                Question {currentQuestion + 1} sur {questions.length}
              </span>
              <span className="text-sm text-muted-foreground">
                Score : {score}/{currentQuestion + (selectedAnswer ? 1 : 0)}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Question */}
        <Card>
          <CardHeader>
            <CardTitle>
              Analysez ce screenshot et identifiez les bonnes cotes
            </CardTitle>
            <p className="text-muted-foreground">
              Match : {currentQ.teams.team1} vs {currentQ.teams.team2}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Placeholder pour screenshot */}
            <div className="aspect-video bg-muted/50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Target className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Screenshot d'entraînement #{currentQ.id}</p>
              </div>
            </div>

            {/* Options de réponse */}
            <div className="grid gap-3">
              <h4 className="font-medium">Sélectionnez les cotes correctes :</h4>
              
              {/* Option A */}
              <Button
                variant="outline"
                className={`p-4 h-auto justify-between ${
                  selectedAnswer === "1.85-3.20-2.10" 
                    ? selectedAnswer === `${currentQ.correctOdds.team1}-${currentQ.correctOdds.draw}-${currentQ.correctOdds.team2}`
                      ? "border-positive bg-positive/10"
                      : "border-negative bg-negative/10"
                    : ""
                }`}
                onClick={() => handleAnswer("1.85-3.20-2.10")}
                disabled={!!selectedAnswer}
              >
                <div className="flex gap-4">
                  <span>A)</span>
                  <div className="flex gap-4">
                    <span>{currentQ.teams.team1}: 1.85</span>
                    <span>Nul: 3.20</span>
                    <span>{currentQ.teams.team2}: 2.10</span>
                  </div>
                </div>
                {selectedAnswer === "1.85-3.20-2.10" && (
                  selectedAnswer === `${currentQ.correctOdds.team1}-${currentQ.correctOdds.draw}-${currentQ.correctOdds.team2}` ? (
                    <CheckCircle className="w-5 h-5 text-positive" />
                  ) : (
                    <XCircle className="w-5 h-5 text-negative" />
                  )
                )}
              </Button>

              {/* Option B */}
              <Button
                variant="outline"
                className={`p-4 h-auto justify-between ${
                  selectedAnswer === "2.00-3.50-1.90"
                    ? "border-negative bg-negative/10"
                    : ""
                }`}
                onClick={() => handleAnswer("2.00-3.50-1.90")}
                disabled={!!selectedAnswer}
              >
                <div className="flex gap-4">
                  <span>B)</span>
                  <div className="flex gap-4">
                    <span>{currentQ.teams.team1}: 2.00</span>
                    <span>Nul: 3.50</span>
                    <span>{currentQ.teams.team2}: 1.90</span>
                  </div>
                </div>
                {selectedAnswer === "2.00-3.50-1.90" && (
                  <XCircle className="w-5 h-5 text-negative" />
                )}
              </Button>

              {/* Option C */}
              <Button
                variant="outline"
                className={`p-4 h-auto justify-between ${
                  selectedAnswer === "1.75-3.00-2.20"
                    ? "border-negative bg-negative/10"
                    : ""
                }`}
                onClick={() => handleAnswer("1.75-3.00-2.20")}
                disabled={!!selectedAnswer}
              >
                <div className="flex gap-4">
                  <span>C)</span>
                  <div className="flex gap-4">
                    <span>{currentQ.teams.team1}: 1.75</span>
                    <span>Nul: 3.00</span>
                    <span>{currentQ.teams.team2}: 2.20</span>
                  </div>
                </div>
                {selectedAnswer === "1.75-3.00-2.20" && (
                  <XCircle className="w-5 h-5 text-negative" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}