'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import Link from 'next/link'

export function PricingCompo() {
  const [isYearly, setIsYearly] = useState(false)

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/mo",
      description: "For individuals and small projects",
      features: [
        "Up to 3 forms",
        "100 submissions/month",
        "Basic analytics",
        "Email support"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: isYearly ? "$290" : "$29",
      period: isYearly ? "/year" : "/mo",
      description: "For growing businesses and teams",
      features: [
        "Unlimited forms",
        "10,000 submissions/month",
        "Advanced analytics & reporting",
        "Priority support",
        "Custom branding"
      ],
      cta: "Choose Pro",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations with complex needs",
      features: [
        "Unlimited everything",
        "Advanced security features",
        "Dedicated account manager",
        "Custom integrations",
        "SLA guarantee"
      ],
      cta: "Contact Sales",
      popular: false
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
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">Choose Your Plan</h1>
        <p className="text-xl mb-12 text-center">Select the perfect plan for your feedback needs</p>

        <div className="flex justify-center items-center space-x-4 mb-12">
          <span className={`text-lg ${!isYearly ? 'text-blue-500' : 'text-gray-400'}`}>Monthly</span>
          <Switch
            checked={isYearly}
            onCheckedChange={setIsYearly}
          />
          <span className={`text-lg ${isYearly ? 'text-blue-500' : 'text-gray-400'}`}>Yearly (Save 20%)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`bg-gray-900 p-6 rounded-lg ${plan.popular ? 'border-2 border-blue-500' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {plan.popular && (
                <div className="bg-blue-500 text-white text-sm font-bold uppercase py-1 px-2 rounded-full mb-4 inline-block">
                  Most Popular
                </div>
              )}
              <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
              <div className="text-3xl font-bold mb-4">
                {plan.price}
                {plan.period && <span className="text-xl font-normal">{plan.period}</span>}
              </div>
              <p className="text-gray-400 mb-6">{plan.description}</p>
              <ul className="mb-6 space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="w-5 h-5 mr-2 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className={`w-full ${plan.name === 'Free' ? 'bg-white text-black hover:bg-gray-200' : 'bg-blue-500 hover:bg-blue-600'}`}>
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}