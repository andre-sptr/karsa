import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface HeroProps {
  onStartLearning: () => void;
}

const Hero = ({ onStartLearning }: HeroProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center gradient-hero px-4 py-12 animate-fade-in">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 blur-2xl opacity-50 bg-accent rounded-full animate-pulse"></div>
            <Sparkles className="relative w-20 h-20 text-accent animate-float" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 animate-slide-up">
          Belajar APBN bersama{" "}
          <span className="text-accent">Karsa</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
          Pelajari Anggaran Pendapatan dan Belanja Negara dengan cara yang interaktif dan menenangkan
        </p>
        
        <Button 
          size="lg"
          onClick={onStartLearning}
          className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 rounded-full shadow-glow transition-all hover:scale-105 animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          <Sparkles className="mr-2 h-5 w-5" />
          Mulai Belajar
        </Button>
      </div>
    </section>
  );
};

export default Hero;
