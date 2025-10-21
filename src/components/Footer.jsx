import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Footer = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    const footerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <motion.footer
            ref={ref}
            variants={footerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="bg-gray-900 dark:bg-gray-950 text-gray-300"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="md:col-span-2 lg:col-span-1">
                        <div className="flex items-center space-x-3 mb-4">
                            <svg className="w-10 h-10 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a2.25 2.25 0 01-2.25 2.25H5.25a2.25 2.25 0 01-2.25-2.25v-8.25M12 4.875A2.625 2.625 0 1012 10.125 2.625 2.625 0 0012 4.875z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.125V19.5m-8.25-9.375h16.5" />
                            </svg>
                            <span className="text-2xl font-bold text-white">SharePlate</span>
                        </div>
                        <p className="text-gray-400">
                            Connecting communities by reducing food waste. Our mission is to make it easy for neighbors to share surplus food.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Home</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Available Foods</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">How It Works</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Login / Sign Up</a></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">FAQ</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
                        <p className="mb-4 text-gray-400">Join our newsletter for updates and community stories.</p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full px-4 py-2 rounded-l-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-emerald-600 text-white font-semibold rounded-r-lg hover:bg-emerald-700 transition-colors"
                            >
                                →
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} SharePlate. All Rights Reserved.
                    </p>
                    <div className="flex space-x-4 mt-4 sm:mt-0">
                        <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-emerald-400 transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                        </a>
                        <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-emerald-400 transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                        </a>
                        <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-emerald-400 transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.412.06 3.808s-.012 2.741-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.412.06-3.808.06s-2.741-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.067-.06-1.412-.06-3.808s.012-2.741.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.784 2.013 10.138 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zm5.25-9.75a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" clipRule="evenodd" /></svg>
                        </a>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;
