import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PostsProvider } from './context/PostsContext';
import AppRoutes from './routes';

export default function App() {
  return (
    <AuthProvider>
      <PostsProvider>
        <Router>
          <AppRoutes />
        </Router>
      </PostsProvider>
    </AuthProvider>
  );
}
