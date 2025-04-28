import Image from 'next/image'
import Link from 'next/link'

interface CourseContent {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  category: string;
  duration: string;
  level: string;
  learnings: string[];
  instructors: {
    name: string;
    image: string;
    role: string;
  }[];
  rating: number;
  students: number;
  lastUpdated: string;
  language: string;
}

const courseContent: CourseContent = {
  id: 1,
  title: "Complete Web Development Bootcamp",
  subtitle: "Master Modern Web Development from Frontend to Backend | Real Projects, Best Practices & Advanced Concepts",
  image: "/images/course.webp",
  description: "Master modern web development from frontend to backend with hands-on projects and real-world applications",
  category: "Development",
  duration: "12 Weeks",
  level: "Beginner to Advanced",
  rating: 4.5,
  students: 250170,
  lastUpdated: "February 2024",
  language: "English",
  learnings: [
    "Build modern, responsive websites with HTML5, CSS3, and JavaScript",
    "Master React.js and create dynamic web applications",
    "Develop backend systems using Node.js and Express",
    "Work with databases including MongoDB and PostgreSQL",
    "Implement authentication, API integration, and deployment",
    "Learn industry best practices and professional development workflows"
  ],
  instructors: [
    {
      name: "John Smith",
      image: "/images/instructor.webp",
      role: "Senior Web Developer & Instructor"
    }
  ]
};

export default function CourseContentPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with gradient background */}
      <div className="bg-gradient-to-b from-card to-background border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Link 
                  href="/courses" 
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Courses
                </Link>
                <span>›</span>
                <span>{courseContent.category}</span>
              </nav>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                {courseContent.title}
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                {courseContent.subtitle}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center">
                  <span className="text-indigo-600 font-bold text-xl mr-2">{courseContent.rating}</span>
                  <div className="flex text-indigo-600">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-muted-foreground">({courseContent.students.toLocaleString()} students)</span>
                </div>
                <div className="flex items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Last updated {courseContent.lastUpdated}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    <span>{courseContent.language}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:sticky lg:top-4">
              <div className="bg-card rounded-xl overflow-hidden shadow-xl">
                <div className="aspect-video relative">
                  <Image
                    src={courseContent.image}
                    alt={courseContent.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <button className="bg-white/95 hover:bg-white text-gray-900 rounded-full p-5 transition-all duration-300 transform hover:scale-110">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <Link 
                    href={`/courses/${courseContent.id}/learn`}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-semibold 
                      transition-all duration-300 shadow-lg hover:shadow-xl mb-6 flex items-center justify-center gap-2"
                  >
                    <span>Enroll Now</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  
                  <div className="space-y-4 border-t pt-6">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-semibold text-foreground">{courseContent.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Level</span>
                      <span className="font-semibold text-foreground">{courseContent.level}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Category</span>
                      <span className="font-semibold text-foreground">{courseContent.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="space-y-12">
              <section className="bg-card rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-foreground">What you&apos;ll learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {courseContent.learnings.map((learning, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-muted-foreground">{learning}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-card rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-foreground">Course Content</h2>
                {/* Add course content sections here */}
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 