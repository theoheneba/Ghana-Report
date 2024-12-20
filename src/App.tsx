import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { LandingPage } from './pages/LandingPage';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { ReportForm } from './components/ReportForm';
import { ReportStatus } from './pages/ReportStatus';
import { Dashboard } from './pages/Dashboard';
import { AdminLogin } from './pages/AdminLogin';
import { BlogDashboard } from './pages/admin/BlogDashboard';
import { AdminManagement } from './pages/admin/AdminManagement';
import { ProtectedRoute } from './components/ProtectedRoute';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/report" element={<ReportForm />} />
          <Route path="/status" element={<ReportStatus />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="blog" element={<BlogDashboard />} />
                  <Route path="users" element={<AdminManagement />} />
                </Routes>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster 
          position="top-right"
          toastOptions={{
            className: 'dark:bg-gray-800 dark:text-white'
          }}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}