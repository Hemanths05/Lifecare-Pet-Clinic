"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { PawButton, CreativeServiceCard, CreativeTestimonialCard, AnimatedPets, BoneButton } from '@/components/custom';
import { FloatingElements } from '@/components/custom/FloatingElements';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Clock, Award, Heart, Shield, Phone, Activity, Dog, Cat, Bird, Footprints, ChevronLeft, ChevronRight } from 'lucide-react';

const heroSlides = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/7469218/pexels-photo-7469218.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Veterinarian examining a dog with care",
    label: "Expert Veterinary Care",
    sublabel: "Trusted by thousands of pet parents",
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/6235233/pexels-photo-6235233.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Happy golden retriever at the vet",
    label: "Happy, Healthy Pets",
    sublabel: "Comprehensive wellness checkups",
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/6235031/pexels-photo-6235031.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Vet giving a cat a checkup",
    label: "Compassionate Cat Care",
    sublabel: "Specialized feline medicine",
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/7148390/pexels-photo-7148390.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Veterinarian with a puppy",
    label: "24/7 Emergency Service",
    sublabel: "Always here when you need us",
  },
];
import clinicInfo from '@/data/clinic-info.json';
import services from '@/data/services.json';
import testimonials from '@/data/testimonials.json';

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (index: number) => {
    setCurrent((index + heroSlides.length) % heroSlides.length);
  };

  useEffect(() => {
    if (isHovered) return;
    timerRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 3500);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, isHovered]);

  return (
    <motion.div
      className="relative order-2 lg:order-2"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Carousel Frame */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/60 aspect-square bg-gray-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={heroSlides[current].id}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <Image
                src={heroSlides[current].src}
                alt={heroSlides[current].alt}
                fill
                className="object-cover"
                priority={current === 0}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </AnimatePresence>

          {/* Slide Label */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`label-${heroSlides[current].id}`}
              className="absolute bottom-5 left-5 right-5 z-10"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-white font-bold text-lg drop-shadow-lg leading-tight">
                {heroSlides[current].label}
              </p>
              <p className="text-white/80 text-sm drop-shadow-md">
                {heroSlides[current].sublabel}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next Buttons */}
          <button
            onClick={() => goTo(current - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-gray-800" />
          </button>
          <button
            onClick={() => goTo(current + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-gray-800" />
          </button>

          {/* Dot Indicators */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 h-2.5 bg-white"
                    : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Decorative Elements Around Carousel */}
        <motion.div
          className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-gradient-to-br from-[#FF6B7A] to-[#e55566] flex items-center justify-center shadow-xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Heart className="w-10 h-10 text-white" />
        </motion.div>

        <motion.div
          className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-gradient-to-br from-[#FDB913] to-[#e5a40f] flex items-center justify-center shadow-xl"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <Award className="w-8 h-8 text-white" />
        </motion.div>

        {/* Slide counter badge */}
        <div className="absolute -bottom-4 right-8 bg-white rounded-full px-4 py-1 shadow-lg border-2 border-[#FF6B7A]/30 text-sm font-semibold text-gray-700">
          {current + 1} / {heroSlides.length}
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const featuredServices = services.slice(0, 6);

  return (
     <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-x-hidden bg-gradient-to-br from-[#F5F7FA] via-white to-[#F5F7FA] pt-20">
        <AnimatedPets />

        {/* Curved Background Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#FF6B7A]/10 to-[#FDB913]/10 rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#7B4397]/10 to-[#FF6B7A]/10 rounded-full blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Floating Pet Image Frames - Left Side Only */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Top Left Pet - Made Smaller */}
          <motion.div
            className="absolute top-36 left-12 w-24 h-24 rounded-full bg-white shadow-2xl p-2 border-4 border-[#FDB913]"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FF6B7A]/20 to-[#FDB913]/20 flex items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="#FF6B7A">
                <circle cx="12" cy="8" r="2" />
                <circle cx="8" cy="12" r="1.5" />
                <circle cx="16" cy="12" r="1.5" />
                <ellipse cx="12" cy="16" rx="3" ry="4" />
              </svg>
            </div>
          </motion.div>

          {/* Middle Left Small */}
          <motion.div
            className="absolute top-1/2 left-8 w-20 h-20 rounded-full bg-white shadow-2xl p-2 border-4 border-[#FF6B7A]"
            animate={{
              y: [0, -10, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8,
            }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#7B4397]/20 to-[#FDB913]/20 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#7B4397">
                <circle cx="12" cy="8" r="2" />
                <circle cx="8" cy="12" r="1.5" />
                <circle cx="16" cy="12" r="1.5" />
                <ellipse cx="12" cy="16" rx="3" ry="4" />
              </svg>
            </div>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Content */}
              <div className="text-center lg:text-left order-1 lg:order-1">
                {/* Trust Indicators */}
                <motion.div
                  className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
              {[
                { icon: Clock, text: '24/7 Emergency' },
                { icon: Award, text: `${clinicInfo.stats.yearsOfExperience}+ Years Experience` },
                { icon: Shield, text: 'Modern Facilities' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Badge
                    variant="secondary"
                    className="glass text-sm px-5 py-2.5 font-semibold shadow-lg border-2 border-white/50"
                  >
                    <item.icon className="w-4 h-4 mr-2 text-[#FF6B7A]" />
                    {item.text}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>

                {/* Main Headline with Enhanced Styling */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative mb-8"
                >
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-[#FF6B7A] via-[#FDB913] to-[#7B4397] bg-clip-text text-transparent">
                      {clinicInfo.tagline.split(' ').slice(0, 2).join(' ')}
                    </span>
                    <br />
                    <span className="text-gray-900">
                      {clinicInfo.tagline.split(' ').slice(2).join(' ')}
                    </span>
                  </h1>
                  {/* Decorative underline */}
                  <motion.div
                    className="absolute -bottom-2 left-0 lg:left-0 w-32 h-2 bg-gradient-to-r from-[#FF6B7A] to-[#FDB913] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: 128 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  />
                </motion.div>

                {/* Subheadline with Card Background */}
                <motion.div
                  className="glass p-5 rounded-2xl shadow-xl border-2 border-white/50 mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium">
                    {clinicInfo.description}
                  </p>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <PawButton variant="primary" size="lg" href="/contact">
                      Book Appointment
                    </PawButton>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <PawButton
                      variant="secondary"
                      size="lg"
                      onClick={() => window.location.href = `tel:${clinicInfo.contact.ambulance}`}
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Emergency? Call Ambulance
                    </PawButton>
                  </motion.div>
                </motion.div>
              </div>

              {/* Right Side - Hero Carousel */}
              <HeroCarousel />
            </div>

            {/* Stats - Full Width Below */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {[
                { label: 'Expert Vets', value: `${clinicInfo.stats.vets}+`, icon: Award, color: 'from-[#FF6B7A] to-[#e55566]' },
                { label: 'Years Experience', value: `${clinicInfo.stats.yearsOfExperience}+`, icon: Clock, color: 'from-[#FDB913] to-[#e5a40f]' },
                { label: 'Happy Pets', value: `${clinicInfo.stats.successfulTreatments.toLocaleString()}+`, icon: Heart, color: 'from-[#7B4397] to-[#663380]' },
                { label: 'Pet Parents', value: `${clinicInfo.stats.happyClients.toLocaleString()}+`, icon: Shield, color: 'from-[#FF6B7A] to-[#FDB913]' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="glass border-2 border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                    <CardContent className="p-6 text-center relative overflow-hidden">
                      {/* Background Icon */}
                      <motion.div
                        className="absolute -top-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 1 }}
                      >
                        <stat.icon className="w-24 h-24" />
                      </motion.div>

                      {/* Icon Badge */}
                      <motion.div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-3`}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, type: "spring" }}
                      >
                        <stat.icon className="w-6 h-6 text-white" />
                      </motion.div>

                      <motion.p
                        className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-[#FF6B7A] to-[#7B4397] bg-clip-text text-transparent mb-2"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                      >
                        {stat.value}
                      </motion.p>
                      <p className="text-sm text-gray-700 font-semibold">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section (Brief) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/aboutus.png"
                    alt="Dedicated to Your Pet's Health"
                    width={600}
                    height={600}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#FDB913] rounded-full flex items-center justify-center animate-float shadow-xl">
                  <Heart className="w-16 h-16 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="bg-[#FF6B7A] text-white mb-4">About Us</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Compassionate Care for Your Beloved Companions
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {clinicInfo.mission}
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                With over {clinicInfo.stats.yearsOfExperience} years of experience and a team of {clinicInfo.stats.vets}+ expert veterinarians, we provide comprehensive healthcare services for your pets. Our state-of-the-art facility is equipped with modern diagnostic and treatment equipment to ensure the best possible care.
              </p>
              <PawButton variant="outline" href="/about">
                Learn More About Us
              </PawButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-gradient-to-br from-[#F5F7FA] to-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-[#FF6B7A] text-white mb-4">Our Services</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive Pet Healthcare
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From routine checkups to specialized treatments, we offer a complete range of veterinary services for your pets.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <CreativeServiceCard
                key={service.id}
                {...service}
              />
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <PawButton variant="primary" href="/services">
              View All Services
            </PawButton>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-[#FF6B7A] text-white mb-4">Why Choose Us</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Your Pet's Health is Our Priority
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: '24/7 Emergency Care',
                description: 'Round-the-clock emergency services with ICU facilities for critical cases.',
                icon: Clock,
                color: 'from-[#FDB913] to-[#e5a40f]',
              },
              {
                title: 'Modern Equipment',
                description: 'State-of-the-art diagnostic and treatment equipment for accurate care.',
                icon: Activity,
                color: 'from-[#FF6B7A] to-[#e55566]',
              },
              {
                title: 'Experienced Team',
                description: 'Highly qualified veterinarians with specialized training and expertise.',
                icon: Award,
                color: 'from-[#7B4397] to-[#663380]',
              },
              {
                title: 'Affordable Care',
                description: 'Quality veterinary services at competitive prices with flexible payment options.',
                icon: Heart,
                color: 'from-[#FDB913] to-[#e5a40f]',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full glass border-none hover:shadow-2xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-[#F5F7FA] to-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-[#FF6B7A] text-white mb-4">Testimonials</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Pet Parents Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from the pet parents who trust us with their beloved companions.
            </p>
          </motion.div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2">
                    <CreativeTestimonialCard {...testimonial} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Emergency Contact Banner */}
      <section className="py-16 bg-gradient-to-r from-[#FDB913] to-[#e5a40f] relative overflow-hidden">
        <FloatingElements count={20}>
          {(index) => {
            const icons = [Dog, Cat, Bird, Footprints];
            const Icon = icons[index % icons.length];
            return <Icon className="w-12 h-12 text-white" />;
          }}
        </FloatingElements>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-white text-[#FDB913] mb-4 px-4 py-2 text-sm font-bold">
              24/7 Emergency Service
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Pet Emergency? We're Here to Help
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Our ambulance service is available round the clock to provide immediate care for your pet.
            </p>
            <motion.a
              href={`tel:${clinicInfo.contact.ambulance}`}
              className="inline-flex items-center gap-3 bg-white text-[#FDB913] px-8 py-4 rounded-full text-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-8 h-8 animate-pulse-ring" />
              {clinicInfo.contact.ambulance}
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
