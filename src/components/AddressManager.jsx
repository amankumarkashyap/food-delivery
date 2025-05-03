import { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const AddressManager = () => {
  const [addresses, setAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem('savedAddresses');
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error('Error loading saved addresses:', err);
      return [];
    }
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentAddress, setCurrentAddress] = useState({
    id: '',
    label: '',
    address: '',
    landmark: '',
    pincode: ''
  });

  useEffect(() => {
    localStorage.setItem('savedAddresses', JSON.stringify(addresses));
  }, [addresses]);

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (currentAddress.id) {
      setAddresses(addresses.map(addr => 
        addr.id === currentAddress.id ? currentAddress : addr
      ));
    } else {
      setAddresses([...addresses, {
        ...currentAddress,
        id: Date.now().toString()
      }]);
    }
    resetForm();
  };

  const handleEdit = (address) => {
    setIsEditing(true);
    setCurrentAddress(address);
  };

  const handleDelete = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentAddress({
      id: '',
      label: '',
      address: '',
      landmark: '',
      pincode: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {isEditing ? 'Edit Address' : 'Add New Address'}
        </h2>
        <form onSubmit={handleAddressSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Label (e.g., Home, Work)
            </label>
            <input
              type="text"
              value={currentAddress.label}
              onChange={(e) => setCurrentAddress(prev => ({ ...prev, label: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Complete Address
            </label>
            <textarea
              value={currentAddress.address}
              onChange={(e) => setCurrentAddress(prev => ({ ...prev, address: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-500"
              rows="3"
              placeholder="House/Flat No., Building Name, Street Name, Area"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Landmark (Optional)
            </label>
            <input
              type="text"
              value={currentAddress.landmark}
              onChange={(e) => setCurrentAddress(prev => ({ ...prev, landmark: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-500"
              placeholder="Nearby landmark for easy location"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Pincode
            </label>
            <input
              type="text"
              value={currentAddress.pincode}
              onChange={(e) => setCurrentAddress(prev => ({ ...prev, pincode: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-500"
              required
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
              {isEditing ? 'Update Address' : 'Save Address'}
            </button>
          </div>
        </form>
      </div>

      {addresses.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Saved Addresses
          </h2>
          <div className="space-y-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {address.label}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {address.address}
                    </p>
                    {address.landmark && (
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                        Landmark: {address.landmark}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                      Pincode: {address.pincode}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(address)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-accent-500"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(address.id)}
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

export default AddressManager; 