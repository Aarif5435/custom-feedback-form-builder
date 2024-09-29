"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Star, MessageSquare, Sliders, BarChart2, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ParticleAnimation = () => {
  const count = 100;
  const controls = useAnimation();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Only run on the client side
    if (typeof window !== "undefined") {
      // Set window size
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

      // Trigger animation
      controls.start((i) => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        transition: {
          duration: Math.random() * 20 + 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
          delay: i * 0.02,
        },
      }));
    }
  }, [controls]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          custom={i}
          animate={controls}
          initial={{
            x: Math.random() * windowSize.width,
            y: Math.random() * windowSize.height,
          }}
          className="absolute w-1 h-1 bg-white rounded-full opacity-20"
        />
      ))}
    </div>
  );
};

export function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <ParticleAnimation />

      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-black bg-opacity-50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            FormFlow
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-gray-300 transition-colors">
              Home
            </Link>
            <Link
              href="/pricing"
              className="hover:text-gray-300 transition-colors"
            >
              Pricing
            </Link>
            <Link href="/faq" className="hover:text-gray-300 transition-colors">
              FAQ
            </Link>
            <Button
              onClick={() => {}}
              variant="outline"
              className="text-black border-white hover:text-black transition-colors"
            >
              <Link href="/login" className="transition-colors">
                Log in
              </Link>
            </Button>
            <Button className="bg-white text-black hover:bg-gray-200 transition-colors">
              <Link href="/signup" className="transition-colors">
                Get started
              </Link>
            </Button>
          </div>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-black"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link href="/" className="hover:text-gray-300 transition-colors">
                Home
              </Link>
              <Link
                href="/pricing"
                className="hover:text-gray-300 transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/faq"
                className="hover:text-gray-300 transition-colors"
              >
                FAQ
              </Link>
              <Button
                onClick={() => {}}
                variant="outline"
                className="text-black border-white hover:bg-white hover:text-black transition-colors"
              >
                <Link
                  href="/Login"
                  className="hover:text-gray-300 transition-colors"
                >
                  Log in
                </Link>
              </Button>
              <Button className="bg-white text-black hover:bg-gray-200 transition-colors">
                Get started
              </Button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto text-center z-10 relative">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            {...fadeInUp}
          >
            Craft Feedback Forms
            <br />
            That Get Results
          </motion.h1>
          <motion.p
            className="text-xl mb-8 max-w-2xl mx-auto"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            Build, customize, and analyze feedback forms with our intuitive
            platform. Elevate your customer experience today.
          </motion.p>
          <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200 transition-colors text-lg px-8 py-4"
            >
              <Link href="/signup" className="transition-colors">
                Start Building for Free
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 bg-white text-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Star className="w-12 h-12 mb-6" />,
                title: "Custom Fields",
                description:
                  "Create forms with star ratings, text areas, and more",
              },
              {
                icon: <Sliders className="w-12 h-12 mb-6" />,
                title: "Flexible Settings",
                description:
                  "Customize display settings including time and URL configurations",
              },
              {
                icon: <BarChart2 className="w-12 h-12 mb-6" />,
                title: "Analytics Dashboard",
                description: "Manage and analyze feedback submissions easily",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-100 p-8 rounded-lg text-center hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {feature.icon}
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            How It Works
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-12 md:space-y-0 md:space-x-8">
            {[
              {
                step: 1,
                title: "Create",
                description: "Design your custom feedback form",
              },
              {
                step: 2,
                title: "Integrate",
                description: "Add the form to your website",
              },
              {
                step: 3,
                title: "Analyze",
                description: "Review and act on feedback",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="bg-gray-900 p-8 rounded-lg text-center w-full md:w-1/3"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="bg-white text-black rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to Revolutionize Your Feedback Process?
          </motion.h2>
          <motion.p
            className="text-xl mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join thousands of businesses improving their customer experience
            with FormFlow.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200 transition-colors text-lg px-8 py-4"
            >
              <Link href="/signup" className="transition-colors">
                Start Your Free Trial
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
