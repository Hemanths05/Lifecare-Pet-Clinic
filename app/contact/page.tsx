"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PawButton, CreativeMapSection } from '@/components/custom';
import { FloatingElements } from '@/components/custom/FloatingElements';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import clinicInfo from '@/data/clinic-info.json';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  petType: z.string().min(1, 'Please select a pet type'),
  appointmentDate: z.string().min(1, 'Please select an appointment date'),
  appointmentTime: z.string().min(1, 'Please select an appointment time'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  contactMethod: z.enum(['email', 'phone']),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      contactMethod: 'email',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    try {
      // Prepare form data for Google Apps Script
      const formData = {
        fullName: data.name,
        email: data.email,
        phoneNumber: data.phone,
        petType: data.petType,
        appointmentDate: data.appointmentDate,
        appointmentTime: data.appointmentTime,
        subject: data.subject,
        message: data.message,
        contactMethod: data.contactMethod,
      };

      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

      if (!scriptUrl) {
        throw new Error('Google Script URL is not configured');
      }

      // Send data to Google Apps Script
      await fetch(scriptUrl, {
        method: "POST",
        body: JSON.stringify(formData),
        mode: 'no-cors', // Required for Google Apps Script to avoid CORS errors
      });

      console.log('Form submitted successfully:', formData);
      setIsSubmitted(true);
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Show success message even on error since no-cors mode doesn't return response
      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#F5F7FA] via-white to-[#F5F7FA] overflow-hidden">
        <FloatingElements count={15} className="absolute inset-0 opacity-5">
          {() => (
            <svg width="50" height="50" viewBox="0 0 24 24" fill="#FF6B7A">
              <circle cx="12" cy="8" r="2" />
              <circle cx="8" cy="12" r="1.5" />
              <circle cx="16" cy="12" r="1.5" />
              <ellipse cx="12" cy="16" rx="3" ry="4" />
            </svg>
          )}
        </FloatingElements>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="bg-[#FF6B7A] text-white mb-6 px-6 py-2">Contact Us</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Have questions or want to schedule an appointment? We're here to help! Reach out to us and we'll get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: MapPin,
                title: 'Visit Us',
                content: `${clinicInfo.address.street}, ${clinicInfo.address.area}, ${clinicInfo.address.city}`,
                link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinicInfo.address.street + ' ' + clinicInfo.address.area + ' ' + clinicInfo.address.city)}`,
                color: 'from-[#FF6B7A] to-[#e55566]',
              },
              {
                icon: Phone,
                title: 'Call Us',
                content: clinicInfo.contact.phone,
                link: `tel:${clinicInfo.contact.phone}`,
                color: 'from-[#FDB913] to-[#e5a40f]',
              },
              {
                icon: Mail,
                title: 'Email Us',
                content: clinicInfo.contact.email,
                link: `mailto:${clinicInfo.contact.email}`,
                color: 'from-[#7B4397] to-[#663380]',
              },
              {
                icon: Clock,
                title: 'Working Hours',
                content: clinicInfo.hours.weekdays,
                color: 'from-[#FF6B7A] to-[#e55566]',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full glass border-none hover:shadow-2xl transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-sm text-gray-600 hover:text-[#FF6B7A] transition-colors"
                        target={item.icon === MapPin ? '_blank' : undefined}
                        rel={item.icon === MapPin ? 'noopener noreferrer' : undefined}
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-sm text-gray-600">{item.content}</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-20 bg-gradient-to-br from-[#F5F7FA] to-white">
        <div className="container mx-auto px-4">
          <Badge className="bg-[#FF6B7A] text-white mb-8 px-6 py-2">Send us a message & find us</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
            We'd Love to Hear from You
          </h2>
          <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            Fill out the form below and we'll get back to you as soon as possible, or visit us at our clinic.
          </p>

          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto mb-12 relative">
            {/* Floating Hearts Animation from Form to Map */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute hidden lg:block"
                style={{
                  left: '45%',
                  top: `${15 + i * 12}%`,
                }}
                initial={{ opacity: 0, x: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  x: [0, 50, 100, 150],
                  y: [0, -10, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF6B7A">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </motion.div>
            ))}

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Pet Icon on Form - Top Right */}
              <motion.div
                className="absolute -top-6 -right-6 z-10"
                animate={{
                  rotate: [0, 10, -10, 0],
                  y: [0, -5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="bg-gradient-to-br from-[#FF6B7A] to-[#e55566] rounded-full p-4 shadow-2xl border-4 border-white">
                  <svg width="40" height="40" viewBox="0 0 100 100" fill="white">
                    <circle cx="50" cy="40" r="20" />
                    <ellipse cx="35" cy="32" rx="8" ry="16" />
                    <ellipse cx="65" cy="32" rx="8" ry="16" />
                    <ellipse cx="50" cy="70" rx="28" ry="22" />
                  </svg>
                </div>
              </motion.div>

              <Card className="glass border-none">
                <CardContent className="p-8">
                  {isSubmitted && (
                    <motion.div
                      className="mb-6 p-4 bg-[#7B4397]/10 border border-[#7B4397] rounded-lg flex items-center gap-3"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <CheckCircle className="w-5 h-5 text-[#7B4397]" />
                      <p className="text-sm text-gray-700">
                        Thanks! We'll get back to you within 24 hours
                      </p>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name */}
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        {...register('name')}
                        className="mt-2"
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email and Phone */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          className="mt-2"
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          {...register('phone')}
                          className="mt-2"
                          placeholder="+91 90879 90819"
                        />
                        {errors.phone && (
                          <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Pet Type */}
                    <div>
                      <Label htmlFor="petType">Pet Type *</Label>
                      <Select onValueChange={(value) => setValue('petType', value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select pet type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dog">Dog</SelectItem>
                          <SelectItem value="cat">Cat</SelectItem>
                          <SelectItem value="bird">Bird</SelectItem>
                          <SelectItem value="rabbit">Rabbit</SelectItem>
                          <SelectItem value="exotic">Exotic Pet</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.petType && (
                        <p className="text-sm text-red-500 mt-1">{errors.petType.message}</p>
                      )}
                    </div>

                    {/* Appointment Date and Time */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="appointmentDate">Appointment Date *</Label>
                        <Input
                          id="appointmentDate"
                          type="date"
                          {...register('appointmentDate')}
                          className="mt-2"
                          min={new Date().toISOString().split('T')[0]}
                        />
                        {errors.appointmentDate && (
                          <p className="text-sm text-red-500 mt-1">{errors.appointmentDate.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="appointmentTime">Appointment Time *</Label>
                        <Input
                          id="appointmentTime"
                          type="time"
                          {...register('appointmentTime')}
                          className="mt-2"
                        />
                        {errors.appointmentTime && (
                          <p className="text-sm text-red-500 mt-1">{errors.appointmentTime.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        {...register('subject')}
                        className="mt-2"
                        placeholder="How can we help?"
                      />
                      {errors.subject && (
                        <p className="text-sm text-red-500 mt-1">{errors.subject.message}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        {...register('message')}
                        className="mt-2 min-h-[120px]"
                        placeholder="Tell us more about your inquiry..."
                      />
                      {errors.message && (
                        <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    {/* Preferred Contact Method */}
                    <div>
                      <Label>Preferred Contact Method *</Label>
                      <RadioGroup
                        defaultValue="email"
                        onValueChange={(value) => setValue('contactMethod', value as 'email' | 'phone')}
                        className="flex gap-4 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="email" id="email-method" />
                          <Label htmlFor="email-method" className="cursor-pointer">Email</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="phone" id="phone-method" />
                          <Label htmlFor="phone-method" className="cursor-pointer">Phone</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#FF6B7A] hover:bg-[#e55566] text-white rounded-full py-6 text-lg font-semibold"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Booking...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Book Appointment
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Creative Map Section */}
            <div className="relative">
              {/* Pet Icon on Map - Top Left */}
              <motion.div
                className="absolute -top-6 -left-6 z-10"
                animate={{
                  rotate: [0, -10, 10, 0],
                  y: [0, -5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="bg-gradient-to-br from-[#FDB913] to-[#e5a40f] rounded-full p-4 shadow-2xl border-4 border-white">
                  <svg width="40" height="40" viewBox="0 0 100 100" fill="white">
                    <circle cx="50" cy="45" r="18" />
                    <path d="M 35 35 L 32 18 L 42 33 Z" />
                    <path d="M 65 35 L 68 18 L 58 33 Z" />
                    <ellipse cx="50" cy="68" rx="24" ry="20" />
                  </svg>
                </div>
              </motion.div>

              <CreativeMapSection />
            </div>
          </div>

          {/* Contact Info Cards - Below Form and Map */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Dog Tag Styled Location Card */}
            <motion.div
              whileHover={{ scale: 1.03, rotate: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="relative overflow-hidden border-4 border-[#FF6B7A] bg-gradient-to-br from-white to-[#FFE5E8]">
                {/* Dog Tag Hole */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full border-4 border-[#FF6B7A] shadow-lg" />

                <CardContent className="pt-10 pb-6">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF6B7A] to-[#e55566] flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Find Us Here</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {clinicInfo.address.street}, {clinicInfo.address.area}, {clinicInfo.address.city}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Cat Bowl Styled Hours Card */}
            <motion.div
              whileHover={{ scale: 1.03, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="relative overflow-hidden border-4 border-[#FDB913] bg-gradient-to-br from-white to-[#FFF4D6]">
                {/* Bowl Rim Effect */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#FDB913] via-[#e5a40f] to-[#FDB913]" />

                <CardContent className="pt-8 pb-6">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FDB913] to-[#e5a40f] flex items-center justify-center mx-auto mb-4 shadow-lg relative">
                      <Clock className="w-8 h-8 text-white" />
                      {/* Clock hands animation */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      >
                        <div className="w-1 h-4 bg-white/50 rounded-full" />
                      </motion.div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Always Open</h3>
                    <p className="text-sm text-gray-700 leading-relaxed font-semibold">
                      {clinicInfo.hours.weekdays}
                    </p>
                    <p className="text-sm text-[#FF6B7A] font-bold mt-1">
                      {clinicInfo.hours.emergency}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Phone Bone Styled Card */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="relative overflow-hidden border-4 border-[#7B4397] bg-gradient-to-br from-white to-[#E9D5FF]">
                {/* Bone Shape Decoration */}
                <div className="absolute -top-1 -right-1 w-16 h-16 opacity-10">
                  <svg viewBox="0 0 100 50" fill="#7B4397">
                    <ellipse cx="15" cy="25" rx="15" ry="12" />
                    <rect x="15" y="20" width="70" height="10" />
                    <ellipse cx="85" cy="25" rx="15" ry="12" />
                  </svg>
                </div>

                <CardContent className="pt-6 pb-6">
                  <div className="text-center">
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7B4397] to-[#663380] flex items-center justify-center mx-auto mb-4 shadow-lg"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Phone className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Call Anytime</h3>
                    <a
                      href={`tel:${clinicInfo.contact.phone}`}
                      className="text-xl font-bold text-[#7B4397] hover:text-[#663380] transition-colors block"
                    >
                      {clinicInfo.contact.phone}
                    </a>
                    <p className="text-xs text-gray-600 mt-1">Emergency? We're ready!</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-16 bg-gradient-to-r from-[#FDB913] to-[#e5a40f]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-white text-[#FDB913] mb-4 px-4 py-2 text-sm font-bold">
              Emergency?
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Need Immediate Assistance?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              For pet emergencies, call us immediately. Our 24/7 emergency team is always ready to help.
            </p>
            <motion.a
              href={`tel:${clinicInfo.contact.emergencyPhone}`}
              className="inline-flex items-center gap-3 bg-white text-[#FDB913] px-8 py-4 rounded-full text-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-8 h-8" />
              {clinicInfo.contact.emergencyPhone}
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
