import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './layouts/HomePage';
import LoginPage from './layouts/LoginPage';
import RegisterPage from './layouts/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import PostPage from './layouts/PostPage';
import StripePage from './layouts/StripePage';
import ViewPost from './layouts/ViewPost';
import { NotificationProvider } from './contexts/SocketContext';
import { RootState } from './store/store';
import { PageProvider } from './contexts/PageContext';
import { FeedProvider } from './contexts/RefreshPageContext';

const App: React.FC = () => {
  const userState = useSelector((state: RootState) => state.user.state);

  return (
    <Router>
      <PageProvider>
        <FeedProvider>
          <NotificationProvider>
            <Routes>
              <Route path="/" element={<StripePage />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute isAllowed={userState}>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/post"
                element={
                  <ProtectedRoute isAllowed={userState}>
                    <PostPage />
                  </ProtectedRoute>
                }
              />
              <Route path="view/:id" element={<ViewPost />} />
            </Routes>
          </NotificationProvider>
        </FeedProvider>
      </PageProvider>
    </Router>
  );
};

export default App;
