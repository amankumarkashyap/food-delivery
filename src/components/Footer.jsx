import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Foodie</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Discover the best food & drinks in your area. Order online for delivery or pickup.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="block"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
                  alt="Get it on Google Play"
                  className="h-10"
                />
              </motion.a>
              <motion.a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="block"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/2560px-Download_on_the_App_Store_Badge.svg.png"
                  alt="Download on the App Store"
                  className="h-10"
                />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-accent-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-accent-500">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 dark:text-gray-400 hover:text-accent-500">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-accent-500">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-accent-500">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-accent-500">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-600 dark:text-gray-400 hover:text-accent-500">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-gray-600 dark:text-gray-400 hover:text-accent-500">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-400">
                Email: support@foodie.com
              </li>
              <li className="text-gray-600 dark:text-gray-400">
                Phone: +1 (555) 123-4567
              </li>
              <li className="text-gray-600 dark:text-gray-400">
                Address: 123 Food Street, Cuisine City, FC 12345
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Foodie. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/sitemap" className="text-gray-600 dark:text-gray-400 hover:text-accent-500 text-sm">
                Sitemap
              </Link>
              <Link to="/accessibility" className="text-gray-600 dark:text-gray-400 hover:text-accent-500 text-sm">
                Accessibility
              </Link>
              <Link to="/security" className="text-gray-600 dark:text-gray-400 hover:text-accent-500 text-sm">
                Security
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 