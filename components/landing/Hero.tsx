import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-indigo-50 min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center h-full">
          {/* Left Content */}
          <div>
            <p className="text-gray-700 mb-2">Hi, there!</p>
            <h1 className="text-5xl font-bold mb-3">
              <span className="text-indigo-600">INCLUSIVE</span>{" "}
              <span className="text-gray-800">LEARNING FOR EVERYONE</span>
            </h1>
            <p className="text-gray-600 mb-6">
              An adaptive learning platform designed to empower specially-abled learners 
              with personalized education tools and inclusive experiences
            </p>
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-colors">
              Start Learning
            </button>
          </div>

          {/* Right Content */}
          <div className="relative h-[500px] mt-8">
            {/* Background Shapes */}
            <div className="absolute right-0 top-20 w-4/5 h-[90%]">
              <div className="absolute inset-0 bg-[#1B3654] rounded-bl-[80px] rounded-tr-[80px] bottom-10"></div>
              <div className="absolute inset-0 bg-indigo-600 rounded-bl-[80px] rounded-tr-[80px] transform translate-x-4 translate-y-4"></div>
            </div>
            
            {/* Hero Image */}
            <Image 
              src="/images/hero.png" 
              alt="Professional with welcoming gesture" 
              className="absolute right-0 top-24 w-4/5 h-[90%] object-cover rounded-bl-[80px] rounded-tr-[80px] z-10"
              width={800}
              height={800}
            />
            
            {/* Stats Card - Top Left */}
            <div className="absolute top-16 left-0 bg-white rounded-lg px-4 py-2 shadow-lg z-20">
              <div className="flex items-center gap-2">
                <div className="bg-indigo-600 p-2 rounded-lg">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <div className="text-indigo-600 font-bold">1K+</div>
                  <div className="text-gray-600 text-sm">Videos</div>
                </div>
              </div>
            </div>

            {/* Stats Card - Top Right */}
            <div className="absolute top-16 right-8 bg-white rounded-lg px-4 py-2 shadow-lg z-20">
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 text-xl">★</span>
                <div>
                  <div className="font-bold">4.8</div>
                  <div className="text-gray-600 text-sm">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Product Designer Card */}
            <div className="absolute bottom-16 right-8 bg-white rounded-lg px-4 py-2 shadow-lg z-20">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-600 p-2 rounded-lg">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold">Verified Teachers</div>
                  <div className="text-gray-600 text-sm">100+</div>
                </div>
              </div>
            </div>

            {/* Dotted Pattern */}
            <div className="absolute -right-4 top-12">
              <div className="grid grid-cols-4 gap-2">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-gray-200 rounded-full"></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Service Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-10 text-center lg:text-left">KEY FEATURES</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-indigo-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Sign Language Integration</h3>
              <p className="text-gray-600">Interactive lessons with real-time sign language interpretation and video-based learning materials.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-indigo-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Visual Learning Tools</h3>
              <p className="text-gray-600">Comprehensive visual aids, graphics, and interactive diagrams to enhance understanding and engagement.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-indigo-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Community Support</h3>
              <p className="text-gray-600">Connect with peers, mentors, and educators in an inclusive learning community designed for collaboration.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 