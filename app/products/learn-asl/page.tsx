"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export default function LearnASLPage() {
  const [input, setInput] = useState<string>("");
  const [signs, setSigns] = useState<string[]>([]);

  const convertToSigns = async () => {
    // Clear previous images
    setSigns([]);
    
    const words = input.toLowerCase().trim().split(' ');
    const signArray: string[] = [];

    for (const word of words) {
      const wordPath = `/sign/${word}.png`;
      
      try {
        await new Promise((resolve) => {
          const img = new window.Image();
          img.onload = async () => {
            signArray.push(wordPath);
            setSigns([...signArray]);
            await new Promise(r => setTimeout(r, 1000)); // 1 second delay
            resolve(true);
          };
          img.onerror = async () => {
            const characters = word.split('');
            for (const char of characters) {
              if (char.match(/[a-z0-9]/)) {
                const signPath = `/sign/${char}.png`;
                signArray.push(signPath);
                setSigns([...signArray]);
                await new Promise(r => setTimeout(r, 1000)); // 1 second delay
              }
            }
            resolve(false);
          };
          img.src = wordPath;
        });
      } catch (error) {
        console.error('Error loading image:', error);
      }
    }
  };

  return (
    <div className="h-screen bg-white">
      <MaxWidthWrapper className="py-8">
        <div className="flex flex-col-reverse lg:flex-row lg:gap-10">
          {/* Left Section - Enhanced Input and Controls */}
          <div className="lg:w-1/2 space-y-6 mt-6 lg:mt-0">
            <div className="space-y-4">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-2">
                  Learn Sign Language <span className="text-blue-600">Instantly</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Transform your words into sign language with our real-time translator.
                </p>
              </div>
              
              <div className="space-y-4">
                {/* Search Bar with Icon */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    id="text"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full rounded-xl border-2 border-gray-100 bg-white pl-10 p-4 text-base shadow-xl transition-all duration-200 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20"
                    placeholder="Enter any word or phrase to translate..."
                  />
                </div>

                <Button 
                  onClick={convertToSigns}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 py-4 text-base font-semibold text-white transition-all hover:opacity-90 hover:shadow-xl hover:scale-[1.02] duration-200"
                  variant="default"
                >
                  Translate Now →
                </Button>

                {/* Feature Highlights */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {[
                    { icon: "🚀", title: "Instant Translation", desc: "Real-time conversion" },
                    { icon: "📚", title: "Learn Naturally", desc: "Letter by letter" },
                    { icon: "💡", title: "Smart Detection", desc: "Words & characters" },
                    { icon: "🎯", title: "Perfect Practice", desc: "Visual learning" },
                  ].map((feature, index) => (
                    <div key={index} className="rounded-lg bg-gray-50 p-3 shadow-sm border border-gray-100">
                      <div className="text-xl mb-1">{feature.icon}</div>
                      <h3 className="text-gray-900 font-semibold text-sm">{feature.title}</h3>
                      <p className="text-gray-600 text-xs">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Enhanced Display Area */}
          <div className="lg:w-1/2">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-lg">
              <h1 className="text-gray-900 text-2xl font-bold mb-4">
                Watch Your Signs Come to Life
              </h1>
              
              <div className="h-[300px] rounded-xl border border-gray-200 bg-white p-6 relative shadow-inner">
                {signs.length > 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="relative w-full h-full max-w-[200px] max-h-[200px] mx-auto">
                      <Image
                        src={signs[signs.length - 1]}
                        alt="Sign Language Symbol"
                        fill
                        className="object-contain drop-shadow-lg"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full space-y-3">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-3xl">👋</span>
                    </div>
                    <p className="text-gray-600 text-center text-lg">
                      Start typing to see the magic happen!
                    </p>
                  </div>
                )}
              </div>

              {/* History Section */}
              {signs.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-gray-900 text-base mb-2">Translation History</h3>
                  <div className="flex gap-2 overflow-x-auto py-2">
                    {signs.map((sign, index) => (
                      <div 
                        key={index}
                        className="relative w-16 h-16 flex-shrink-0 rounded-xl border border-gray-200 bg-white p-2 shadow-sm transition-all duration-200 hover:scale-110 hover:shadow-lg"
                      >
                        <Image
                          src={sign}
                          alt={`Sign ${index + 1}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
} 