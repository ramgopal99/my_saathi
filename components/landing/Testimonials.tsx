import Image from "next/image";

const testimonials = [
  {
    content: "This platform has transformed how I communicate. The side-by-side video and avatar feature made learning sign language intuitive and engaging.",
    author: "Sarah Chen",
    role: "Student",
    image: "/images/sarah.jpg"  // Add actual image path
  },
  {
    content: "As a teacher for deaf students, I highly recommend this platform. The interactive approach and clear visual guidance are exceptional.",
    author: "Michael Rodriguez",
    role: "Sign Language Teacher",
    image: "/images/michael.webp"  // Add actual image path
  },
  {
    content: "The AI avatar helped me practice signing at my own pace. It's like having a patient tutor available 24/7.",
    author: "Emma Thompson",
    role: "Learning Parent",
    image: "/images/emma.jpeg"  // Add actual image path
  }
]

export default function Testimonials() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12">
          What Our Community Says
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.author}
              className="bg-white dark:bg-gray-700 p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg 
                hover:shadow-2xl hover:-translate-y-2 transform 
                transition-all duration-300 ease-in-out border-2 border-transparent
                hover:border-indigo-500 cursor-pointer"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full overflow-hidden flex-shrink-0">
                  <Image 
                    src={testimonial.image} 
                    alt={testimonial.author}
                    className="h-full w-full object-cover"
                    width={100}
                    height={100}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white">
                    {testimonial.author}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-200 leading-relaxed">
                &quot;{testimonial.content}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 