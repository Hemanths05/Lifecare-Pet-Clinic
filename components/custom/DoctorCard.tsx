"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award } from 'lucide-react';
import Image from 'next/image';

interface DoctorCardProps {
  name: string;
  title: string;
  specialization: string;
  qualifications: string;
  bio: string;
  image: string;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({
  name,
  title,
  specialization,
  qualifications,
  bio,
  image,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <Card className="h-full glass hover:shadow-2xl transition-all duration-300 border-none overflow-hidden">
        <CardContent className="p-0 h-full flex flex-col">
          {/* Doctor Image */}
          <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-[#FF6B7A] to-[#e55566]">
            {/* Top Left Paw Group */}
            <motion.div
              className="absolute top-4 left-4 opacity-30"
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
                <circle cx="12" cy="8" r="2" />
                <circle cx="8" cy="12" r="1.5" />
                <circle cx="16" cy="12" r="1.5" />
                <ellipse cx="12" cy="16" rx="3" ry="4" />
              </svg>
            </motion.div>
            <motion.div
              className="absolute top-6 left-12 opacity-30"
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                <circle cx="12" cy="8" r="2" />
                <circle cx="8" cy="12" r="1.5" />
                <circle cx="16" cy="12" r="1.5" />
                <ellipse cx="12" cy="16" rx="3" ry="4" />
              </svg>
            </motion.div>
            <motion.div
              className="absolute top-12 left-6 opacity-30"
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                <circle cx="12" cy="8" r="2" />
                <circle cx="8" cy="12" r="1.5" />
                <circle cx="16" cy="12" r="1.5" />
                <ellipse cx="12" cy="16" rx="3" ry="4" />
              </svg>
            </motion.div>

            {/* Bottom Right Paw Group */}
            <motion.div
              className="absolute bottom-6 right-6 opacity-30"
              animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
                <circle cx="12" cy="8" r="2" />
                <circle cx="8" cy="12" r="1.5" />
                <circle cx="16" cy="12" r="1.5" />
                <ellipse cx="12" cy="16" rx="3" ry="4" />
              </svg>
            </motion.div>
            <motion.div
              className="absolute bottom-12 right-12 opacity-30"
              animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                <circle cx="12" cy="8" r="2" />
                <circle cx="8" cy="12" r="1.5" />
                <circle cx="16" cy="12" r="1.5" />
                <ellipse cx="12" cy="16" rx="3" ry="4" />
              </svg>
            </motion.div>
            <motion.div
              className="absolute bottom-8 right-16 opacity-30"
              animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                <circle cx="12" cy="8" r="2" />
                <circle cx="8" cy="12" r="1.5" />
                <circle cx="16" cy="12" r="1.5" />
                <ellipse cx="12" cy="16" rx="3" ry="4" />
              </svg>
            </motion.div>

            <div className="w-full h-full flex items-center justify-center relative z-10">
              <div className="w-48 h-48 rounded-full bg-white/20 backdrop-blur-sm p-2 flex items-center justify-center">
                <div className="w-full h-full rounded-full overflow-hidden bg-white">
                  <Image
                    src={image}
                    alt={name}
                    width={192}
                    height={192}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Doctor Info */}
          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{name}</h3>
            <p className="text-sm font-semibold text-[#FF6B7A] mb-2">{title}</p>

            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary" className="text-xs">
                {specialization}
              </Badge>
            </div>

            <p className="text-sm text-gray-600 mb-3 font-medium">{qualifications}</p>

            <div className="flex-1">
              <p className="text-sm text-gray-600 leading-relaxed">{bio}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
