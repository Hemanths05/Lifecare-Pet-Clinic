"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { X, Maximize2 } from 'lucide-react';
import Image from 'next/image';

// Gallery image data - You can replace these with real images later
const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80',
    alt: 'Happy Golden Retriever',
    category: 'dogs',
    size: 'large',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80',
    alt: 'Cute Cat',
    category: 'cats',
    size: 'medium',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80',
    alt: 'Veterinary Checkup',
    category: 'clinic',
    size: 'medium',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80',
    alt: 'Playful Puppy',
    category: 'dogs',
    size: 'medium',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=800&q=80',
    alt: 'Tabby Cat',
    category: 'cats',
    size: 'large',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=800&q=80',
    alt: 'German Shepherd',
    category: 'dogs',
    size: 'medium',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1581888227599-779811939961?w=800&q=80',
    alt: 'Veterinary Surgery',
    category: 'clinic',
    size: 'medium',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1571988840298-3b5301d5109b?w=800&q=80',
    alt: 'British Shorthair Cat',
    category: 'cats',
    size: 'medium',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80',
    alt: 'Husky',
    category: 'dogs',
    size: 'large',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1559190394-df5a28aab5c5?w=800&q=80',
    alt: 'Medical Equipment',
    category: 'clinic',
    size: 'medium',
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80',
    alt: 'Playful Kitten',
    category: 'cats',
    size: 'medium',
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&q=80',
    alt: 'Beagle',
    category: 'dogs',
    size: 'medium',
  },
  {
    id: 13,
    src: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&q=80',
    alt: 'Veterinary Care',
    category: 'clinic',
    size: 'large',
  },
  {
    id: 14,
    src: 'https://images.unsplash.com/photo-1494256997604-768d1f608cac?w=800&q=80',
    alt: 'Orange Tabby Cat',
    category: 'cats',
    size: 'medium',
  },
  {
    id: 15,
    src: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=800&q=80',
    alt: 'Labrador Retriever',
    category: 'dogs',
    size: 'medium',
  },
  {
    id: 16,
    src: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800&q=80',
    alt: 'White Cat',
    category: 'cats',
    size: 'medium',
  },
];

