import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';

const cuisines = [
  {
    id: 1,
    name: 'North Indian',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    dishes: [
      {
        id: 1,
        name: 'Butter Chicken',
        rating: 4.8,
        cookingTime: '25-30 min',
        price: '₹350',
        image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        description: 'Tender chicken in a rich, creamy tomato-based curry',
        isVeg: false
      },
      {
        id: 2,
        name: 'Naan',
        rating: 4.5,
        cookingTime: '10-15 min',
        price: '₹50',
        image: 'https://images.unsplash.com/photo-1601050592132-0d033d21d9c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        description: 'Soft, fluffy flatbread baked in tandoor',
        isVeg: true
      },
      {
        id: 3,
        name: 'Biryani',
        rating: 4.7,
        cookingTime: '35-40 min',
        price: '₹400',
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        description: 'Fragrant rice dish with spices and meat',
        isVeg: false
      }
    ]
  },
  {
    id: 2,
    name: 'Chinese',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    dishes: [
      {
        id: 4,
        name: 'Dim Sum',
        rating: 4.6,
        cookingTime: '15-20 min',
        price: '₹250',
        image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        description: 'Steamed dumplings with various fillings',
        isVeg: false
      },
      {
        id: 5,
        name: 'Hakka Noodles',
        rating: 4.4,
        cookingTime: '20-25 min',
        price: '₹200',
        image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        description: 'Stir-fried noodles with vegetables and sauce',
        isVeg: true
      },
      {
        id: 6,
        name: 'Fried Rice',
        rating: 4.3,
        cookingTime: '15-20 min',
        price: '₹180',
        image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        description: 'Classic Chinese rice dish with vegetables',
        isVeg: true
      }
    ]
  },
  {
    id: 3,
    name: 'Italian',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    dishes: [
      {
        id: 7,
        name: 'Margherita Pizza',
        rating: 4.7,
        cookingTime: '20-25 min',
        price: '₹300',
        image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        description: 'Classic pizza with tomato sauce and mozzarella',
        isVeg: true
      },
      {
        id: 8,
        name: 'Spaghetti Carbonara',
        rating: 4.6,
        cookingTime: '25-30 min',
        price: '₹350',
        image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        description: 'Creamy pasta with bacon and parmesan',
        isVeg: false
      },
      {
        id: 9,
        name: 'Risotto',
        rating: 4.5,
        cookingTime: '30-35 min',
        price: '₹400',
        image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        description: 'Creamy Italian rice dish with mushrooms',
        isVeg: true
      }
    ]
  },
  {
    id: 4,
    name: 'South Indian',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    dishes: [
      {
        id: 10,
        name: 'Masala Dosa',
        rating: 4.8,
        cookingTime: '15-20 min',
        price: '₹150',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        description: 'Crispy crepe with spiced potato filling',
        isVeg: true
      },
      {
        id: 11,
        name: 'Idli Sambar',
        rating: 4.6,
        cookingTime: '10-15 min',
        price: '₹120',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        description: 'Steamed rice cakes with lentil soup',
        isVeg: true
      },
      {
        id: 12,
        name: 'Vada Sambar',
        rating: 4.5,
        cookingTime: '15-20 min',
        price: '₹130',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        description: 'Crispy lentil fritters with lentil soup',
        isVeg: true
      }
    ]
  },
  {
    id: 5,
    name: 'Mexican',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    dishes: [
      {
        id: 13,
        name: 'Tacos',
        rating: 4.7,
        cookingTime: '15-20 min',
        price: '₹250',
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        description: 'Crispy corn tortillas with seasoned meat and fresh toppings',
        isVeg: false
      },
      {
        id: 14,
        name: 'Burrito Bowl',
        rating: 4.6,
        cookingTime: '20-25 min',
        price: '₹300',
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        description: 'Rice bowl with beans, meat, and fresh vegetables',
        isVeg: true
      },
      {
        id: 15,
        name: 'Quesadilla',
        rating: 4.5,
        cookingTime: '15-20 min',
        price: '₹280',
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        description: 'Grilled tortilla with melted cheese and fillings',
        isVeg: true
      }
    ]
  },
  {
    id: 6,
    name: 'Thai',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    dishes: [
      {
        id: 16,
        name: 'Pad Thai',
        rating: 4.8,
        cookingTime: '20-25 min',
        price: '₹350',
        image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        description: 'Stir-fried rice noodles with eggs, tofu, and peanuts',
        isVeg: true
      },
      {
        id: 17,
        name: 'Tom Yum Soup',
        rating: 4.7,
        cookingTime: '15-20 min',
        price: '₹280',
        image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        description: 'Spicy and sour soup with mushrooms and herbs',
        isVeg: true
      },
      {
        id: 18,
        name: 'Green Curry',
        rating: 4.6,
        cookingTime: '25-30 min',
        price: '₹320',
        image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        description: 'Creamy curry with vegetables and choice of protein',
        isVeg: false
      }
    ]
  }
];

const CuisineDishes = () => {
  const { cuisineId } = useParams();
  const { addToCart } = useCart();

  // Find the cuisine based on the ID
  const cuisine = cuisines.find(c => c.id === parseInt(cuisineId));

  if (!cuisine) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Cuisine not found
        </h1>
      </div>
    );
  }

  const handleAddToCart = (dish) => {
    addToCart({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      image: dish.image,
      quantity: 1
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-b from-gray-900/70 to-gray-900/40">
        <img
          src={cuisine.image}
          alt={cuisine.name}
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900/40" />
        
        <div className="container mx-auto px-4 h-full flex flex-col justify-center">
          <Link
            to="/"
            className="inline-flex items-center text-white mb-4 hover:text-accent-400 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-white">
            {cuisine.name} Dishes
          </h1>
        </div>
      </div>

      {/* Dishes Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cuisine.dishes.map((dish) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover"
                />
                {dish.isVeg && (
                  <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    Veg
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {dish.name}
                  </h3>
                  <span className="text-accent-500 font-medium">
                    {dish.price}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {dish.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center mr-4">
                      ⭐ {dish.rating}
                    </span>
                    <span className="flex items-center">
                      ⏱️ {dish.cookingTime}
                    </span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(dish)}
                    className="bg-accent-500 text-white px-4 py-2 rounded-lg hover:bg-accent-600 transition-colors"
                  >
                    Add to Cart
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

export default CuisineDishes; 