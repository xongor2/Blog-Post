import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePosts } from '../context/PostsContext';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, User } from 'lucide-react';

export default function PostDetail() {
  const { id } = useParams();
  const { getPostById } = usePosts();
  const navigate = useNavigate();
  const post = getPostById(id || '');

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link to="/" className="text-emerald-600 hover:underline">Return home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans">
      <nav className="border-b border-stone-100 bg-white sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-16">
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <header className="mb-12">
            {post.thumbnail && (
              <div className="mb-8 rounded-3xl overflow-hidden aspect-video shadow-2xl shadow-stone-200">
                <img 
                  src={post.thumbnail} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
            
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags?.map(tag => (
                <span key={tag} className="px-4 py-1.5 bg-emerald-50 text-xs font-bold uppercase tracking-widest text-emerald-700 rounded-full border border-emerald-100">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-5xl font-bold mb-8 leading-tight tracking-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-6 text-sm text-stone-500 border-y border-stone-100 py-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <User size={16} />
                </div>
                <span className="font-medium text-stone-900">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{new Date(post.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
              </div>
            </div>
          </header>

          <div className="prose prose-stone prose-lg max-w-none">
            {post.content.split('\n').map((paragraph, i) => (
              <p key={i} className="mb-6 text-xl leading-relaxed text-stone-700">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.article>
      </main>
    </div>
  );
}
