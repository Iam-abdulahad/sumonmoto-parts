import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, ShieldCheck, Wrench, Truck } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary-900 text-neutral-300 pt-16 pb-8 border-t-4 border-accent-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-primary-800 mb-12">
          <div className="flex items-center space-x-4">
            <div className="bg-primary-800 p-3 rounded-full text-accent-500">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-lg">OEM Warranty</h4>
              <p className="text-sm text-neutral-400">Guaranteed genuine parts</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-primary-800 p-3 rounded-full text-accent-500">
              <Wrench className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-lg">Expert Support</h4>
              <p className="text-sm text-neutral-400">Mechanics ready to help</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-primary-800 p-3 rounded-full text-accent-500">
              <Truck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-lg">Fast Delivery</h4>
              <p className="text-sm text-neutral-400">Next day shipping available</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div>
            <Link to="/" className="text-2xl font-bold font-heading text-white tracking-tight mb-6 inline-block">
              SumonMoto<span className="text-accent-500">.</span>
            </Link>
            <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
              Premium motorcycle parts and accessories. We stock OEM and high-performance aftermarket parts for all major brands. Built by riders, for riders.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-accent-500 transition-colors"><FaFacebook className="w-5 h-5" /></a>
              <a href="#" className="text-neutral-400 hover:text-accent-500 transition-colors"><FaTwitter className="w-5 h-5" /></a>
              <a href="#" className="text-neutral-400 hover:text-accent-500 transition-colors"><FaInstagram className="w-5 h-5" /></a>
              <a href="#" className="text-neutral-400 hover:text-accent-500 transition-colors"><FaYoutube className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Categories Col */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Categories</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/products?category=Engine" className="hover:text-accent-500 transition-colors">Engine Components</Link></li>
              <li><Link to="/products?category=Brakes" className="hover:text-accent-500 transition-colors">Brakes & Rotors</Link></li>
              <li><Link to="/products?category=Suspension" className="hover:text-accent-500 transition-colors">Suspension & Steering</Link></li>
              <li><Link to="/products?category=Electrical" className="hover:text-accent-500 transition-colors">Electrical & Lighting</Link></li>
              <li><Link to="/products?category=Tires" className="hover:text-accent-500 transition-colors">Tires & Wheels</Link></li>
              <li><Link to="/products?category=Body" className="hover:text-accent-500 transition-colors">Body & Fairings</Link></li>
            </ul>
          </div>

          {/* Customer Service Col */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Customer Service</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/profile" className="hover:text-accent-500 transition-colors">My Account</Link></li>
              <li><Link to="/orders" className="hover:text-accent-500 transition-colors">Track Order</Link></li>
              <li><Link to="/about" className="hover:text-accent-500 transition-colors">About Us</Link></li>
              <li><Link to="/faq" className="hover:text-accent-500 transition-colors">FAQ</Link></li>
              <li><Link to="/returns" className="hover:text-accent-500 transition-colors">Returns Policy</Link></li>
              <li><Link to="/warranty" className="hover:text-accent-500 transition-colors">Warranty Info</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-accent-500 mr-3 flex-shrink-0 mt-0.5" />
                <span>123 Rider Avenue<br />Moto District, NY 10001</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-accent-500 mr-3 flex-shrink-0" />
                <span>+1 (800) 123-MOTO</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-accent-500 mr-3 flex-shrink-0" />
                <span>support@sumonmoto.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-800 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500">
          <p>&copy; {new Date().getFullYear()} SumonMoto Parts. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
