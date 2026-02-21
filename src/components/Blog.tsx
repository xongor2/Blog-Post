import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from '../context/PostsContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { Search, PlusCircle, LogOut, User as UserIcon, Tag } from 'lucide-react';

export default function Blog() {
  const { posts } = usePosts();
  const { user, logout, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      <nav className="border-b border-stone-200 bg-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-tight">BLOG.</Link>
          <div className="flex items-center gap-6">
            <Link to="/blog" className="text-sm font-medium border-b-2 border-stone-900 pb-1">Blog</Link>
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

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-bold mb-4 tracking-tight">The Blog</h1>
            <p className="text-stone-500 text-lg">Discover all stories, news, and insights.</p>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900/5 focus:border-stone-900 transition-all"
            />
          </div>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group flex flex-col bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-stone-400 transition-all hover:shadow-lg"
              >
                <Link to={`/post/${post.id}`} className="flex-1 flex flex-col">
                  {post.thumbnail && (
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={post.thumbnail} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags?.map(tag => (
                        <span key={tag} className="px-2.5 py-1 bg-stone-100 text-[10px] font-bold uppercase tracking-wider text-stone-700 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h2 className="text-xl font-bold mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    
                    <p className="text-stone-500 text-sm line-clamp-3 mb-6 flex-1">
                      {post.content}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-50">
                      <div className="flex items-center gap-2 text-xs text-stone-400">
                        <span className="font-medium text-stone-600">{post.author}</span>
                        <span>•</span>
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                      <span className="text-stone-900 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-stone-400 text-lg">No posts found matching "{searchQuery}"</p>
          </div>
        )}
      </main>
    </div>
  );
}
