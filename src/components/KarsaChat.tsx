import { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  text: string;
  isUser: boolean;
}

const KarsaChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Halo! Aku Karsa, teman belajarmu. Ada yang ingin kamu tanyakan tentang APBN?", isUser: false }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Ref untuk auto-scroll ke pesan terbaru
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll ke bawah setiap ada pesan baru
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // 1. Tambahkan pesan user ke UI
    const userMessage = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput(""); // Kosongkan input segera
    setIsLoading(true); // Set status loading

    try {
      // 2. Inisialisasi Gemini
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error("API Key belum diatur di .env");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      // 3. Buat Prompt dengan Persona Karsa
      // Kita menyisipkan instruksi agar AI berperan sebagai guru APBN
      const prompt = `
        Kamu adalah Karsa, asisten belajar yang ramah, sopan, dan ahli tentang APBN (Anggaran Pendapatan dan Belanja Negara) Indonesia.
        Jawablah pertanyaan user berikut ini dengan bahasa Indonesia yang mudah dimengerti oleh pelajar.
        Jika pertanyaannya tidak berhubungan dengan APBN, ekonomi, atau keuangan negara, tolak dengan sopan dan arahkan kembali ke topik APBN.
        
        Pertanyaan user: ${currentInput}
      `;

      // 4. Kirim ke Gemini
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // 5. Tambahkan balasan Gemini ke UI
      const botMessage = { text: text, isUser: false };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error("Error fetching Gemini response:", error);
      
      toast({
        title: "Gagal mengirim pesan",
        description: "Maaf, terjadi kesalahan koneksi atau API Key bermasalah.",
        variant: "destructive"
      });

      const errorMessage = { text: "Maaf, aku sedang mengalami gangguan. Coba tanyakan lagi nanti ya.", isUser: false };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false); // Matikan loading
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-glow bg-accent hover:bg-accent/90 text-accent-foreground z-50 transition-transform hover:scale-110"
        size="icon"
      >
        <MessageCircle className="w-8 h-8" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-card gradient-card border-0 z-50 flex flex-col animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-accent/20">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
          <CardTitle className="text-2xl text-primary-foreground">Karsa AI</CardTitle>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="text-primary-foreground hover:bg-accent/20"
        >
          <X className="w-5 h-5" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    message.isUser
                      ? "bg-accent text-accent-foreground rounded-tr-none"
                      : "bg-white/10 backdrop-blur-sm text-primary-foreground rounded-tl-none border border-white/10"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {/* Indikator Loading */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 backdrop-blur-sm text-primary-foreground rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-xs italic opacity-70">Karsa sedang mengetik...</span>
                </div>
              </div>
            )}
            {/* Dummy div untuk target scroll */}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>
        <div className="p-4 border-t border-accent/20 flex gap-2 bg-black/10 backdrop-blur-md">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSend()}
            placeholder="Ketik pertanyaanmu..."
            disabled={isLoading}
            className="bg-primary-foreground/10 border-accent/20 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-accent"
          />
          <Button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            size="icon"
            className="bg-accent hover:bg-accent/90 text-accent-foreground disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default KarsaChat;