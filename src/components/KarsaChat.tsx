import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, X } from "lucide-react";

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

  const responses: Record<string, string> = {
    "apa itu apbn": "APBN adalah Anggaran Pendapatan dan Belanja Negara, yaitu rencana keuangan tahunan pemerintahan negara Indonesia yang disetujui oleh DPR.",
    "fungsi apbn": "APBN berfungsi untuk: 1) Otorisasi pengeluaran, 2) Perencanaan pembangunan, 3) Pengawasan keuangan negara, 4) Alokasi sumber daya, dan 5) Distribusi pendapatan.",
    "struktur apbn": "APBN terdiri dari dua sisi: Pendapatan Negara (pajak, PNBP, hibah) dan Belanja Negara (belanja pemerintah pusat & transfer ke daerah).",
    "default": "Pertanyaan yang menarik! Coba klik pada kartu materi di atas untuk mempelajari lebih dalam tentang APBN ya."
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const key = input.toLowerCase();
      const response = Object.keys(responses).find(k => key.includes(k)) || "default";
      const botMessage = { text: responses[response], isUser: false };
      setMessages(prev => [...prev, botMessage]);
    }, 500);

    setInput("");
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-glow bg-accent hover:bg-accent/90 text-accent-foreground z-50"
        size="icon"
      >
        <MessageCircle className="w-8 h-8" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-card gradient-card border-0 z-50 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-accent/20">
        <CardTitle className="text-2xl text-primary-foreground">Karsa</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="text-primary-foreground hover:bg-accent/20"
        >
          <X className="w-5 h-5" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.isUser
                      ? "bg-accent text-accent-foreground"
                      : "bg-primary-foreground/10 text-primary-foreground"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 border-t border-accent/20 flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ketik pertanyaanmu..."
            className="bg-primary-foreground/10 border-accent/20 text-primary-foreground placeholder:text-primary-foreground/50"
          />
          <Button
            onClick={handleSend}
            size="icon"
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default KarsaChat;
