import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

interface AudioPlayerProps {
  isPlaying: boolean;
}

const AudioPlayer = ({ isPlaying }: AudioPlayerProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && !isMuted) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, isMuted]);

  return (
    <>
      <audio
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/audio/2022/03/10/audio_4a409ef7f5.mp3"
      />
      {isPlaying && (
        <Button
          onClick={() => setIsMuted(!isMuted)}
          className="fixed top-6 right-6 rounded-full shadow-card bg-card hover:bg-card/90 text-card-foreground z-40"
          size="icon"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </Button>
      )}
    </>
  );
};

export default AudioPlayer;
