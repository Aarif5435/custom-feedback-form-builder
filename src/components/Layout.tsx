import Link from 'next/link';
import { ReactNode } from 'react';


interface LayoutProps {
    children: ReactNode;
  }
  
  export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <header className="bg-gray-800 text-white">
        <nav className="container mx-auto flex justify-between items-center p-5">
          <div className="text-lg font-bold">
            <Link href="/">My Website</Link>
          </div>
          <div className="space-x-4 flex items-center">
            <Link href="/" className="hover:text-gray-400">Home</Link>
            <Link href="/about" className="hover:text-gray-400">About</Link>
            <Link href="/services" className="hover:text-gray-400">Services</Link>
            <Link href="/contact" className="hover:text-gray-400">Contact</Link>
            <Link href="/admin/dashboard">
              <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                Admin
              </button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Page Content */}
      <main className="flex-grow container mx-auto p-5">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-5">
        <p>&copy; 2024 My Website. All rights reserved.</p>
      </footer>
    </div>
  );
};
