'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Star, MessageSquare, BarChart2, Menu, PlusCircle, LogOut, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { useDispatch } from 'react-redux'
import { getUserDetailAsync } from '@/redux/usersSlice'
import { useRouter } from 'next/router'
import { capitalize } from '@mui/material'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserSideBar } from './UserSideBar'
import { WelcomePageSkeleton } from '@/skeleton/landingPageSkeleton'
import Navbar from './Navbar'

// Simulating a logged-in user. In a real application, this would come from your authentication system.
const loggedInUser = {
  name: "Jane Doe",
  email: "jane@example.com",
  recentForms: [
    { id: 1, name: "Customer Feedback Survey", responses: 234 },
    { id: 2, name: "Product Review Form", responses: 189 },
    { id: 3, name: "Event Registration", responses: 56 },
  ]
}

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-gray-900 rounded-full"
          style={{
            width: Math.random() * 300 + 50,
            height: Math.random() * 300 + 50,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  )
}

export default function WelcomeComp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch: AppDispatch= useDispatch();
  const {userDetails, loading} = useSelector((state: RootState) => state.userDetails)
  const router = useRouter();
  const {userId} = router.query;
  


  useEffect(()=>{
    if(userId){
      dispatch(getUserDetailAsync(userId as any));
    }
  },[dispatch, userId])

  return (
   loading ? <WelcomePageSkeleton/> :

    <div className="min-h-screen bg-black text-white">
      <AnimatedBackground />

      {/* Navbar */}
      {/* <Navbar/> */}
      <nav className="fixed w-full z-50 bg-black bg-opacity-50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">FormFlow</Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link href={`/${userId}/new-dashboard`} className="hover:text-gray-300 transition-colors">Dashboard</Link>
            <Link href="/forms" className="hover:text-gray-300 transition-colors">My Forms</Link>
            <Link href="/analytic" className="hover:text-gray-300 transition-colors">Analytics</Link>
            <div className="relative group">
            <Button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                variant="ghost"
                size="icon"
                className="rounded-full border-2 border-white text-black"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="User"
                  />
                  <AvatarFallback>{capitalize(userDetails.name.charAt(0) || 'H')}</AvatarFallback>
                </Avatar>
              </Button>
              
            </div>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link href="/dashboard" className="text-gray-800 hover:text-black transition-colors">Dashboard</Link>
              <Link href="/forms" className="text-gray-800 hover:text-black transition-colors">My Forms</Link>
              <Link href="/analytics" className="text-gray-800 hover:text-black transition-colors">Analytics</Link>
              <Link href="/profile" className="text-gray-800 hover:text-black transition-colors">Profile</Link>
              <Link href="/settings" className="text-gray-800 hover:text-black transition-colors">Settings</Link>
              <button className="text-left text-gray-800 hover:text-black transition-colors">Logout</button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* {user details} */}

      {sidebarOpen && <UserSideBar setSidebarOpen={setSidebarOpen} />}

      {/* Hero Section */}
      <motion.section className="relative pt-32 pb-20 px-4" style={{ opacity }}>
        <div className="container mx-auto text-center relative z-10">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Welcome back, {capitalize(userDetails.name)}!
          </motion.h1>
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ready to create more engaging feedback forms? Let's get started!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 transition-colors text-lg px-8 py-4">
              <PlusCircle className="mr-2 h-5 w-5" /> Create New Form
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Recent Forms Section */}
      <section className="py-20 bg-white text-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Your Recent Forms</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loggedInUser.recentForms.map((form, index) => (
              <motion.div
                key={form.id}
                className="bg-gray-100 p-6 rounded-lg shadow-lg border border-gray-300 hover:border-black transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-4">{form.name}</h3>
                <p className="text-gray-600 mb-4">{form.responses} responses</p>
                <div className="flex justify-between items-center">
                  <Link href={`/forms/${form.id}`} className="text-black hover:text-gray-700 transition-colors flex items-center">
                    View Form <ChevronRight className="ml-1 w-4 h-4" />
                  </Link>
                  <Link href={`/forms/${form.id}/edit`} className="text-gray-600 hover:text-black transition-colors">
                    Edit
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section id="analytic" className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Your FormFlow at a Glance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <MessageSquare className="w-12 h-12 mb-4" />, title: "Total Responses", value: "1,234" },
              { icon: <Star className="w-12 h-12 mb-4" />, title: "Average Rating", value: "4.8" },
              { icon: <BarChart2 className="w-12 h-12 mb-4" />, title: "Completion Rate", value: "92%" }
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="bg-gray-900 p-8 rounded-lg text-center border border-gray-800 hover:border-white transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {stat.icon}
                <h3 className="text-2xl font-semibold mb-2">{stat.title}</h3>
                <p className="text-4xl font-bold">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-white text-black relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Ready to Dive Deeper?
          </motion.h2>
          <motion.p 
            className="text-xl mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore advanced features and get more insights from your feedback forms.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button onClick={()=>router.push(`/${userId}/new-dashboard`) } size="lg" className="bg-black text-white hover:bg-gray-800 transition-colors text-lg px-8 py-4">
              Go to Dashboard
            </Button>
          </motion.div>
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-black rotate-12 transform origin-top-left"></div>
        </div>
      </section>
    </div>
  )
}