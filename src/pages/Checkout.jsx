import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });

  const subtotal = getCartTotal();
  const deliveryFee = 2.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + deliveryFee + tax;

  const validateForm = () => {
    const newErrors = {};
    
    if (!deliveryAddress.street.trim()) {
      newErrors.street = 'Street address is required';
    }
    
    if (!deliveryAddress.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!deliveryAddress.state.trim()) {
      newErrors.state = 'State is required';
    }
    
    if (!deliveryAddress.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(deliveryAddress.zipCode)) {
      newErrors.zipCode = 'Invalid ZIP code format';
    }
    
    if (!deliveryAddress.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(deliveryAddress.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      // Here you would typically handle the payment processing
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      alert('Order placed successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error processing order:', error);
      alert('Failed to process order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-4">
            Your cart is empty
          </h2>
          <button
            onClick={() => navigate('/menu')}
            className="inline-flex items-center px-6 py-3 rounded-full bg-accent-500 text-white hover:bg-accent-600 transition-colors"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-8">
          Checkout
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Delivery Address */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Delivery Address
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={deliveryAddress.street}
                  onChange={(e) => setDeliveryAddress({ ...deliveryAddress, street: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.street ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                />
                {errors.street && (
                  <p className="mt-1 text-sm text-red-500">{errors.street}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress.city}
                    onChange={(e) => setDeliveryAddress({ ...deliveryAddress, city: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.city ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress.state}
                    onChange={(e) => setDeliveryAddress({ ...deliveryAddress, state: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.state ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  />
                  {errors.state && (
                    <p className="mt-1 text-sm text-red-500">{errors.state}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress.zipCode}
                    onChange={(e) => setDeliveryAddress({ ...deliveryAddress, zipCode: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.zipCode ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  />
                  {errors.zipCode && (
                    <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={deliveryAddress.phone}
                    onChange={(e) => setDeliveryAddress({ ...deliveryAddress, phone: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Payment Method
            </h3>
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-accent-500"
                />
                <span className="text-gray-700 dark:text-gray-300">Credit/Debit Card</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-accent-500"
                />
                <span className="text-gray-700 dark:text-gray-300">Cash on Delivery</span>
              </label>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Order Summary
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                <div className="flex justify-between text-lg font-medium text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-6 py-3 rounded-lg bg-accent-500 text-white font-medium ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent-600'
            } transition-colors`}
          >
            {isSubmitting ? 'Processing...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout; 