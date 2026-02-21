import { Link } from 'react-router-dom';
import { usePosts } from '../context/PostsContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { PlusCircle, LogOut, User as UserIcon } from 'lucide-react';

export default function Home() {
  const { posts } = usePosts();
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      <nav className="border-b border-stone-200 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-tight">BLOG.</Link>
          <div className="flex items-center gap-6">
            <Link to="/blog" className="text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors">Blog</Link>
            {isAuthenticated ? (
              <>
                <Link to="/create" className="flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700">
                  <PlusCircle size={18} />
                  <span>Create</span>
                </Link>
                <div className="flex items-center gap-2 text-sm text-stone-500 border-l border-stone-200 pl-4 ml-2">
                  <UserIcon size={16} />
                  <span>{user?.username}</span>
                  <button onClick={logout} className="ml-2 text-stone-400 hover:text-red-500 transition-colors">
                    <LogOut size={16} />
                  </button>
                </div>
              </>
            ) : (
              <Link to="/login" className="text-sm font-medium bg-stone-900 text-white px-4 py-2 rounded-lg hover:bg-stone-800 transition-colors">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-12 flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4 tracking-tight">Latest Stories</h1>
            <p className="text-stone-500">Explore thoughts, ideas, and stories from our community.</p>
          </div>
          <Link to="/blog" className="text-sm font-medium text-stone-900 hover:underline">View all posts</Link>
        </header>

        <div className="grid gap-8">
          {posts.slice(0, 5).map((post, index) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link to={`/post/${post.id}`} className="block">
                <div className="border border-stone-200 rounded-2xl p-6 bg-white hover:border-stone-400 transition-all hover:shadow-md flex flex-col md:flex-row gap-6">
                  {post.thumbnail && (
                    <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
                      <img 
                        src={post.thumbnail} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs font-mono text-stone-400 mb-3 uppercase tracking-wider">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h2 className="text-2xl font-semibold mb-3 group-hover:text-emerald-600 transition-colors">{post.title}</h2>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags?.map(tag => (
                        <span key={tag} className="px-2.5 py-1 bg-emerald-50 text-[10px] font-bold uppercase tracking-wider text-emerald-700 rounded-md border border-emerald-100">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-stone-600 line-clamp-2 leading-relaxed">
                      {post.content}
                    </p>
                    <div className="mt-6 text-sm font-medium text-stone-900 flex items-center gap-1">
                      Read more <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </main>
    </div>
  );
}
