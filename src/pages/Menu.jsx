import { useState } from 'react';
import { motion } from 'framer-motion';
import { StarIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';

const categories = [
  { id: 'all', name: 'All' },
  { id: 'indian', name: 'Indian' },
  { id: 'chinese', name: 'Chinese' },
  { id: 'italian', name: 'Italian' },
  { id: 'continental', name: 'Continental' },
];

const menuItems = [
  {
    id: 1,
    name: 'Butter Chicken',
    description: 'Creamy tomato curry with tender chicken and aromatic spices',
    price: 15.99,
    category: 'indian',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Kung Pao Chicken',
    description: 'Spicy stir-fried chicken with peanuts and vegetables',
    price: 13.99,
    category: 'chinese',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    rating: 4.6,
  },
  {
    id: 3,
    name: 'Margherita Pizza',
    description: 'Fresh tomatoes, mozzarella, basil, and olive oil',
    price: 14.99,
    category: 'italian',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Beef Wellington',
    description: 'Tender beef fillet wrapped in pastry with mushroom duxelles',
    price: 29.99,
    category: 'continental',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    rating: 4.9,
  },
  {
    id: 5,
    name: 'Dim Sum Platter',
    description: 'Assorted steamed dumplings with various fillings',
    price: 16.99,
    category: 'chinese',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    rating: 4.8,
  },
  {
    id: 6,
    name: 'Biryani',
    description: 'Fragrant basmati rice with spiced meat and saffron',
    price: 17.99,
    category: 'indian',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    rating: 4.9,
  },
  {
    id: 7,
    name: 'Pasta Carbonara',
    description: 'Classic Roman pasta with eggs, pecorino, and guanciale',
    price: 15.99,
    category: 'italian',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
    rating: 4.7,
  },
  {
    id: 8,
    name: 'Coq au Vin',
    description: 'French braised chicken in wine with mushrooms',
    price: 24.99,
    category: 'continental',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80',
    rating: 4.8,
  },
];

const Menu = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredItems = selectedCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Categories */}
        <div className="flex space-x-4 mb-8 overflow-x-auto pb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === category.id
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">{item.name}</h3>
                  <div className="flex items-center">
                    <StarIcon className="w-5 h-5 text-yellow-500" />
                    <span className="ml-1 text-gray-600 dark:text-gray-300">{item.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-medium text-gray-900 dark:text-white">${item.price}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <ShoppingCartIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu; 