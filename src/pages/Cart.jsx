import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-4">
            Your cart is empty
          </h2>
          <Link
            to="/menu"
            className="inline-flex items-center px-6 py-3 rounded-full bg-accent-500 text-white hover:bg-accent-600 transition-colors"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-8">
        Your Cart
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {item.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  ${item.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-accent-500 dark:hover:text-accent-400"
                >
                  -
                </button>
                <span className="text-gray-900 dark:text-white">{item.quantity}</span>
                <button
                  onClick={() => addToCart(item)}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-accent-500 dark:hover:text-accent-400"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Order Summary
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Delivery Fee</span>
                <span>$2.99</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-between text-lg font-medium text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>${(getCartTotal() + 2.99).toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/checkout')}
                className="w-full px-6 py-3 rounded-full bg-accent-500 text-white hover:bg-accent-600 transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 