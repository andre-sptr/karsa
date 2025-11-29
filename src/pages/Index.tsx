import { useState } from "react";
import Hero from "@/components/Hero";
import MaterialCard from "@/components/MaterialCard";
import MaterialDialog from "@/components/MaterialDialog";
import KarsaChat from "@/components/KarsaChat";
import AudioPlayer from "@/components/AudioPlayer";
import Quiz from "@/components/Quiz";

interface Material {
  title: string;
  description: string;
  content: string;
  icon: "book" | "chart" | "dollar" | "trending";
}

const materials: Material[] = [
  {
    title: "Pengertian APBN",
    description: "Memahami dasar-dasar APBN",
    icon: "book",
    content: `APBN (Anggaran Pendapatan dan Belanja Negara) adalah rencana keuangan tahunan pemerintahan negara Indonesia yang disetujui oleh Dewan Perwakilan Rakyat (DPR).

APBN mencakup seluruh pendapatan dan pengeluaran negara dalam satu tahun anggaran, yang dimulai dari 1 Januari hingga 31 Desember.

Fungsi Utama APBN:
• Otorisasi: Memberikan dasar hukum untuk pelaksanaan pendapatan dan belanja negara
• Perencanaan: Sebagai pedoman dalam perencanaan kegiatan tahunan
• Pengawasan: Memudahkan pengawasan terhadap keuangan negara
• Alokasi: Mengalokasikan sumber daya secara efisien
• Distribusi: Mendistribusikan pendapatan secara adil`,
  },
  {
    title: "Struktur APBN",
    description: "Komponen-komponen dalam APBN",
    icon: "chart",
    content: `Struktur APBN terdiri dari dua sisi utama:

A. PENDAPATAN NEGARA
1. Penerimaan Perpajakan
   - Pajak Penghasilan (PPh)
   - Pajak Pertambahan Nilai (PPN)
   - Pajak Bumi dan Bangunan (PBB)
   - Dan pajak lainnya

2. Penerimaan Negara Bukan Pajak (PNBP)
   - Hasil kekayaan negara
   - Pelayanan pemerintah
   - Pendapatan BLU

3. Hibah
   - Bantuan dari negara lain
   - Bantuan lembaga internasional

B. BELANJA NEGARA
1. Belanja Pemerintah Pusat
2. Transfer ke Daerah dan Dana Desa`,
  },
  {
    title: "Pendapatan Negara",
    description: "Sumber-sumber pendapatan negara",
    icon: "dollar",
    content: `Pendapatan Negara adalah semua penerimaan negara yang berasal dari:

1. PENERIMAAN PERPAJAKAN (±70-80% dari total pendapatan)
   • Pajak Penghasilan (PPh)
     - Pajak dari gaji pegawai
     - Pajak dari keuntungan perusahaan
   
   • Pajak Pertambahan Nilai (PPN)
     - Pajak atas pembelian barang/jasa
   
   • Pajak Bumi dan Bangunan (PBB)
     - Pajak atas kepemilikan tanah dan bangunan

2. PENERIMAAN NEGARA BUKAN PAJAK (PNBP)
   • Hasil pengelolaan kekayaan negara
   • Pendapatan dari layanan pemerintah
   • Pendapatan dari Badan Layanan Umum (BLU)

3. HIBAH
   • Bantuan dari negara sahabat
   • Bantuan dari organisasi internasional

Pendapatan ini digunakan untuk membiayai pembangunan dan kesejahteraan rakyat.`,
  },
  {
    title: "Belanja Negara",
    description: "Penggunaan anggaran negara",
    icon: "trending",
    content: `Belanja Negara adalah semua pengeluaran negara yang digunakan untuk:

1. BELANJA PEMERINTAH PUSAT
   • Belanja Pegawai
     - Gaji PNS, TNI, dan Polri
     - Tunjangan dan pensiun
   
   • Belanja Barang
     - Pengadaan alat-alat pemerintahan
     - Biaya operasional kantor
   
   • Belanja Modal
     - Pembangunan infrastruktur
     - Pengadaan aset tetap
   
   • Pembayaran Bunga Utang
   • Subsidi
     - Subsidi BBM
     - Subsidi listrik
     - Subsidi pupuk
   
   • Belanja Sosial
     - Bantuan sosial
     - Program perlindungan sosial

2. TRANSFER KE DAERAH DAN DANA DESA
   • Dana Alokasi Umum (DAU)
   • Dana Alokasi Khusus (DAK)
   • Dana Bagi Hasil
   • Dana Desa

Semua belanja ini bertujuan untuk meningkatkan kesejahteraan rakyat dan pembangunan nasional.`,
  },
];

const Index = () => {
  const [showMaterials, setShowMaterials] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStartLearning = () => {
    setShowMaterials(true);
    setIsPlaying(true);
    setTimeout(() => {
      document.getElementById("materials")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen">
      <Hero onStartLearning={handleStartLearning} />
      
      {showMaterials && (
        <>
          <section id="materials" className="py-20 px-4 bg-background">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <h2 className="text-4xl font-bold mb-4">Materi Pembelajaran</h2>
                <p className="text-muted-foreground text-lg">
                  Pilih topik yang ingin kamu pelajari
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {materials.map((material, index) => (
                  <MaterialCard
                    key={material.title}
                    title={material.title}
                    description={material.description}
                    icon={material.icon}
                    onClick={() => setSelectedMaterial(material)}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </div>
          </section>

          <section id="quiz" className="py-20 px-4 bg-accent/20">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <h2 className="text-4xl font-bold mb-4">Uji Pemahaman</h2>
                <p className="text-muted-foreground text-lg">
                  Seberapa paham kamu tentang APBN? Coba kuis ini!
                </p>
              </div>
              <Quiz />
            </div>
          </section>
        </>
      )}

      <MaterialDialog
        open={!!selectedMaterial}
        onOpenChange={(open) => !open && setSelectedMaterial(null)}
        title={selectedMaterial?.title || ""}
        content={selectedMaterial?.content || ""}
      />

      <footer className="py-8 px-4 bg-card border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            Dibuat oleh <span className="font-semibold text-foreground">Nasywa Aura Adiba</span>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            © 2024 Belajar APBN bersama Karsa
          </p>
        </div>
      </footer>

      <KarsaChat />
      <AudioPlayer isPlaying={isPlaying} />
    </div>
  );
};

export default Index;
