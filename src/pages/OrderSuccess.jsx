import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center"
      >
        <div className="flex justify-center mb-6">
          <CheckCircleIcon className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Thank you for your order. We'll send you an email with the order details and tracking information.
        </p>
        <div className="space-y-4">
          <Link
            to="/"
            className="block w-full px-4 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            to="/profile"
            className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            View Order History
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess; 