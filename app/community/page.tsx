import Image from 'next/image'
import Link from 'next/link'

export default function CommunityBlog() {

  const blogPosts = [
    {
      title: "Tips for Learning Sign Language from Home",
      excerpt: "Master the basics of sign language with these effective home-study techniques and practice methods.",
      image: "/images/post-1.jpg",
      category: "Learning Tips",
      date: "February 8, 2025"
    },
    {
      title: "Building Inclusive Communities Through Sign Language",
      excerpt: "How learning sign language helps create more inclusive and understanding communities.",
      image: "/images/post-2.jpg",
      category: "Community",
      date: "February 8, 2025"
    },
    // Add more blog posts
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main Featured Post */}
          <div className="md:col-span-8">
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="/images/main-featured.jpg"
                alt="Featured post"
                width={800}
                height={500}
                className="object-cover h-[400px] w-full"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <div className="text-white">
                  <span className="text-sm font-medium">Featured Article</span>
                  <h2 className="text-2xl font-bold mt-2">The Benefits of a Healthy Sign Language Learning Routine</h2>
                  <p className="mt-2 text-sm">February 8, 2025 · 8 min read</p>
                </div>
              </div>
            </div>
          </div>

          {/* Side Posts */}
          <div className="md:col-span-4 space-y-4">
            {[1, 2].map((_, i) => (
              <div 
                key={i} 
                className="bg-white rounded-xl p-4 flex gap-4 border border-indigo-100 hover:border-indigo-200 transition-colors"
              >
                <Image
                  src={`/images/side-${i + 1}.jpeg`}
                  alt="Side post"
                  width={100}
                  height={100}
                  className="rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                    Quick Tips for Daily Sign Practice
                  </h3>
                  <p className="text-sm text-indigo-500 mt-1">February 8, 2025</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Updated Categories/Tags */}
        <div className="flex gap-4 mt-12 overflow-x-auto pb-4">
          {['All Posts', 'Learning Tips', 'Community Stories', 'Teaching Methods', 'Success Stories'].map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 transition-colors whitespace-nowrap"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Updated Blog Post Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
          {blogPosts.map((post, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden border border-indigo-100 hover:shadow-lg transition-all duration-200">
              <Image
                src={post.image}
                alt={post.title}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="text-sm text-indigo-600 font-medium bg-indigo-50 px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <h3 className="font-bold text-xl mt-2 text-gray-900">{post.title}</h3>
                <p className="text-gray-600 mt-2 text-sm">{post.excerpt}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <Link 
                    href="#" 
                    className="text-indigo-600 text-sm font-medium hover:text-indigo-700 flex items-center gap-1"
                  >
                    Read more 
                    <span className="text-lg">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Updated Popular Articles */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Popular Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-indigo-100">
                  <Image
                    src={`/images/article-1.png`}
                    alt="Article thumbnail"
                    width={400}
                    height={225}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                      {['Learning Tips', 'Community Stories', 'Teaching Methods'][index]}
                    </span>
                    <h4 className="text-white text-lg font-semibold mt-2 group-hover:text-indigo-100 transition-colors">
                      {[
                        'Master Basic Sign Language in 30 Days',
                        'Building Bridges Through Sign Language',
                        'Teaching Methods That Actually Work'
                      ][index]}
                    </h4>
                    <div className="flex items-center mt-4">
                      <div className="h-8 w-8 rounded-full bg-indigo-100 overflow-hidden">
                        <Image
                          src={`/images/avatar.jpg`}
                          alt="Author"
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-white text-sm">
                          {['Sarah Chen', 'Mike Johnson', 'Emily Wong'][index]}
                        </p>
                        <p className="text-indigo-100 text-xs">
                          {['Feb 8, 2025', 'Feb 8, 2025', 'Feb 8, 2025'][index]}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Updated Stats Section */}
        <div className="bg-white rounded-xl shadow-sm p-12 mb-16 border border-indigo-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: 'Active Learners', value: '10,000+' },
              { label: 'Teaching Hours', value: '50,000+' },
              { label: 'Community Posts', value: '25,000+' },
              { label: 'Success Stories', value: '1,000+' }
            ].map((stat, index) => (
              <div key={index} className="text-center group hover:bg-indigo-50 p-4 rounded-lg transition-colors">
                <div className="text-3xl font-bold text-indigo-600 group-hover:text-indigo-700">
                  {stat.value}
                </div>
                <div className="text-gray-600 mt-2 group-hover:text-gray-700">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section - Now positioned at bottom */}
        <div className="bg-gradient-to-r from-indigo-100 to-indigo-50 rounded-xl p-12 mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900">Stay Connected with Our Community</h2>
            <p className="mt-4 text-lg text-gray-600">
              Join thousands of sign language enthusiasts receiving weekly updates, learning tips, and inspiring stories.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 max-w-md px-6 py-3 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-sm">
                Subscribe Now
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              By subscribing, you agree to our Privacy Policy and Terms of Service
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
