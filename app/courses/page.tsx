import Image from 'next/image'
import Link from 'next/link'

interface Course {
  id: number;
  title: string;
  image: string;
  description: string;
  category: string;
  duration: string;
  level: string;
}

const courses: Course[] = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    image: "/images/course.webp",
    description: "Master modern web development from frontend to backend with hands-on projects and real-world applications",
    category: "Development",
    duration: "12 Weeks",
    level: "Beginner to Advanced"
  },
  {
    id: 2,
    title: "Python Programming Masterclass",
    image: "/images/course.webp",
    description: "Learn Python programming from basics to advanced concepts with practical exercises and industry best practices",
    category: "Programming",
    duration: "8 Weeks",
    level: "Intermediate"
  },
  {
    id: 3,
    title: "Data Science Fundamentals",
    image: "/images/course.webp",
    description: "Dive into the world of data analysis and machine learning with comprehensive tutorials and case studies",
    category: "Data Science",
    duration: "10 Weeks",
    level: "Intermediate"
  },
  {
    id: 4,
    title: "UI/UX Design Professional",
    image: "/images/course.webp",
    description: "Create stunning user interfaces and experiences with modern design principles and industry-standard tools",
    category: "Design",
    duration: "10 Weeks",
    level: "Beginner to Advanced"
  },
  {
    id: 5,
    title: "Mobile App Development with React Native",
    image: "/images/course.webp",
    description: "Build cross-platform mobile applications using React Native and modern JavaScript frameworks",
    category: "Development",
    duration: "12 Weeks",
    level: "Intermediate"
  },
  {
    id: 6,
    title: "Cloud Computing & DevOps",
    image: "/images/course.webp",
    description: "Master cloud platforms, containerization, and modern DevOps practices for scalable applications",
    category: "Infrastructure",
    duration: "14 Weeks",
    level: "Advanced"
  },
  {
    id: 7,
    title: "Artificial Intelligence & Machine Learning",
    image: "/images/course.webp",
    description: "Deep dive into AI algorithms, neural networks, and practical machine learning applications",
    category: "AI & ML",
    duration: "16 Weeks",
    level: "Advanced"
  },
  {
    id: 8,
    title: "Digital Marketing Mastery",
    image: "/images/course.webp",
    description: "Learn comprehensive digital marketing strategies, SEO, social media, and analytics",
    category: "Marketing",
    duration: "8 Weeks",
    level: "Beginner"
  },
  {
    id: 9,
    title: "Blockchain Development",
    image: "/images/course.webp",
    description: "Build decentralized applications and smart contracts using blockchain technology",
    category: "Development",
    duration: "12 Weeks",
    level: "Advanced"
  }
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Available Courses</h1>
          <Link 
            href="/dashboard/mycourses"
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2"
          >
            <span>My Courses</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {courses.map((course) => (
            <Link 
              key={course.id}
              href={`/courses/${course.id}`}
              className="group bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full"
            >
              <div className="relative h-52">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1.5 bg-blue-600/90 text-white text-sm rounded-full font-medium">
                    {course.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold mb-3 text-blue-600 group-hover:text-blue-700 transition-colors duration-300 line-clamp-2">
                  {course.title}
                </h2>
                <p className="text-gray-600 mb-4 text-sm line-clamp-2 flex-grow">
                  {course.description}
                </p>
                <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    {course.level}
                  </div>
                </div>
                <div className="mt-auto">
                  <div className="w-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-2.5 rounded-lg font-medium 
                    transition-all duration-300 flex items-center justify-center gap-2">
                    <span>Learn More</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
