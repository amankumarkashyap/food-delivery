import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StarIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { useCart } from '../context/CartContext';

const RestaurantDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulated API call - replace with actual API call
    const fetchRestaurant = async () => {
      try {
        // This is a mock data - replace with actual API call
        const mockRestaurant = {
          id: id,
          name: "The Gourmet Kitchen",
          image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920",
          rating: 4.5,
          deliveryTime: "30-40 min",
          priceForTwo: "₹800 for two",
          cuisines: ["Italian", "Mediterranean", "European"],
          address: "123 Food Street, Cuisine City",
          menu: [
            {
              id: 1,
              name: "Margherita Pizza",
              description: "Classic pizza with tomato sauce, mozzarella, and basil",
              price: 299,
              image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800",
              category: "Pizza"
            },
            {
              id: 2,
              name: "Pasta Carbonara",
              description: "Creamy pasta with bacon and parmesan",
              price: 349,
              image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800",
              category: "Pasta"
            },
            // Add more menu items as needed
          ]
        };
        
        setRestaurant(mockRestaurant);
        setLoading(false);
      } catch (err) {
        setError('Failed to load restaurant details');
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Restaurant not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                <span>{restaurant.rating}</span>
              </div>
              <div className="flex items-center">
                <ClockIcon className="h-5 w-5 mr-1" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <div className="flex items-center">
                <MapPinIcon className="h-5 w-5 mr-1" />
                <span>{restaurant.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurant.menu.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="relative h-48">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {item.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {item.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  ₹{item.price}
                </span>
                <button
                  onClick={() => addToCart(item)}
                  className="px-4 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantDetails; 