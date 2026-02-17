"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import clinicInfo from '@/data/clinic-info.json';

export const CreativeMapSection: React.FC = () => {
  const [isMapHovered, setIsMapHovered] = useState(false);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');

  // Map URLs with wider zoom level (13.5 shows more surrounding area)
  const mapUrls = {
    roadmap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.856781234567!2d77.20869731480!3d10.849003292294567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.5!3m3!1m2!1s0x9dd49f0e129e005%3A0xd3eb7577ffa80470!2sLifecare%20Pet%20Speciality%20Clinic!5e0!3m2!1sen!2sin!4v1707382000000",
    satellite: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.856781234567!2d77.20869731480!3d10.849003292294567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.5!3m3!1m2!1s0x9dd49f0e129e005%3A0xd3eb7577ffa80470!2sLifecare%20Pet%20Speciality%20Clinic!5e1!3m2!1sen!2sin!4v1707382000000"
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      onHoverStart={() => setIsMapHovered(true)}
      onHoverEnd={() => setIsMapHovered(false)}
    >
      <div className="relative">
        {/* Map/Satellite Toggle */}
        <div className="absolute top-4 right-4 z-20 bg-white rounded-full shadow-lg overflow-hidden border-2 border-[#FF6B7A]">
          <div className="flex">
            <button
              onClick={() => setMapType('roadmap')}
              className={`px-4 py-2 text-sm font-semibold transition-all ${
                mapType === 'roadmap'
                  ? 'bg-[#FF6B7A] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Map
            </button>
            <button
              onClick={() => setMapType('satellite')}
              className={`px-4 py-2 text-sm font-semibold transition-all ${
                mapType === 'satellite'
                  ? 'bg-[#FF6B7A] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Satellite
            </button>
          </div>
        </div>

        {/* Map Container with Simple Border */}
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-[#FF6B7A]">
            <div className="relative h-[650px] bg-gradient-to-br from-[#FFE5E8] to-[#FFF4D6]">
            {/* Actual Google Map iframe */}
            <iframe
              key={mapType}
              src={mapUrls[mapType]}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(20%) hue-rotate(10deg)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lifecare Pet Specialty Clinic Location"
            />

            {/* Creative Overlay - Animated Paw Marker */}
            <a
              href={clinicInfo.location.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
              aria-label="Open clinic location in Google Maps"
            >
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  scale: isMapHovered ? 1.3 : 1,
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Custom Paw Location Marker */}
                <div className="relative">
                  {/* Pulse Rings */}
                  <motion.div
                    className="absolute inset-0 w-24 h-24 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-full h-full rounded-full bg-[#FF6B7A]" />
                  </motion.div>

                  {/* Paw Marker */}
                  <svg width="80" height="80" viewBox="0 0 80 80" className="drop-shadow-2xl">
                    {/* Main Paw Pad */}
                    <ellipse cx="40" cy="50" rx="18" ry="22" fill="#FF6B7A" stroke="white" strokeWidth="3" />
                    {/* Top Left Toe */}
                    <circle cx="25" cy="30" r="8" fill="#FF6B7A" stroke="white" strokeWidth="3" />
                    {/* Top Middle Toe */}
                    <circle cx="40" cy="22" r="9" fill="#FF6B7A" stroke="white" strokeWidth="3" />
                    {/* Top Right Toe */}
                    <circle cx="55" cy="30" r="8" fill="#FF6B7A" stroke="white" strokeWidth="3" />
                    {/* Bottom Left Toe */}
                    <circle cx="30" cy="42" r="7" fill="#FF6B7A" stroke="white" strokeWidth="3" />
                    {/* Bottom Right Toe */}
                    <circle cx="50" cy="42" r="7" fill="#FF6B7A" stroke="white" strokeWidth="3" />

                    {/* Shine effect */}
                    <ellipse cx="35" cy="45" rx="6" ry="8" fill="white" opacity="0.3" />
                  </svg>

                  {/* Location Label */}
                  <motion.div
                    className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap"
                    animate={{ opacity: isMapHovered ? 1 : 0 }}
                  >
                    <div className="bg-white px-4 py-2 rounded-full shadow-xl border-2 border-[#FF6B7A]">
                      <p className="text-sm font-bold text-[#FF6B7A]">We're Here!</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </a>

            {/* Decorative Pet Silhouettes Around Map */}
            <motion.div
              className="absolute top-4 left-4"
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <svg width="60" height="60" viewBox="0 0 100 100" className="opacity-20">
                <circle cx="50" cy="35" r="18" fill="#FF6B7A" />
                <ellipse cx="35" cy="28" rx="8" ry="15" fill="#FF6B7A" />
                <ellipse cx="65" cy="28" rx="8" ry="15" fill="#FF6B7A" />
                <ellipse cx="50" cy="60" rx="25" ry="20" fill="#FF6B7A" />
              </svg>
            </motion.div>

            <motion.div
              className="absolute bottom-4 right-4"
              animate={{ rotate: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            >
              <svg width="60" height="60" viewBox="0 0 100 100" className="opacity-20">
                <circle cx="50" cy="38" r="16" fill="#FDB913" />
                <path d="M 35 30 L 32 15 L 42 28 Z" fill="#FDB913" />
                <path d="M 65 30 L 68 15 L 58 28 Z" fill="#FDB913" />
                <ellipse cx="50" cy="60" rx="22" ry="18" fill="#FDB913" />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Decorative Paw Prints Trail */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              bottom: `${-40 - i * 25}px`,
              right: `${20 + i * 30}px`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ delay: i * 0.2 }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="#7B4397">
              <circle cx="12" cy="8" r="2" />
              <circle cx="8" cy="12" r="1.5" />
              <circle cx="16" cy="12" r="1.5" />
              <ellipse cx="12" cy="16" rx="3" ry="4" />
            </svg>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
