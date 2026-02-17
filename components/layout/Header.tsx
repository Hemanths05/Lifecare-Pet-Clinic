"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import clinicInfo from '@/data/clinic-info.json';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Our Team', href: '/team' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'glass shadow-lg py-3' : 'bg-transparent py-5'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              className="relative w-12 h-12 flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/images/logo.svg"
                alt="Lifecare Pet Specialty Clinic Logo"
                width={48}
                height={48}
                className="object-contain"
                priority
              />
            </motion.div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-gray-900">
                {clinicInfo.name.split(' ').slice(0, 2).join(' ')}
              </h1>
              <p className="text-xs text-[#FF6B7A] font-semibold">
                {clinicInfo.tagline}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={`font-medium transition-colors duration-300 relative group ${
                      isActive ? 'text-[#FF6B7A]' : 'text-gray-700 hover:text-[#FF6B7A]'
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-[#FF6B7A] transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Call Button */}
          <motion.div
            className="hidden md:block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              asChild
              className="bg-[#FDB913] hover:bg-[#e5a40f] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-shake"
              style={{ animationIterationCount: 'infinite', animationDuration: '3s' }}
            >
              <a href={`tel:${clinicInfo.contact.phone}`} className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span className="font-semibold">Call Us</span>
              </a>
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-6 mt-8">
                <div className="mb-4 text-center">
                  <SheetTitle className="text-2xl font-bold text-gray-900 mb-2">
                    {clinicInfo.name.split(' ').slice(0, 2).join(' ')}
                  </SheetTitle>
                  <p className="text-sm text-[#FF6B7A] font-semibold">
                    {clinicInfo.tagline}
                  </p>
                </div>

                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-lg font-medium transition-colors duration-300 inline-block py-2 relative ${
                          isActive
                            ? 'text-[#FF6B7A] font-bold'
                            : 'text-gray-700 hover:text-[#FF6B7A]'
                        }`}
                      >
                        {link.name}
                        {isActive && (
                          <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#FF6B7A] rounded-full" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                <Button
                  asChild
                  className="bg-[#FDB913] hover:bg-[#e5a40f] text-white rounded-full shadow-lg mt-4"
                >
                  <a href={`tel:${clinicInfo.contact.phone}`} className="flex items-center gap-2 justify-center">
                    <Phone className="w-4 h-4" />
                    <span className="font-semibold">Call Us Now</span>
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
};
