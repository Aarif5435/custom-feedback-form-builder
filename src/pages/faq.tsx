'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link';

interface FAQsType {
   question: string;
   answer: string;
}

const FAQItem = ({ question, answer } : FAQsType) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-700">
      <button
        className="flex justify-between items-center w-full py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold">{question}</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="pb-4"
          >
            <p className="text-gray-400">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQPage() {
  const faqs = [
    {
      question: "What is FormFlow?",
      answer: "FormFlow is a powerful feedback form builder that allows you to create, customize, and analyze feedback forms for your website or application."
    },
    {
      question: "How do I get started with FormFlow?",
      answer: "You can start by signing up for a free account on our website. Once you're logged in, you can create your first form using our intuitive drag-and-drop builder."
    },
    {
      question: "Can I customize the look of my forms?",
      answer: "Yes, FormFlow offers extensive customization options. You can change colors, fonts, layouts, and even add your own CSS for complete control over the appearance of your forms."
    },
    {
      question: "How do I embed a form on my website?",
      answer: "After creating your form, you'll receive an embed code. Simply copy this code and paste it into the HTML of your website where you want the form to appear."
    },
    {
      question: "What kind of analytics does FormFlow provide?",
      answer: "FormFlow offers comprehensive analytics including submission rates, completion times, user demographics, and custom event tracking. Higher tier plans include more advanced analytics features."
    },
    {
      question: "Is FormFlow GDPR compliant?",
      answer: "Yes, FormFlow is fully GDPR compliant. We provide tools to help you manage user data and consent in accordance with GDPR regulations."
    },
    {
      question: "Can I export my form data?",
      answer: "Yes, you can export your form submissions in various formats including CSV and JSON. This feature is available on all paid plans."
    },
    {
      question: "What support options are available?",
      answer: "We offer email support for all users. Paid plans include priority support, and our Enterprise plan includes dedicated support."
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="container mx-auto px-4 py-8">
        <nav>
          <Link href="/" className="text-2xl font-bold">FormFlow</Link>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">Frequently Asked Questions</h1>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FAQItem question={faq.question} answer={faq.answer} />
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}