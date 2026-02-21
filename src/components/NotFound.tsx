import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 text-stone-900 p-4 text-center">
      <h1 className="text-9xl font-bold tracking-tighter text-stone-200">404</h1>
      <p className="text-2xl font-medium mt-4 mb-8">Page not found</p>
      <Link 
        to="/" 
        className="bg-stone-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-stone-800 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
