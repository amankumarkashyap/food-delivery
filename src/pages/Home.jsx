import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MagnifyingGlassIcon as SearchIcon, MapPinIcon, ChevronRightIcon, StarIcon, ClockIcon } from '@heroicons/react/24/outline';
import RestaurantCard from '../components/RestaurantCard';
import DishCard from '../components/DishCard';

const collections = [
  {
    id: 1,
    title: 'Trending This Week',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500',
    count: '30 Places'
  },
  {
    id: 2,
    title: 'Best of Italian',
    image: 'https://images.unsplash.com/photo-1498579397066-22750a3cb424?auto=format&fit=crop&w=500',
    count: '22 Places'
  },
  {
    id: 3,
    title: 'Healthy Options',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500',
    count: '15 Places'
  },
  {
    id: 4,
    title: 'Sweet Cravings',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=500',
    count: '18 Places'
  }
];

const quickFilters = [
  'Fast Delivery', 'Top Rated', 'Pure Veg', 'Premium', 'Under 30 mins'
];

const cuisines = [
  {
    id: 1,
    name: 'North Indian',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    places: 156,
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
    ],
    restaurants: [
      {
        id: 1,
        name: 'Spice Garden',
        rating: 4.5,
        deliveryTime: '25-30 min',
        cuisine: 'North Indian',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: '₹200-400',
        isVeg: true
      },
      {
        id: 2,
        name: 'Royal Kitchen',
        rating: 4.3,
        deliveryTime: '30-35 min',
        cuisine: 'North Indian',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: '₹300-500',
        isVeg: false
      }
    ]
  },
  {
    id: 2,
    name: 'Chinese',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    places: 89,
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
    ],
    restaurants: [
      {
        id: 3,
        name: 'Wok & Roll',
        rating: 4.4,
        deliveryTime: '20-25 min',
        cuisine: 'Chinese',
        image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: '₹150-300',
        isVeg: false
      },
      {
        id: 4,
        name: 'Dragon Wok',
        rating: 4.2,
        deliveryTime: '25-30 min',
        cuisine: 'Chinese',
        image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: '₹200-400',
        isVeg: false
      }
    ]
  },
  {
    id: 3,
    name: 'Italian',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    places: 45,
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
    ],
    restaurants: [
      {
        id: 5,
        name: 'Pasta Paradise',
        rating: 4.6,
        deliveryTime: '30-35 min',
        cuisine: 'Italian',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: '₹250-450',
        isVeg: true
      },
      {
        id: 6,
        name: 'Bella Italia',
        rating: 4.5,
        deliveryTime: '25-30 min',
        cuisine: 'Italian',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: '₹300-500',
        isVeg: false
      }
    ]
  },
  {
    id: 4,
    name: 'South Indian',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    places: 78,
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
    ],
    restaurants: [
      {
        id: 7,
        name: 'Spice Garden',
        rating: 4.5,
        deliveryTime: '25-30 min',
        cuisine: 'South Indian',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: '₹200-400',
        isVeg: true
      },
      {
        id: 8,
        name: 'Royal Kitchen',
        rating: 4.3,
        deliveryTime: '30-35 min',
        cuisine: 'South Indian',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: '₹300-500',
        isVeg: false
      }
    ]
  },
  {
    id: 5,
    name: 'Mexican',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    places: 42,
    restaurants: [
      {
        id: 9,
        name: 'Taco Fiesta',
        rating: 4.7,
        deliveryTime: '20-25 min',
        cuisine: 'Mexican',
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: '₹250-450',
        isVeg: false
      },
      {
        id: 10,
        name: 'Burrito Bowl',
        rating: 4.5,
        deliveryTime: '25-30 min',
        cuisine: 'Mexican',
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: '₹200-400',
        isVeg: true
      }
    ]
  },
  {
    id: 6,
    name: 'Thai',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    places: 35,
    restaurants: [
      {
        id: 11,
        name: 'Thai Delight',
        rating: 4.6,
        deliveryTime: '30-35 min',
        cuisine: 'Thai',
        image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: '₹300-500',
        isVeg: false
      },
      {
        id: 12,
        name: 'Bangkok Bites',
        rating: 4.4,
        deliveryTime: '25-30 min',
        cuisine: 'Thai',
        image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: '₹250-450',
        isVeg: false
      }
    ]
  }
];

