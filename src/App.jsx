import './App.css';
import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import TodosPage from './pages/TodosPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

// Import the RequireAuth component to protect certain routes
import RequireAuth from './components/RequireAuth.jsx';

// Import the Header component that will be displayed on all pages
import Header from './shared/Header.jsx';

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Public routes, accessible to everyone */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected routes, requiring authentication */}
        <Route
          path="/todos"
          element={
            <RequireAuth>
              <TodosPage />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        
        {/* Catch-all route for handling any 404 errors */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;