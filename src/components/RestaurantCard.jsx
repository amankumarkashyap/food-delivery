import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { StarIcon, ClockIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const RestaurantCard = ({ restaurant }) => {
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 50]);

  const handleBooking = (e) => {
    e.preventDefault();
    
    // Create new booking object
    const newBooking = {
      id: Date.now().toString(),
      restaurantName: restaurant.name,
      restaurantAddress: "123 Food Street, Cuisine City", // You might want to add this to your restaurant data
      date: selectedDate,
      time: selectedTime,
      createdAt: new Date().toISOString()
    };

    // Get existing bookings
    const existingBookings = JSON.parse(localStorage.getItem('restaurantBookings') || '[]');
    
    // Add new booking
    const updatedBookings = [...existingBookings, newBooking];
    
    // Save to localStorage
    localStorage.setItem('restaurantBookings', JSON.stringify(updatedBookings));

    // Show confirmation
    alert(`Booking confirmed for ${restaurant.name} on ${selectedDate} at ${selectedTime}`);
    setShowBooking(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute inset-0 w-full h-[120%]"
        >
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </motion.div>
        
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setShowBooking(true)}
            className="bg-accent-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-accent-600 transition-colors"
          >
            Book a Table
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {restaurant.name}
          </h3>
          <div className="flex items-center bg-green-100 dark:bg-green-900 px-2 py-1 rounded">
            <StarIconSolid className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              {restaurant.rating}
            </span>
          </div>
        </div>

        <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-2">
          <ClockIcon className="h-4 w-4 mr-1" />
          <span>{restaurant.deliveryTime} min</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {restaurant.cuisines.map((cuisine, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded"
            >
              {cuisine}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400 text-sm">
            {restaurant.priceForTwo}
          </span>
          {restaurant.discount && (
            <span className="text-green-600 dark:text-green-400 text-sm font-medium">
              {restaurant.discount}
            </span>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Book a Table at {restaurant.name}
            </h3>
            <form onSubmit={handleBooking}>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                  Time
                </label>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowBooking(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-accent-500 text-white rounded-md hover:bg-accent-600 transition-colors"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default RestaurantCard; 