import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Blog from './components/Blog';
import Login from './components/Login';
import CreatePost from './components/CreatePost';
import PostDetail from './components/PostDetail';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/login" element={<Login />} />
      <Route 
        path="/create" 
        element={
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        } 
      />
      <Route path="/post/:id" element={<PostDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
