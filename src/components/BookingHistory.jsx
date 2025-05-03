import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, MapPinIcon, XMarkIcon } from '@heroicons/react/24/outline';

const BookingHistory = () => {
  const [bookings, setBookings] = useState(() => {
    const savedBookings = localStorage.getItem('restaurantBookings');
    return savedBookings ? JSON.parse(savedBookings) : [];
  });

  useEffect(() => {
    localStorage.setItem('restaurantBookings', JSON.stringify(bookings));
  }, [bookings]);

  const cancelBooking = (bookingId) => {
    setBookings(bookings.filter(booking => booking.id !== bookingId));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (bookings.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your Bookings</h2>
        <div className="text-center py-8">
          <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">No bookings found</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Your restaurant bookings will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Your Bookings</h2>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {booking.restaurantName}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    <span>{formatDate(booking.date)}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <ClockIcon className="h-5 w-5 mr-2" />
                    <span>{formatTime(booking.time)}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <MapPinIcon className="h-5 w-5 mr-2" />
                    <span>{booking.restaurantAddress}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => cancelBooking(booking.id)}
                className="text-red-500 hover:text-red-600 transition-colors"
                title="Cancel Booking"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Booking ID: {booking.id}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  new Date(booking.date) > new Date()
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {new Date(booking.date) > new Date() ? 'Upcoming' : 'Past'}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BookingHistory; 