type Category = 'all' | 'dogs' | 'cats' | 'clinic';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const categories = [
    { value: 'all' as Category, label: 'All Memories', icon: '🐾' },
    { value: 'dogs' as Category, label: 'Dogs', icon: '🐕' },
    { value: 'cats' as Category, label: 'Cats', icon: '🐱' },
    { value: 'clinic' as Category, label: 'Clinic', icon: '🏥' },
  ];

  const filteredImages = selectedCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  // Get size classes for masonry layout
  const getSizeClass = (size: string) => {
    switch (size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2 h-[450px]';
      case 'medium':
        return 'md:col-span-1 md:row-span-1 h-[300px]';
      default:
        return 'md:col-span-1 md:row-span-1 h-[300px]';
    }
  };

  // Deterministic pseudo-random function to avoid hydration mismatch
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section with Decorative Elements */}
      <section className="relative py-20 bg-gradient-to-br from-[#FFE5E8] via-white to-[#FFF4D6] overflow-hidden">
        {/* Decorative Paw Prints Background */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${seededRandom(i * 2) * 100}%`,
                top: `${seededRandom(i * 3) * 100}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10 + seededRandom(i * 5) * 5,
                repeat: Infinity,
                delay: seededRandom(i * 7) * 5,
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="#FF6B7A">
                <circle cx="12" cy="8" r="2" />
                <circle cx="8" cy="12" r="1.5" />
                <circle cx="16" cy="12" r="1.5" />
                <ellipse cx="12" cy="16" rx="3" ry="4" />
              </svg>
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="bg-[#FF6B7A] text-white mb-8 px-6 py-2">Our Gallery</Badge>

            {/* Handwritten Style Heading */}
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
              style={{
                fontFamily: 'cursive',
                background: 'linear-gradient(135deg, #FF6B7A 0%, #FDB913 50%, #7B4397 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Our Best Memories 💕
            </motion.h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              Precious moments with our furry friends and the amazing work we do every day
            </p>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category, index) => (
                <motion.button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`relative px-6 py-3 rounded-full font-semibold transition-all ${
                    selectedCategory === category.value
                      ? 'bg-gradient-to-r from-[#FF6B7A] to-[#e55566] text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.label}

                  {/* Active indicator */}
                  {selectedCategory === category.value && (
                    <motion.div
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#FF6B7A] rounded-full"
                      layoutId="activeCategory"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-20 left-10"
          animate={{ rotate: [0, 10, -10, 0], y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <svg width="80" height="80" viewBox="0 0 100 100" className="opacity-20">
            <circle cx="50" cy="35" r="18" fill="#FF6B7A" />
            <ellipse cx="35" cy="28" rx="8" ry="15" fill="#FF6B7A" />
            <ellipse cx="65" cy="28" rx="8" ry="15" fill="#FF6B7A" />
            <ellipse cx="50" cy="60" rx="25" ry="20" fill="#FF6B7A" />
          </svg>
        </motion.div>

        <motion.div
          className="absolute bottom-20 right-10"
          animate={{ rotate: [0, -10, 10, 0], y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        >
          <svg width="80" height="80" viewBox="0 0 100 100" className="opacity-20">
            <circle cx="50" cy="38" r="16" fill="#FDB913" />
            <path d="M 35 30 L 32 15 L 42 28 Z" fill="#FDB913" />
            <path d="M 65 30 L 68 15 L 58 28 Z" fill="#FDB913" />
            <ellipse cx="50" cy="60" rx="22" ry="18" fill="#FDB913" />
          </svg>
        </motion.div>
      </section>

      {/* Gallery Grid Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  className={`relative group cursor-pointer overflow-hidden rounded-3xl ${getSizeClass(image.size)}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedImage(image)}
                >
                  {/* Image */}
                  <div className="relative w-full h-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Hover Overlay with Gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    {/* Expand Icon */}
                    <div className="absolute bottom-4 right-4">
                      <motion.div
                        className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 90 }}
                      >
                        <Maximize2 className="w-5 h-5 text-[#FF6B7A]" />
                      </motion.div>
                    </div>

                    {/* Image Title */}
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-sm font-semibold">{image.alt}</p>
                    </div>

                    {/* Decorative Paw Print on Hover */}
                    <motion.div
                      className="absolute top-4 right-4"
                      initial={{ scale: 0, rotate: -45 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="white" opacity="0.7">
                        <circle cx="12" cy="8" r="2" />
                        <circle cx="8" cy="12" r="1.5" />
                        <circle cx="16" cy="12" r="1.5" />
                        <ellipse cx="12" cy="16" rx="3" ry="4" />
                      </svg>
                    </motion.div>
                  </motion.div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-white/90 text-gray-800 backdrop-blur-sm border-none">
                      {image.category === 'dogs' && '🐕 Dogs'}
                      {image.category === 'cats' && '🐱 Cats'}
                      {image.category === 'clinic' && '🏥 Clinic'}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <motion.button
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>

            {/* Image */}
            <motion.div
              className="relative max-w-5xl max-h-[90vh] w-full"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={1200}
                  height={800}
                  className="object-contain w-full h-full rounded-2xl"
                />
              </div>

              {/* Image Info */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-white mb-2">{selectedImage.alt}</h3>
                <Badge className="bg-[#FF6B7A] text-white">
                  {selectedImage.category === 'dogs' && '🐕 Dogs'}
                  {selectedImage.category === 'cats' && '🐱 Cats'}
                  {selectedImage.category === 'clinic' && '🏥 Clinic'}
                </Badge>
              </motion.div>

              {/* Decorative Paw Prints */}
              <motion.div
                className="absolute -top-4 -right-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <svg width="60" height="60" viewBox="0 0 24 24" fill="#FF6B7A" opacity="0.3">
                  <circle cx="12" cy="8" r="2" />
                  <circle cx="8" cy="12" r="1.5" />
                  <circle cx="16" cy="12" r="1.5" />
                  <ellipse cx="12" cy="16" rx="3" ry="4" />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