const featuredRestaurants = [
  {
    id: 1,
    name: 'The Spice Garden',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920',
    rating: 4.2,
    cuisines: ['North Indian', 'Mughlai'],
    priceForTwo: '₹600 for two',
    deliveryTime: 35,
    discount: '50% OFF up to ₹100',
    proExtraDiscount: 15
  },
  {
    id: 2,
    name: 'Pizza Paradise',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1920',
    rating: 4.5,
    cuisines: ['Italian', 'Pizzas'],
    priceForTwo: '₹400 for two',
    deliveryTime: 30,
    discount: '40% OFF up to ₹80'
  },
  {
    id: 3,
    name: 'Wok & Roll',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1920',
    rating: 4.1,
    cuisines: ['Chinese', 'Thai'],
    priceForTwo: '₹500 for two',
    deliveryTime: 40,
    proExtraDiscount: 10
  },
  {
    id: 4,
    name: 'Bowled Over',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1920',
    rating: 4.4,
    cuisines: ['Healthy Food', 'Salads'],
    priceForTwo: '₹350 for two',
    deliveryTime: 25,
    discount: '30% OFF up to ₹75'
  },
  {
    id: 5,
    name: 'Sweet Symphony',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1920',
    rating: 4.6,
    cuisines: ['Desserts', 'Beverages'],
    priceForTwo: '₹200 for two',
    deliveryTime: 20,
    proExtraDiscount: 20
  },
  {
    id: 6,
    name: 'Burger Barn',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1920',
    rating: 4.3,
    cuisines: ['American', 'Burgers'],
    priceForTwo: '₹300 for two',
    deliveryTime: 30,
    discount: '₹125 OFF above ₹249'
  },
  {
    id: 7,
    name: 'South Spice',
    image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=1920',
    rating: 4.0,
    cuisines: ['South Indian', 'Kerala'],
    priceForTwo: '₹400 for two',
    deliveryTime: 35
  },
  {
    id: 8,
    name: 'Sushi Station',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1920',
    rating: 4.7,
    cuisines: ['Japanese', 'Sushi'],
    priceForTwo: '₹800 for two',
    deliveryTime: 45,
    proExtraDiscount: 25
  }
];

const Home = () => {
  const [location, setLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute inset-0 w-full h-[120%]"
        >
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920"
            alt="Food Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900/40" />
        </motion.div>
        
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Discover the best food & drinks
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 flex flex-col md:flex-row gap-2"
          >
            <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 p-2">
              <MapPinIcon className="h-6 w-6 text-accent-500 mr-2" />
              <input
                type="text"
                placeholder="Enter your delivery location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-gray-900 dark:text-white"
              />
            </div>
            <div className="flex-1 flex items-center p-2">
              <SearchIcon className="h-6 w-6 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search for restaurant, cuisine or a dish"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-gray-900 dark:text-white"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4">
          {quickFilters.map((filter, index) => (
            <button
              key={index}
              className="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-accent-500 hover:text-accent-500 transition-colors"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Collections */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Collections
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Explore curated lists of top restaurants, cafes, pubs, and bars
            </p>
          </div>
          <Link
            to="/collections"
            className="text-accent-500 hover:text-accent-600 flex items-center"
          >
            All collections <ChevronRightIcon className="h-5 w-5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              to={`/collection/${collection.id}`}
              className="group relative rounded-lg overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-medium text-lg mb-1">
                    {collection.title}
                  </h3>
                  <p className="text-gray-200 text-sm">{collection.count}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Cuisines */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
          Popular Cuisines
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {cuisines.map((cuisine) => (
            <motion.div
              key={cuisine.id}
              whileHover={{ scale: 1.05 }}
              className="group text-center cursor-pointer"
            >
              <Link to={`/cuisine/${cuisine.id}/dishes`} className="block">
                <div className="w-24 h-24 mx-auto rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3 group-hover:bg-accent-500/10 transition-colors">
                  <span className="text-2xl">
                    {cuisine.name === 'North Indian' && '🍛'}
                    {cuisine.name === 'Chinese' && '🥢'}
                    {cuisine.name === 'Italian' && '🍝'}
                    {cuisine.name === 'South Indian' && '🍛'}
                    {cuisine.name === 'Mexican' && '🌮'}
                    {cuisine.name === 'Thai' && '🍜'}
                  </span>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                  {cuisine.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {cuisine.places} places
                </p>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {cuisine.name === 'North Indian' && 'Butter Chicken, Naan, Biryani'}
                  {cuisine.name === 'Chinese' && 'Dim Sum, Noodles, Fried Rice'}
                  {cuisine.name === 'Italian' && 'Pizza, Pasta, Risotto'}
                  {cuisine.name === 'South Indian' && 'Dosa, Idli, Sambar'}
                  {cuisine.name === 'Mexican' && 'Tacos, Burritos, Quesadillas'}
                  {cuisine.name === 'Thai' && 'Pad Thai, Tom Yum, Green Curry'}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Restaurants */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Featured Restaurants
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Handpicked restaurants for your dining pleasure
            </p>
          </div>
          <Link
            to="/restaurants"
            className="text-accent-500 hover:text-accent-600 flex items-center"
          >
            See all <ChevronRightIcon className="h-5 w-5 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home; 