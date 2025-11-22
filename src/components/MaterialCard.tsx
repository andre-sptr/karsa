import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, BarChart3, DollarSign, TrendingUp } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface MaterialCardProps {
  title: string;
  description: string;
  icon: "book" | "chart" | "dollar" | "trending";
  onClick: () => void;
  delay?: number;
}

const iconMap: Record<string, LucideIcon> = {
  book: BookOpen,
  chart: BarChart3,
  dollar: DollarSign,
  trending: TrendingUp,
};

const MaterialCard = ({ title, description, icon, onClick, delay = 0 }: MaterialCardProps) => {
  const Icon = iconMap[icon];
  
  return (
    <Card 
      className="cursor-pointer gradient-card border-0 text-primary-foreground hover:scale-105 transition-all duration-300 shadow-card hover:shadow-glow animate-slide-up"
      onClick={onClick}
      style={{ animationDelay: `${delay}s` }}
    >
      <CardHeader className="space-y-4">
        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
          <Icon className="w-8 h-8 text-accent" />
        </div>
        <CardTitle className="text-2xl text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-primary-foreground/70 text-center text-base">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default MaterialCard;
