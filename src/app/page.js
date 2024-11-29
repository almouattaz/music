"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [audioContext, setAudioContext] = useState(null);
  const [audioBuffers, setAudioBuffers] = useState({});

  const audiosList = [
    { name: "Work It", audio_file: "01Workit.mp3" },
    { name: "MakeIt", audio_file: "02Makeit.mp3" },
    { name: "Do It", audio_file: "03DoIt.mp3" },
    { name: "Makes Us", audio_file: "04MakesUs.mp3" },
    { name: "Harder", audio_file: "05Harder.mp3" },
    { name: "Better", audio_file: "06Better.mp3" },
    { name: "Faster", audio_file: "07Faster.mp3" },
    { name: "Stronger", audio_file: "08Stronger.mp3" },
    { name: "More Than", audio_file: "09MoreThan.mp3" },
    { name: "Power", audio_file: "10Power.mp3" },
    { name: "Our", audio_file: "11Our.mp3" },
    { name: "Never", audio_file: "12Never.mp3" },
    { name: "Ever", audio_file: "13Ever.mp3" },
    { name: "After", audio_file: "14After.mp3" },
    { name: "Work Is", audio_file: "15WorkIs.mp3" },
    { name: "Over", audio_file: "16Over.mp3" },
  ];

  useEffect(() => {
    // Initialize AudioContext
    const context = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(context);

    // Preload and decode all audio files
    const loadAudios = async () => {
      const buffers = {};
      for (const audio of audiosList) {
        const response = await fetch("/audios/" + audio.audio_file);
        const arrayBuffer = await response.arrayBuffer();
        buffers[audio.name] = await context.decodeAudioData(arrayBuffer);
      }
      setAudioBuffers(buffers);
    };

    loadAudios();

    return () => {
      context.close(); // Clean up the audio context when the component unmounts
    };
  }, []);

  const playAudio = (name) => {
    if (audioContext && audioBuffers[name]) {
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffers[name];
      source.connect(audioContext.destination);
      source.start(0);
    }
  };

  return (
    <div className="mx-auto max-w-6xl my-8 p-4 bg-slate-100">
      <div className="grid grid-cols-2 gap-4">
        <a
        href="/v2"
          className="rounded-full col-span-2 bg-indigo-400 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          La version iPhone iOS &rarr;
        </a>
        {audiosList.map((audio) => (
          <button
            key={audio.name}
            id={audio.name}
            onClick={() => playAudio(audio.name)}
            className="bg-green-50 cursor-pointer rounded-lg border ring-[0.5px] ring-slate-300 shadow-md  p-2 md:p-6 text-center h-full align-middle text-lg uppercase font-extrabold"
          >
            {audio.name}
          </button>
        ))}
      </div></div>
  );
}
