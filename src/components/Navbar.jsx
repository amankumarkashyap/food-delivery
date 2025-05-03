import { Link } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import Logo from './Logo';

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const { cartItems } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-accent-500 dark:hover:text-accent-400 transition-colors"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {cartItems && cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            <Link
              to="/profile"
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-accent-500 dark:hover:text-accent-400 transition-colors"
            >
              <UserIcon className="h-6 w-6" />
            </Link>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-accent-500 dark:hover:text-accent-400 transition-colors"
            >
              {isDarkMode ? (
                <SunIcon className="h-6 w-6" />
              ) : (
                <MoonIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 