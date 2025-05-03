import { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon, CreditCardIcon } from '@heroicons/react/24/outline';

const PaymentManager = () => {
  const [paymentMethods, setPaymentMethods] = useState(() => {
    try {
      const saved = localStorage.getItem('savedPaymentMethods');
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error('Error loading saved payment methods:', err);
      return [];
    }
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentPayment, setCurrentPayment] = useState({
    id: '',
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cardType: 'credit' // or 'debit'
  });

  useEffect(() => {
    localStorage.setItem('savedPaymentMethods', JSON.stringify(paymentMethods));
  }, [paymentMethods]);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (currentPayment.id) {
      setPaymentMethods(paymentMethods.map(payment => 
        payment.id === currentPayment.id ? currentPayment : payment
      ));
    } else {
      setPaymentMethods([...paymentMethods, {
        ...currentPayment,
        id: Date.now().toString()
      }]);
    }
    resetForm();
  };

  const handleEdit = (payment) => {
    setIsEditing(true);
    setCurrentPayment(payment);
  };

  const handleDelete = (id) => {
    setPaymentMethods(paymentMethods.filter(payment => payment.id !== id));
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentPayment({
      id: '',
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cardType: 'credit'
    });
  };

  const formatCardNumber = (number) => {
    return number.replace(/(\d{4})/g, '$1 ').trim();
  };

  const maskCardNumber = (number) => {
    return `**** **** **** ${number.slice(-4)}`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {isEditing ? 'Edit Payment Method' : 'Add New Payment Method'}
        </h2>
        <form onSubmit={handlePaymentSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Card Type
            </label>
            <select
              value={currentPayment.cardType}
              onChange={(e) => setCurrentPayment(prev => ({ ...prev, cardType: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-500"
              required
            >
              <option value="credit">Credit Card</option>
              <option value="debit">Debit Card</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Card Number
            </label>
            <input
              type="text"
              value={currentPayment.cardNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 16);
                setCurrentPayment(prev => ({ ...prev, cardNumber: value }));
              }}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-500"
              placeholder="1234 5678 9012 3456"
              required
              maxLength="19"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Card Holder Name
            </label>
            <input
              type="text"
              value={currentPayment.cardHolder}
              onChange={(e) => setCurrentPayment(prev => ({ ...prev, cardHolder: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-500"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Expiry Date
            </label>
            <input
              type="text"
              value={currentPayment.expiryDate}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 4) {
                  const formatted = value.length > 2 ? `${value.slice(0, 2)}/${value.slice(2)}` : value;
                  setCurrentPayment(prev => ({ ...prev, expiryDate: formatted }));
                }
              }}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-500"
              placeholder="MM/YY"
              required
              maxLength="5"
            />
          </div>
          <div className="flex justify-end space-x-4">
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600"
            >
              {isEditing ? 'Update Payment Method' : 'Save Payment Method'}
            </button>
          </div>
        </form>
      </div>

      {paymentMethods.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Saved Payment Methods
          </h2>
          <div className="space-y-4">
            {paymentMethods.map((payment) => (
              <div
                key={payment.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-3">
                    <CreditCardIcon className="h-6 w-6 text-gray-400" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {payment.cardType === 'credit' ? 'Credit Card' : 'Debit Card'}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {maskCardNumber(payment.cardNumber)}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                        {payment.cardHolder} • Expires {payment.expiryDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(payment)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-accent-500"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(payment.id)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-500"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentManager; 