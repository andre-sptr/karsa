import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download, Award, Star } from "lucide-react";
import html2canvas from "html2canvas";
import { useToast } from "@/hooks/use-toast";

interface CertificateProps {
  score: number;
  totalQuestions: number;
  date: string;
}

const Certificate = ({ score, totalQuestions, date }: CertificateProps) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const link = document.createElement("a");
      link.download = `Sertifikat-APBN-${date}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      toast({
        title: "Sertifikat Berhasil Diunduh! 🎉",
        description: "Selamat atas pencapaian luar biasa Anda!",
      });
    } catch (error) {
      toast({
        title: "Gagal mengunduh sertifikat",
        description: "Silakan coba lagi",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div
        ref={certificateRef}
        className="relative bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-12 rounded-3xl shadow-2xl mx-auto overflow-hidden"
        style={{ width: "800px", aspectRatio: "1.414/1" }}
      >
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-40 h-40 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-amber-500 rounded-full blur-3xl" />
        </div>

        {/* Ornate border */}
        <div className="absolute inset-4 border-4 border-double border-amber-400 rounded-2xl" />
        
        {/* Decorative corners with stars */}
        <div className="relative h-full flex flex-col items-center justify-between">
          <div className="absolute top-0 left-0 w-32 h-32">
            <div className="absolute top-2 left-2 w-20 h-20 border-t-4 border-l-4 border-amber-600 rounded-tl-3xl" />
            <Star className="absolute top-0 left-0 w-6 h-6 text-amber-500 fill-amber-400" />
          </div>
          <div className="absolute top-0 right-0 w-32 h-32">
            <div className="absolute top-2 right-2 w-20 h-20 border-t-4 border-r-4 border-amber-600 rounded-tr-3xl" />
            <Star className="absolute top-0 right-0 w-6 h-6 text-amber-500 fill-amber-400" />
          </div>
          <div className="absolute bottom-0 left-0 w-32 h-32">
            <div className="absolute bottom-2 left-2 w-20 h-20 border-b-4 border-l-4 border-amber-600 rounded-bl-3xl" />
            <Star className="absolute bottom-0 left-0 w-6 h-6 text-amber-500 fill-amber-400" />
          </div>
          <div className="absolute bottom-0 right-0 w-32 h-32">
            <div className="absolute bottom-2 right-2 w-20 h-20 border-b-4 border-r-4 border-amber-600 rounded-br-3xl" />
            <Star className="absolute bottom-0 right-0 w-6 h-6 text-amber-500 fill-amber-400" />
          </div>

          {/* Header with trophy and stars */}
          <div className="text-center space-y-4 pt-12 z-10">
            <div className="flex justify-center items-center gap-3 mb-6">
              <div className="relative">
                <Star className="w-10 h-10 fill-amber-400 text-amber-500 animate-pulse absolute -top-2 -left-2" />
                <Star className="w-6 h-6 fill-amber-300 text-amber-400" />
              </div>
              <Award className="w-20 h-20 text-amber-600" />
              <div className="relative">
                <Star className="w-10 h-10 fill-amber-400 text-amber-500 animate-pulse absolute -top-2 -right-2" />
                <Star className="w-6 h-6 fill-amber-300 text-amber-400" />
              </div>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 bg-clip-text text-transparent drop-shadow-lg">
              SERTIFIKAT
            </h1>
            <h2 className="text-3xl font-semibold text-amber-900 italic">
              Pencapaian Sempurna
            </h2>
            <div className="flex justify-center gap-2 items-center">
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-amber-600" />
              <Star className="w-5 h-5 fill-amber-500 text-amber-600" />
              <div className="w-24 h-1 bg-gradient-to-l from-transparent via-amber-500 to-amber-600" />
            </div>
          </div>

          {/* Main content */}
          <div className="text-center space-y-6 flex-1 flex flex-col justify-center z-10">
            <p className="text-lg text-amber-700 font-medium italic">
              Dengan bangga diberikan kepada
            </p>
            <div className="relative inline-block">
              <h3 className="text-5xl font-bold text-amber-900 mb-4 relative">
                Nasywa Aura Adiba
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
              </h3>
            </div>
            <p className="text-lg text-amber-800 max-w-xl mx-auto leading-relaxed font-medium px-8">
              Telah menunjukkan keunggulan luar biasa dengan menyelesaikan kuis{" "}
              <span className="font-bold text-amber-900 text-xl">Belajar APBN</span>{" "}
              dengan pencapaian sempurna
            </p>
            
            {/* Ornate score badge */}
            <div className="relative inline-flex items-center justify-center gap-4 bg-gradient-to-br from-amber-100 to-yellow-100 border-4 border-amber-500 rounded-2xl px-10 py-6 mx-auto shadow-xl">
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 fill-amber-600 text-amber-600" />
              </div>
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 fill-amber-600 text-amber-600" />
              </div>
              <Award className="w-12 h-12 text-amber-600" />
              <div className="text-center">
                <p className="text-sm text-amber-700 font-semibold uppercase tracking-wide">Skor Sempurna</p>
                <p className="text-5xl font-bold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
                  {score}/{totalQuestions}
                </p>
              </div>
            </div>

            <div className="bg-amber-100/50 border-2 border-amber-300 rounded-xl p-4 max-w-2xl mx-auto">
              <p className="text-sm text-amber-900 leading-relaxed font-medium">
                Pencapaian gemilang ini merupakan bukti nyata dari dedikasi, kerja keras,
                dan pemahaman mendalam tentang{" "}
                <span className="font-bold">Anggaran Pendapatan dan Belanja Negara</span>
              </p>
            </div>
          </div>

          {/* Footer with seal */}
          <div className="text-center space-y-3 pb-12 z-10">
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className="w-32 h-1 bg-gradient-to-r from-transparent to-amber-500" />
              <div className="relative w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center shadow-lg border-4 border-amber-300">
                <Award className="w-8 h-8 text-white" />
                <div className="absolute inset-0 rounded-full border-2 border-amber-200 border-dashed animate-spin" style={{ animationDuration: "20s" }} />
              </div>
              <div className="w-32 h-1 bg-gradient-to-l from-transparent to-amber-500" />
            </div>
            <p className="text-base font-bold text-amber-900 tracking-wide">
              Karsa - Asisten Belajar APBN
            </p>
            <p className="text-sm text-amber-700 font-semibold">{date}</p>
            <p className="text-xs text-amber-600 italic">Sertifikat pencapaian resmi</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button
          onClick={downloadCertificate}
          size="lg"
          className="gap-2 text-lg px-8 py-6"
        >
          <Download className="w-5 h-5" />
          Unduh Sertifikat
        </Button>
      </div>
    </div>
  );
};

export default Certificate;