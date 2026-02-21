import { createContext, useContext, useState, ReactNode } from 'react';

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  tags: string[];
  thumbnail?: string;
}

interface PostsContextType {
  posts: Post[];
  addPost: (title: string, content: string, author: string, tags: string[], thumbnail?: string) => void;
  getPostById: (id: string) => Post | undefined;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('blog_posts');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure all posts have the tags property (for backward compatibility)
      return parsed.map((p: any) => ({
        ...p,
        tags: p.tags || []
      }));
    }
    return [
      {
        id: '1',
        title: 'Welcome to our Blog',
        content: 'This is the first post on our new platform. Feel free to explore!',
        author: 'Admin',
        createdAt: new Date().toISOString(),
        tags: ['welcome', 'news'],
        thumbnail: 'https://picsum.photos/seed/blog1/800/450'
      }
    ];
  });

  const addPost = (title: string, content: string, author: string, tags: string[], thumbnail?: string) => {
    const newPost: Post = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      content,
      author,
      createdAt: new Date().toISOString(),
      tags,
      thumbnail
    };
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('blog_posts', JSON.stringify(updatedPosts));
  };

  const getPostById = (id: string) => {
    return posts.find(p => p.id === id);
  };

  return (
    <PostsContext.Provider value={{ posts, addPost, getPostById }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
}
