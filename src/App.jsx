import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppRouter from './app/router/AppRouter';
import { fetchCurrentUser } from './modules/auth/store/authSlice';

function App() {
  const dispatch = useDispatch();
  const { isInitialized } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check if the user has an active session via cookie (or in-memory if mocked)
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  // Optionally render a full-screen loading spinner while checking auth status
  if (!isInitialized) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <AppRouter />
  );
}

export default App;
