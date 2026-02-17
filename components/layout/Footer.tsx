"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { FloatingElements } from '@/components/custom/FloatingElements';
import clinicInfo from '@/data/clinic-info.json';
import services from '@/data/services.json';

export const Footer: React.FC = () => {
  const topServices = services.slice(0, 8);

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* Paw print pattern background */}
      <FloatingElements count={20} className="absolute inset-0 opacity-5">
        {() => (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
            <circle cx="12" cy="8" r="2" />
            <circle cx="8" cy="12" r="1.5" />
            <circle cx="16" cy="12" r="1.5" />
            <ellipse cx="12" cy="16" rx="3" ry="4" />
          </svg>
        )}
      </FloatingElements>

      {/* Main Footer Content */}
      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src="/images/logo.svg"
                  alt="Lifecare Pet Specialty Clinic Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold">
                  {clinicInfo.name.split(' ').slice(0, 2).join(' ')}
                </h3>
                <p className="text-sm text-[#FDB913]">{clinicInfo.tagline}</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              {clinicInfo.mission}
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: clinicInfo.social.facebook },
                { icon: Instagram, href: clinicInfo.social.instagram },
                { icon: Twitter, href: clinicInfo.social.twitter },
                { icon: Youtube, href: clinicInfo.social.youtube },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#FF6B7A] flex items-center justify-center transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Services', href: '/services' },
                { name: 'Our Team', href: '/team' },
                { name: 'Gallery', href: '/gallery' },
                { name: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#FF6B7A] transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-[#FF6B7A] group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold mb-6 text-white">Our Services</h3>
            <ul className="space-y-3">
              {topServices.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.id}`}
                    className="text-gray-400 hover:text-[#FF6B7A] transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-[#FF6B7A] group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-bold mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-[#FF6B7A] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  {clinicInfo.address.street}, {clinicInfo.address.area},{' '}
                  {clinicInfo.address.city} {clinicInfo.address.pincode}
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-5 h-5 text-[#FF6B7A] flex-shrink-0" />
                <a
                  href={`tel:${clinicInfo.contact.phone}`}
                  className="text-gray-400 hover:text-[#FF6B7A] transition-colors"
                >
                  {clinicInfo.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-5 h-5 text-[#FF6B7A] flex-shrink-0" />
                <a
                  href={`mailto:${clinicInfo.contact.email}`}
                  className="text-gray-400 hover:text-[#FF6B7A] transition-colors break-all"
                >
                  {clinicInfo.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Clock className="w-5 h-5 text-[#FF6B7A] flex-shrink-0 mt-0.5" />
                <div className="text-gray-400">
                  <p>{clinicInfo.hours.weekdays}</p>
                  <p className="text-[#7B4397] font-semibold mt-1">
                    {clinicInfo.hours.emergency}
                  </p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} {clinicInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
