"use client"

import Image from 'next/image';
import { useState, useRef } from 'react';

export default function VideoSection() {
  const [showGif, setShowGif] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoPlay = () => {
    setShowGif(true);
  };

  const handleVideoPause = () => {
    setShowGif(false);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-white/30 via-indigo-300/20 to-white/30 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-indigo-950 mb-4">
            How Our LMS Works
          </h2>
          <p className="text-lg text-indigo-900 max-w-3xl mx-auto">
            Watch how our Learning Management System transforms sign language education. 
            Our AI-powered avatar provides real-time demonstrations to enhance your learning experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Video Player Side */}
          <div className="relative p-1">
            {/* Decorative Frame */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-indigo-300 to-yellow-400 rounded-xl opacity-70"></div>
            <div className="relative bg-indigo-500/30 backdrop-blur-sm rounded-lg overflow-hidden border border-indigo-400/30">
              <div className="w-full h-full bg-indigo-900/40 aspect-video">
                <video 
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  controls
                  muted
                  loop
                  playsInline
                  onPlay={handleVideoPlay}
                  onPause={handleVideoPause}
                >
                  <source src="/videos/hello.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            {/* Stats Badge */}
            <div className="absolute -top-4 -right-4 bg-indigo-500/30 backdrop-blur-sm rounded-xl border border-indigo-400/30 px-4 py-2 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 text-xl">▶</span>
                <div className="text-white text-sm">Interactive Demo</div>
              </div>
            </div>
          </div>

          {/* Avatar Side */}
          {showGif && (
            <div className="relative p-1">
              {/* Decorative Frame */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-indigo-300 to-yellow-400 rounded-xl opacity-70"></div>
              <div className="relative bg-indigo-500/30 backdrop-blur-sm rounded-lg overflow-hidden border border-indigo-400/30">
                <div className="w-full h-full aspect-video bg-indigo-900/40">
                  <Image
                    src="/gif/hello.gif"
                    alt="Sign Language Avatar"
                    className="w-full h-full object-contain"
                    width={640}
                    height={480}
                    unoptimized={true}
                  />
                </div>
              </div>
              {/* Stats Badge */}
              <div className="absolute -top-4 -right-4 bg-indigo-500/30 backdrop-blur-sm rounded-xl border border-indigo-400/30 px-4 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 text-xl">🤖</span>
                  <div className="text-white text-sm">AI Avatar</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}