'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, HelpCircle, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import Link from 'next/link'
import { PricingCompo } from '@/components/Pricing'

export default function PricingPage() {

  return (
    <PricingCompo/>
  )
}