'use client'

export default function ModelViewerPage() {
  const handleAppDownload = () => {
    // Replace with your actual APK file path in the public folder
    const apkUrl = '/downloads/your-app-name.apk';
    
    // Create an anchor element
    const link = document.createElement('a');
    link.href = apkUrl;
    link.download = 'SignLanguageAR.apk'; // The name the file will be downloaded as
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-gradient-to-b from-white to-indigo-50">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-indigo-800 animate-fade-in">
          Learn Sign Language in 3D
        </h1>
        <p className="text-xl mb-8 text-gray-700 leading-relaxed">
          Experience a groundbreaking way to learn sign language through augmented reality.
          Watch signs come to life in your space with our innovative AR technology!
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
            <span className="text-xl">🎯</span>
            Try AR Viewer Now
          </button>
          <button 
            onClick={handleAppDownload}
            className="bg-white text-indigo-600 px-8 py-4 rounded-xl hover:bg-indigo-50 transition-all duration-200 border-2 border-indigo-600 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            <span className="text-xl">📱</span>
            Download App
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-5xl mx-auto mb-16">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-indigo-700">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gradient-to-br from-indigo-50 to-white rounded-xl hover:shadow-md transition-all">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">📱 Scan & View</h3>
              <p className="text-gray-600">
                Point your device at any surface to see 3D sign language models come to life
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-indigo-50 to-white rounded-xl hover:shadow-md transition-all">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">🔄 Interact</h3>
              <p className="text-gray-600">
                Rotate, zoom, and study the signs from every angle for better understanding
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-indigo-50 to-white rounded-xl hover:shadow-md transition-all">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">🎓 Learn</h3>
              <p className="text-gray-600">
                Practice and master signs with real-time 3D visualization
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div className="max-w-4xl mx-auto text-center bg-indigo-900 text-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6">Download Our Android App</h2>
        <p className="text-lg mb-8 text-indigo-100">
          Get the full AR experience on your Android device. Download directly to your phone.
        </p>
        <div className="flex justify-center">
          <button 
            onClick={handleAppDownload}
            className="bg-white text-indigo-900 px-8 py-4 rounded-xl hover:bg-indigo-50 transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <span className="text-xl">🤖</span>
            Download APK
            <span className="text-sm text-indigo-600 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
} 