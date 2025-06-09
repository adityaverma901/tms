"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Building2,
  ChevronRight,
  Home,
  Landmark,
  Shield,
  BarChart2,
  DollarSign,
  Users,
  CheckCircle
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
// import Boat from "./boat/Boat";

export default function Homepage() {
  const [isOpen, setIsOpen] = useState(false);
  
  // New color scheme: Deep blue (primary), gold (accent), neutral grays
  const colors = {
    primary: 'bg-blue-800 text-white',
    primaryText: 'text-blue-800',
    primaryBorder: 'border-blue-800',
    accent: 'bg-amber-500 text-white',
    accentText: 'text-amber-500',
    accentBorder: 'border-amber-500',
    dark: 'bg-gray-900 text-white',
    light: 'bg-gray-50 text-gray-900'
  };

  const features = [
    {
      icon: <Building2 className="h-6 w-6 text-blue-800" />,
      title: "Fractional Ownership",
      description: "Invest in premium real estate with small amounts through tokenized shares."
    },
    {
      icon: <DollarSign className="h-6 w-6 text-blue-800" />,
      title: "Passive Income",
      description: "Earn regular rental income distributed proportionally to your holdings."
    },
    {
      icon: <BarChart2 className="h-6 w-6 text-blue-800" />,
      title: "Value Appreciation",
      description: "Benefit from property value increases with bi-annual valuations."
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-800" />,
      title: "Regulatory Compliance",
      description: "Fully compliant with RBI and SEBI regulations for secure investing."
    }
  ];

  const howItWorks = [
    {
      number: "01",
      title: "Complete KYC",
      description: "Verify your identity through our secure, RBI-compliant process."
    },
    {
      number: "02",
      title: "Browse Properties",
      description: "Explore curated real estate opportunities across India."
    },
    {
      number: "03",
      title: "Invest & Earn",
      description: "Purchase tokens and start earning rental income immediately."
    }
  ];

  const testimonials = [
    {
      text: "Tokenized real estate has democratized property investment. I now own shares in premium Mumbai properties with just ₹50,000.",
      author: "Rajesh Mehta",
      company: "Investor since 2023"
    },
    {
      text: "As a developer, this platform helped me raise capital faster while maintaining ownership. The investor network is exceptional.",
      author: "Priya Sharma",
      company: "Property Developer"
    }
  ];

  const stats = [
    { value: "₹250Cr+", label: "Assets Tokenized" },
    { value: "5,000+", label: "Active Investors" },
    { value: "18%", label: "Avg. Annual Returns" },
    { value: "100%", label: "RBI Compliant" }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <div className="flex items-center">
                  <div className="h-8 w-8 md:h-10 md:w-10 rounded-md bg-blue-800 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-white" />
                  </div>
                  <span className="ml-2 text-lg md:text-xl font-bold text-blue-800">
                    RealShare
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/properties" className="text-gray-600 hover:text-blue-800 px-3 py-2 text-sm font-medium">
                Properties
              </Link>
              <Link href="/how-it-works" className="text-gray-600 hover:text-blue-800 px-3 py-2 text-sm font-medium">
                How It Works
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-800 px-3 py-2 text-sm font-medium">
                About Us
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-800 px-3 py-2 text-sm font-medium">
                Contact
              </Link>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  className="border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white text-sm"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-blue-800 hover:bg-blue-900 text-white text-sm">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-800 focus:outline-none"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white pb-3 px-4">
            <div className="flex flex-col space-y-2 pt-2">
              <Link 
                href="/properties" 
                className="text-gray-600 hover:text-blue-800 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Properties
              </Link>
              <Link 
                href="/how-it-works" 
                className="text-gray-600 hover:text-blue-800 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                href="/about" 
                className="text-gray-600 hover:text-blue-800 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-600 hover:text-blue-800 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>

              <div className="pt-2 border-t border-gray-200">
                <Link 
                  href="/auth/login" 
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  <Button
                    variant="outline"
                    className="w-full border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white mb-2"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link 
                  href="/auth/register" 
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  <Button className="w-full bg-blue-800 hover:bg-blue-900 text-white">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className={`relative ${colors.primary} py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Text Section */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Own a Piece of Premium Real Estate <span className="text-amber-300">Starting at ₹10,000</span>
              </h1>
              <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto lg:mx-0">
                India's first RBI-compliant platform for fractional real estate investment. Earn rental income and benefit from property appreciation without buying whole properties.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/auth/register">
                  <Button
                    size="lg"
                    className="bg-amber-500 hover:bg-amber-600 text-white"
                  >
                    Start Investing
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-blue-700 hover:text-white hover:bg-blue-700"
                  >
                    How It Works
                  </Button>
                </Link>
              </div>
            </div>

            {/* Image Section */}
            <div className="lg:w-1/2 mt-10 lg:mt-0">
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/rbi1.png"
                  width={600}
                  height={400}
                  alt="Luxury real estate investment"
                  className="w-full object-cover"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900 to-transparent p-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-amber-300 mr-2" />
                    <span className="text-white text-sm">RBI & SEBI Compliant Platform</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-gray-50">
                <p className="text-3xl font-bold text-blue-800">{stat.value}</p>
                <p className="mt-2 text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Invest Through RealShare
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Democratizing real estate investment with transparency, security, and high returns.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="p-3 bg-blue-50 inline-flex rounded-lg mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Start Investing in 3 Simple Steps
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our streamlined process makes real estate investment accessible to everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-8 rounded-xl shadow-sm relative z-10 h-full border-t-4 border-amber-500">
                  <div className="text-4xl font-bold text-blue-800 mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-0">
                    <ChevronRight className="h-8 w-8 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Featured Properties
              </h2>
              <p className="mt-2 text-lg text-gray-600">
                Curated selection of premium tokenized real estate
              </p>
            </div>
            <Link href="/properties">
              <Button variant="outline" className="border-blue-800 text-blue-800">
                View All Properties
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Property Card 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/home1.jpg"
                  layout="fill"
                  objectFit="cover"
                  alt="Luxury Apartment in Mumbai"
                />
                <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  8.5% Yield
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Marina Heights</h3>
                    <p className="text-gray-600">Worli, Mumbai</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">From</p>
                    <p className="text-lg font-bold text-blue-800">₹25,000</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Shares Left</p>
                      <p className="font-medium">42/100</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Valuation</p>
                      <p className="font-medium">₹85 Cr</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Lock-in</p>
                      <p className="font-medium">1 Year</p>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-blue-800 hover:bg-blue-900">
                  Invest Now
                </Button>
              </div>
            </div>

            {/* Property Card 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/home2.jpg"
                  layout="fill"
                  objectFit="cover"
                  alt="Commercial Tower in Bangalore"
                />
                <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  9.2% Yield
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">TechPark One</h3>
                    <p className="text-gray-600">Whitefield, Bangalore</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">From</p>
                    <p className="text-lg font-bold text-blue-800">₹50,000</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Shares Left</p>
                      <p className="font-medium">18/200</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Valuation</p>
                      <p className="font-medium">₹120 Cr</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Lock-in</p>
                      <p className="font-medium">2 Years</p>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-blue-800 hover:bg-blue-900">
                  Invest Now
                </Button>
              </div>
            </div>

            {/* Property Card 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/home3.jpg"
                  layout="fill"
                  objectFit="cover"
                  alt="Luxury Villas in Goa"
                />
                <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  7.8% Yield
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Palm Grove Villas</h3>
                    <p className="text-gray-600">Candolim, Goa</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">From</p>
                    <p className="text-lg font-bold text-blue-800">₹10,000</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Shares Left</p>
                      <p className="font-medium">75/500</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Valuation</p>
                      <p className="font-medium">₹65 Cr</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Lock-in</p>
                      <p className="font-medium">6 Months</p>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-blue-800 hover:bg-blue-900">
                  Invest Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              What Our Investors Say
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from our community of investors and developers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm relative"
              >
                <div className="absolute top-0 left-8 -translate-y-1/2 bg-amber-500 p-3 rounded-full">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <p className="text-gray-600 italic mb-6">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-semibold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-gray-900">
                      {testimonial.author}
                    </p>
                    <p className="text-xs text-gray-500">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 ${colors.primary}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Real Estate Investment Journey?</h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
              Join thousands of investors building wealth through fractional real estate ownership.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/auth/register">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white">
                  Get Started - It's Free
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-blue-700 hover:text-white hover:bg-blue-700">
                  Contact Our Advisors
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and About */}
            <div>
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <span className="ml-2 text-xl font-bold">RealShare</span>
              </div>
              <p className="text-gray-400 text-sm mt-2">
                India's leading RBI-compliant real estate tokenization platform, democratizing property investment.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/properties" className="text-gray-400 hover:text-white">Properties</Link></li>
                <li><Link href="/how-it-works" className="text-gray-400 hover:text-white">How It Works</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms & Conditions</Link></li>
                <li><Link href="/kyc-policy" className="text-gray-400 hover:text-white">KYC Policy</Link></li>
                <li><Link href="/disclaimer" className="text-gray-400 hover:text-white">Disclaimer</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <address className="text-gray-400 not-italic">
                <p className="mb-2">RealShare Technologies Pvt. Ltd.</p>
                <p className="mb-2">123 Financial District,</p>
                <p className="mb-2">Bandra Kurla Complex, Mumbai</p>
                <p className="mb-2">India - 400051</p>
                <p className="mb-2">Email: info@realshare.in</p>
                <p>Phone: +91 22 1234 5678</p>
              </address>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} RealShare. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* <Boat/> */}
      </footer>
    </div>
  );
}