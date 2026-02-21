import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePosts } from '../context/PostsContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const { addPost } = usePosts();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim() && user) {
      const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      addPost(title, content, user.username, tagsArray, thumbnail || undefined);
      navigate('/blog');
    }
  };

  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans">
      <nav className="border-b border-stone-100 bg-white sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/blog" className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors">
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back to Blog</span>
          </Link>
          <div className="text-sm font-mono text-stone-400 uppercase tracking-widest">Drafting</div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-12 pb-32">
        <motion.form 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit} 
          className="space-y-8"
        >
          <div className="space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full text-5xl font-bold placeholder:text-stone-200 border-none focus:ring-0 p-0"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-stone-50 rounded-2xl border border-stone-100">
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g. tech, lifestyle, news"
                  className="w-full px-4 py-3 text-sm bg-white border border-stone-200 rounded-xl focus:border-stone-900 focus:ring-4 focus:ring-stone-900/5 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Thumbnail URL
                </label>
                <input
                  type="text"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-3 text-sm bg-white border border-stone-200 rounded-xl focus:border-stone-900 focus:ring-4 focus:ring-stone-900/5 transition-all outline-none"
                />
              </div>
            </div>
          </div>
          
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tell your story..."
            className="w-full min-h-[400px] text-xl leading-relaxed placeholder:text-stone-200 border-none focus:ring-0 p-0 resize-none"
            required
          />

          <div className="fixed bottom-8 right-8">
            <button
              type="submit"
              className="bg-emerald-600 text-white px-8 py-3 rounded-full font-medium hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 active:scale-95"
            >
              Publish Post
            </button>
          </div>
        </motion.form>
      </main>
    </div>
  );
}
