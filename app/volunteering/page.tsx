import HumanModel from '@/components/volunteering/HumanModel';

export default function Home() {
  return (
    <main className="h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="h-full">

        {/* Main Content */}
        <div className="h-full bg-white shadow-xl overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-4 h-full">
            {/* Right Panel - 3D Viewer */}
            <div className="lg:col-span-4 h-full">
              <HumanModel />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-gray-600 text-sm">
          <p>Use the controls on the left to manipulate the 3D model</p>
        </footer>
      </div>
    </main>
  );
}
