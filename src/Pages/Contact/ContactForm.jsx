import React from 'react';
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import SectionHeader from '../../components/ui/SectionHeader';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const ContactForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission
  };

  return (
    <section className="bg-white py-16 lg:py-24" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-12">
          <SectionHeader
            title="Get in Touch"
            subtitle="Need a specific part? Have questions about fitment? Our team of experts is ready to assist you."
            center={true}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">

          {/* Contact Info Column */}
          <div className="h-full">
            <h3 className="text-2xl font-semibold font-heading text-neutral-900 mb-6">
              Contact Information
            </h3>
            <p className="mb-10 text-neutral-600 leading-relaxed">
              Whether you need to check inventory, require support for a recent order, or just want some expert advice on your next build, we are here to help.
            </p>

            <ul className="space-y-8">
              <li className="flex items-start">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-900 text-accent-500">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-neutral-900 font-heading">Our Address</h4>
                  <p className="mt-1 text-neutral-600">1230 Rider Avenue, Moto District</p>
                  <p className="text-neutral-600">New York, NY 10001</p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-900 text-accent-500">
                  <Phone className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-neutral-900 font-heading">Contact Details</h4>
                  <p className="mt-1 text-neutral-600">Phone: +1 (800) 123-MOTO</p>
                  <p className="text-neutral-600">Email: support@sumonmoto.com</p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-900 text-accent-500">
                  <Clock className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-neutral-900 font-heading">Working Hours</h4>
                  <p className="mt-1 text-neutral-600">Monday - Friday: 08:00 AM - 06:00 PM</p>
                  <p className="text-neutral-600">Saturday: 09:00 AM - 02:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Form Column */}
          <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-200 shadow-sm" id="form">
            <h3 className="text-2xl font-semibold font-heading text-neutral-900 mb-6">
              Send a Message
            </h3>
            <form id="contactForm" onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <Input
                  label="Your Name"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                />
                <Input
                  label="Email Address"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                />

                <div className="flex flex-col w-full">
                  <label htmlFor="message" className="mb-1 text-sm font-medium text-neutral-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="How can we help you?"
                    className="border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 bg-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors resize-none"
                    required
                  ></textarea>
                </div>
              </div>

              <Button type="submit" variant="primary" className="w-full flex justify-center mt-2">
                <Mail className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactForm;
