import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, Suspense } from 'react';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import CuisineDishes from './pages/CuisineDishes';
import OrderSuccess from './pages/OrderSuccess';
import RestaurantDetails from './pages/RestaurantDetails';

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-500"></div>
  </div>
);

const AppContent = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const savedMode = localStorage.getItem('darkMode');
      return savedMode ? JSON.parse(savedMode) : false;
    } catch (err) {
      console.error('Error loading dark mode preference:', err);
      return false;
    }
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    } catch (err) {
      console.error('Error saving dark mode preference:', err);
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <main className="pt-16 pb-16">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cuisine/:cuisineId/dishes" element={<CuisineDishes />} />
            <Route path="/restaurant/:id" element={<RestaurantDetails />} />
            <Route path="/order-success" element={<OrderSuccess />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <UserProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </UserProvider>
    </ErrorBoundary>
  );
};

export default App;
