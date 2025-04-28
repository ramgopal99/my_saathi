"use client";

import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface VideoLesson {
  id: number;
  title: string;
  duration: string;
  videoUrl: string;
  subtitles: {
    timestamp: string;
    text: string;
  }[];
}

const lessonData: VideoLesson = {
  id: 1,
  title: "Introduction to Web Development",
  duration: "10:25",
  videoUrl: "https://www.youtube-nocookie.com/embed/YyAuFiIv-V4?si=gSa90LwYgxscJqbL", // Using youtube-nocookie domain
  subtitles: [
  
    // Add more subtitles as needed
  ]
};

export default function CoursePlayerPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation */}
      <div className="bg-card border-b px-4 py-3">
        <div className="max-w-[1920px] mx-auto flex items-center justify-between">
          <Link 
            href={`/courses/${lessonData.id}`}
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Course
          </Link>
          <h1 className="font-semibold text-lg truncate">{lessonData.title}</h1>
          <button 
            onClick={() => router.push(`/courses/${lessonData.id}`)}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex bg-black">
        {/* Video Section with max height */}
        <div className="flex-1 flex items-center justify-center py-8">
          <div className="w-full max-w-[960px] mx-auto aspect-video">
            <iframe
              className="w-full h-full"
              src={lessonData.videoUrl}
              title={lessonData.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Subtitles Section */}
        <div className="w-[400px] bg-card border-l flex flex-col">
          {/* Subtitles Header */}
          <div className="p-4 border-b">
            <h2 className="font-semibold">Transcript</h2>
          </div>

          {/* Subtitles Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-6">
              {lessonData.subtitles.map((subtitle, index) => (
                <div 
                  key={index}
                  className="group flex gap-4 hover:bg-muted/50 p-2 rounded-lg transition-colors cursor-pointer"
                >
                  <span className="text-sm text-muted-foreground font-medium">
                    {subtitle.timestamp}
                  </span>
                  <p className="text-sm flex-1">
                    {subtitle.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Playback Controls */}
          <div className="p-4 border-t bg-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link 
                  href="/courses/1/learn" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Link>
                <Link 
                  href="/courses/2/learn" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  Auto-scroll
                </button>
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 