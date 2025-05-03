import { motion } from 'framer-motion';
import { StarIcon, ClockIcon } from '@heroicons/react/24/outline';

const DishCard = ({ dish }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
    >
      <div className="relative h-48">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover"
        />
        {dish.isVeg && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Pure Veg
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {dish.name}
          </h3>
          <div className="flex items-center bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded">
            <StarIcon className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">{dish.rating}</span>
          </div>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-2">
          <ClockIcon className="h-4 w-4 mr-1" />
          <span>{dish.cookingTime}</span>
          <span className="mx-2">•</span>
          <span>{dish.price}</span>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {dish.description}
        </p>
      </div>
    </motion.div>
  );
};

export default DishCard; 