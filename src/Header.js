import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward
} from "react-icons/fa";

const songs = [
  { src: "/music/ed-photograph.mp3", name: "Photograph - Ed Sheeran" },
  { src: "/music/coldplay-yellow.mp3", name: "Yellow - Coldplay" },
  { src: "/music/fate-of-ophelia.mp3", name: "Fate of Ophelia - Taylor Swift" },
  { src: "/music/make-you-mine.mp3", name: "Make You Mine - Public" },
];

const Header = () => {
  const audioRef = useRef(null);
  const location = useLocation();

  const [isPlaying, setIsPlaying] = useState(false);

  // 🔥 Set initial song based on route
  const [currentSongIndex, setCurrentSongIndex] = useState(() =>
    location.pathname === "/letter" ? 1 : 0
  );

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // ✅ Update song when route changes
  useEffect(() => {
    if (location.pathname === "/letter") {
      setCurrentSongIndex(1);
    } else {
      setCurrentSongIndex(0);
    }
  }, [location.pathname]);

  // ✅ AUTO PLAY FIRST SONG ON MOUNT
  useEffect(() => {
    const audio = audioRef.current;

    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.log("Autoplay blocked by browser");
      }
    };

    playAudio();
  }, []);

  // Play / Pause
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Next Song
  const nextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    setIsPlaying(true);
  };

  // Previous Song
  const prevSong = () => {
    const prevIndex =
      currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(prevIndex);
    setIsPlaying(true);
  };

  // Update time
  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const setAudioData = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setAudioData);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setAudioData);
    };
  }, []);

  // ✅ Auto play when song changes
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentSongIndex, isPlaying]);  

  // Seek timeline
  const handleSeek = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  // Format time
  const formatTime = (time) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <header className="header">
      <audio
        ref={audioRef}
        src={songs[currentSongIndex].src}
        onEnded={nextSong}
      />

      <div className="music-player">
        <div className="song-name">
          {songs[currentSongIndex].name}
        </div>

        <FaBackward className="icon" onClick={prevSong} />

        {isPlaying ? (
          <FaPause className="icon" onClick={togglePlay} />
        ) : (
          <FaPlay className="icon" onClick={togglePlay} />
        )}

        <FaForward className="icon" onClick={nextSong} />

        <div className={`waveform ${isPlaying ? "active" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Timeline Slider */}
        <div className="timeline">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="progress-bar"
            style={{
              background: `linear-gradient(to right, #ff4d6d ${
                (currentTime / duration) * 100 || 0
              }%, #444 ${(currentTime / duration) * 100 || 0}%)`
            }}
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
