import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const savedUser = localStorage.getItem('userData');
    return savedUser ? JSON.parse(savedUser) : {
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        profileImage: ''
      },
      addresses: [],
      paymentMethods: [],
      preferences: {
        notifications: {
          email: true,
          sms: true,
          push: true
        },
        theme: 'light'
      }
    };
  });

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  const updatePersonalInfo = (info) => {
    setUserData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info }
    }));
  };

  const addAddress = (address) => {
    setUserData(prev => ({
      ...prev,
      addresses: [...prev.addresses, { ...address, id: Date.now().toString() }]
    }));
  };

  const updateAddress = (id, updatedAddress) => {
    setUserData(prev => ({
      ...prev,
      addresses: prev.addresses.map(addr => 
        addr.id === id ? { ...addr, ...updatedAddress } : addr
      )
    }));
  };

  const deleteAddress = (id) => {
    setUserData(prev => ({
      ...prev,
      addresses: prev.addresses.filter(addr => addr.id !== id)
    }));
  };

  const addPaymentMethod = (payment) => {
    setUserData(prev => ({
      ...prev,
      paymentMethods: [...prev.paymentMethods, { ...payment, id: Date.now().toString() }]
    }));
  };

  const updatePaymentMethod = (id, updatedPayment) => {
    setUserData(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.map(payment => 
        payment.id === id ? { ...payment, ...updatedPayment } : payment
      )
    }));
  };

  const deletePaymentMethod = (id) => {
    setUserData(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.filter(payment => payment.id !== id)
    }));
  };

  const updatePreferences = (preferences) => {
    setUserData(prev => ({
      ...prev,
      preferences: { ...prev.preferences, ...preferences }
    }));
  };

  const value = {
    userData,
    updatePersonalInfo,
    addAddress,
    updateAddress,
    deleteAddress,
    addPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
    updatePreferences
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext; 