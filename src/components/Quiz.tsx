import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
import confetti from "canvas-confetti";
import Certificate from "./Certificate";
import { playCorrectSound, playIncorrectSound } from "@/utils/sounds";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    question: "Apa kepanjangan dari APBN?",
    options: [
      "Anggaran Pendapatan dan Biaya Negara",
      "Anggaran Pendapatan dan Belanja Negara",
      "Anggaran Penerimaan dan Belanja Negara",
      "Anggaran Penerimaan dan Biaya Negara"
    ],
    correctAnswer: 1,
    explanation: "APBN adalah Anggaran Pendapatan dan Belanja Negara, rencana keuangan tahunan pemerintah Indonesia."
  },
  {
    question: "Berapa persen penerimaan perpajakan dari total pendapatan negara?",
    options: ["50-60%", "60-70%", "70-80%", "80-90%"],
    correctAnswer: 2,
    explanation: "Penerimaan perpajakan menyumbang sekitar 70-80% dari total pendapatan negara."
  },
  {
    question: "Apa yang termasuk dalam PNBP?",
    options: [
      "Pajak Penghasilan",
      "Pajak Pertambahan Nilai",
      "Hasil kekayaan negara",
      "Pajak Bumi dan Bangunan"
    ],
    correctAnswer: 2,
    explanation: "PNBP (Penerimaan Negara Bukan Pajak) termasuk hasil kekayaan negara, pelayanan pemerintah, dan pendapatan BLU."
  },
  {
    question: "Manakah yang BUKAN fungsi utama APBN?",
    options: ["Otorisasi", "Perencanaan", "Spekulasi", "Distribusi"],
    correctAnswer: 2,
    explanation: "Fungsi utama APBN adalah Otorisasi, Perencanaan, Pengawasan, Alokasi, dan Distribusi - bukan Spekulasi."
  },
  {
    question: "Dana Alokasi Umum (DAU) termasuk dalam kategori?",
    options: [
      "Belanja Pegawai",
      "Transfer ke Daerah dan Dana Desa",
      "Belanja Modal",
      "Subsidi"
    ],
    correctAnswer: 1,
    explanation: "DAU (Dana Alokasi Umum) termasuk dalam Transfer ke Daerah dan Dana Desa."
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(questions.length).fill(false));

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    
    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    
    // Play sound effect
    if (isCorrect) {
      playCorrectSound();
      setScore(score + 1);
    } else {
      playIncorrectSound();
    }
    
    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestion] = true;
    setAnsweredQuestions(newAnswered);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(new Array(questions.length).fill(false));
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  useEffect(() => {
    if (showResult && score === questions.length) {
      triggerConfetti();
    }
  }, [showResult, score]);

  if (showResult) {
    const percentage = (score / questions.length) * 100;
    const isPerfectScore = score === questions.length;
    const currentDate = new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    if (isPerfectScore) {
      return (
        <div className="space-y-8 animate-fade-in">
          <Card className="max-w-2xl mx-auto border-primary/50 shadow-xl">
            <CardHeader className="text-center bg-gradient-to-r from-primary/10 to-accent/10">
              <CardTitle className="text-4xl mb-2 text-primary">Sempurna! 🌟</CardTitle>
              <CardDescription className="text-xl font-semibold text-foreground">
                Skor: {score}/{questions.length} (100%)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="text-center space-y-2">
                <p className="text-lg font-medium text-foreground">
                  🎉 Luar biasa sekali! Anda telah menguasai materi APBN dengan sempurna!
                </p>
                <p className="text-muted-foreground">
                  Sebagai apresiasi, silakan unduh sertifikat pencapaian Anda di bawah ini.
                </p>
              </div>
            </CardContent>
          </Card>

          <Certificate score={score} totalQuestions={questions.length} date={currentDate} />

          <div className="text-center">
            <Button onClick={resetQuiz} variant="outline" size="lg" className="gap-2">
              Coba Lagi
            </Button>
          </div>
        </div>
      );
    }

    return (
      <Card className="max-w-2xl mx-auto animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl mb-2">Hasil Kuis</CardTitle>
          <CardDescription className="text-lg">
            Skor Anda: {score} dari {questions.length} ({percentage.toFixed(0)}%)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            {percentage >= 80 ? (
              <p className="text-lg text-success">🎉 Luar biasa! Anda sangat memahami APBN!</p>
            ) : percentage >= 60 ? (
              <p className="text-lg text-primary">👍 Bagus! Terus tingkatkan pemahaman Anda!</p>
            ) : (
              <p className="text-lg text-muted-foreground">💪 Tetap semangat! Coba pelajari materinya lagi!</p>
            )}
          </div>
          <Button onClick={resetQuiz} className="w-full" size="lg">
            Coba Lagi
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto animate-fade-in">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <CardTitle className="text-2xl">Kuis APBN</CardTitle>
          <span className="text-sm text-muted-foreground">
            Pertanyaan {currentQuestion + 1} dari {questions.length}
          </span>
        </div>
        <CardDescription className="text-lg font-medium text-foreground">
          {questions[currentQuestion].question}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={selectedAnswer !== null}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                selectedAnswer === null
                  ? "border-border hover:border-primary hover:bg-accent cursor-pointer"
                  : selectedAnswer === index
                  ? index === questions[currentQuestion].correctAnswer
                    ? "border-success bg-success/10"
                    : "border-destructive bg-destructive/10"
                  : index === questions[currentQuestion].correctAnswer
                  ? "border-success bg-success/10"
                  : "border-border opacity-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-base">{option}</span>
                {selectedAnswer !== null && (
                  <>
                    {index === questions[currentQuestion].correctAnswer && (
                      <CheckCircle2 className="w-6 h-6 text-success" />
                    )}
                    {selectedAnswer === index && index !== questions[currentQuestion].correctAnswer && (
                      <XCircle className="w-6 h-6 text-destructive" />
                    )}
                  </>
                )}
              </div>
            </button>
          ))}
        </div>

        {selectedAnswer !== null && (
          <div className="mt-4 p-4 bg-muted rounded-lg animate-fade-in">
            <p className="text-sm text-muted-foreground">
              {questions[currentQuestion].explanation}
            </p>
          </div>
        )}

        {selectedAnswer !== null && (
          <Button onClick={nextQuestion} className="w-full" size="lg">
            {currentQuestion < questions.length - 1 ? "Pertanyaan Berikutnya" : "Lihat Hasil"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default Quiz;