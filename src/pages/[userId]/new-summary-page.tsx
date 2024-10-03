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

export default function EnhancedFeedbackDashboard() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const router = useRouter()

  const handleDownload = (fileType: string) => {
    // Placeholder for download functionality
    console.log(`Downloading ${fileType} file...`);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 bg-gradient-to-br from-primary-50 to-secondary-50 min-h-screen">
        <motion.header
          className="flex justify-between items-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button onClick={()=>{router.back()}} variant="outline" size="sm" className="group">
            <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />{" "}
            Back to Forms
          </Button>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-6 -z-40 overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="flex items-center justify-between">
                <span>Feedback Form</span>
                <span className="text-sm font-normal">
                  Created Date: 2024-09-29
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 pt-6 md:grid-cols-3">
              <StatCard
                icon={<Eye className="h-8 w-8" />}
                value={1}
                label="Views"
              />
              <StatCard
                icon={<MessageSquare className="h-8 w-8" />}
                value={1}
                label="Submitted"
              />
              <div className="flex flex-col justify-center space-y-1 p-4 bg-secondary/10 rounded-lg">
                <p className="text-sm">
                  <strong>Page URL contains:</strong> /pricing
                </p>
                <p className="text-sm">
                  <strong>Date:</strong> 2024-09-29
                </p>
                <p className="text-sm">
                  <strong>Time:</strong> 18:46
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Feedback List</span>
              <div className="flex space-x-2">
                <DownloadButton
                  label="Excel"
                  icon={<FileSpreadsheet className="h-4 w-4" />}
                  onClick={() => handleDownload("excel")}
                />
                <DownloadButton
                  label="CSV"
                  icon={<FileText className="h-4 w-4" />}
                  onClick={() => handleDownload("csv")}
                />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              className="border rounded-lg overflow-hidden"
              initial={false}
              animate={{ height: isAccordionOpen ? "auto" : 60 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Button
                variant="ghost"
                className="w-full flex justify-between items-center p-4"
                onClick={() => setIsAccordionOpen(!isAccordionOpen)}
              >
                <span>Feedback 1</span>
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground mr-2">
                    2024-09-29
                  </span>
                  {isAccordionOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </Button>
              <AnimatePresence>
                {isAccordionOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 space-y-4"
                  >
                    <FeedbackItem
                      label="Textarea"
                      value="Hi"
                      icon={<MessageSquare className="h-5 w-5" />}
                    />
                    <FeedbackItem
                      label="Numeric"
                      value="7"
                      icon={<Hash className="h-5 w-5" />}
                    />
                    <FeedbackItem
                      label="Star"
                      value={
                        <div className="flex">
                          {[1, 2, 3, 4].map((star) => (
                            <Star
                              key={star}
                              className="h-5 w-5 text-yellow-400 fill-current"
                            />
                          ))}
                          <Star className="h-5 w-5 text-gray-300" />
                        </div>
                      }
                      icon={<Star className="h-5 w-5" />}
                    />
                    <FeedbackItem
                      label="Smiley"
                      value={<Smile className="h-6 w-6 text-green-500" />}
                      icon={<Smile className="h-5 w-5" />}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

interface CommonType {
  icon: any;
  value: any;
  label: string;
}

interface DownloadType {
  icon: any;
  onClick: () => void;
  label: string;
}

function StatCard({ icon, value, label }: CommonType) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center p-4 bg-primary/5 rounded-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {React.cloneElement(icon, { className: "text-primary mb-2" })}
      <h2 className="text-3xl font-bold">{value}</h2>
      <p className="text-sm text-muted-foreground">{label}</p>
    </motion.div>
  );
}

function FeedbackItem({ label, value, icon }: CommonType) {
  return (
    <div className="flex items-center space-x-2">
      <div className="bg-primary/10 p-2 rounded-full">{icon}</div>
      <div>
        <p className="text-sm font-medium">{label}</p>
        <div className="text-lg">{value}</div>
      </div>
    </div>
  );
}

function DownloadButton({ label, icon, onClick }: DownloadType) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
      onClick={onClick}
    >
      {icon}
      <Download className="ml-2 -mr-0.5 h-4 w-4" />
      <span className="sr-only">Download {label}</span>
    </motion.button>
  );
}

function Hash({ className }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="9" y2="9" />
      <line x1="4" x2="20" y1="15" y2="15" />
      <line x1="10" x2="8" y1="3" y2="21" />
      <line x1="16" x2="14" y1="3" y2="21" />
    </svg>
  );
}
