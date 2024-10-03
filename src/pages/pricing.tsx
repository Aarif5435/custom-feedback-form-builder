'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, HelpCircle, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import Link from 'next/link'
import { PricingCompo } from '@/components/Pricing'
import { FeedbackFormComponent } from '@/components/feedbackForm'
import { useFormVisibility } from '@/hooks/useFormVisibility'

export default function PricingPage() {
  const { modalOpen, getFormToShow, handleClose } = useFormVisibility();
  const formToShow = getFormToShow();

  return (
    <>
    <PricingCompo/>

    {modalOpen && formToShow && (
      <FeedbackFormComponent form={formToShow} modalOpen={modalOpen} handleClose={handleClose} />
   )}
    </>
  )
}