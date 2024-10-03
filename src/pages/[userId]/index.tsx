import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronLeft,
  Eye,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Star,
  Smile,
  Download,
  FileSpreadsheet,
  FileText,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import WelcomeComp from "@/components/welcomePage";

export default function EnhancedFeedbackDashboard() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const router = useRouter()

  const handleDownload = (fileType: string) => {
    // Placeholder for download functionality
    console.log(`Downloading ${fileType} file...`);
  };

  return (
    <>
      <WelcomeComp/>
    </>
  );
}
