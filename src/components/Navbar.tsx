import { motion, useScroll, useTransform } from "framer-motion";
import {
  Star,
  MessageSquare,
  BarChart2,
  Menu,
  PlusCircle,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { getUserDetailAsync } from "@/redux/usersSlice";
import { useRouter } from "next/router";
import { capitalize } from "@mui/material";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { UserSideBar } from "./UserSideBar";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { userDetails, loading } = useSelector(
    (state: RootState) => state.userDetails
  );
  const router = useRouter();
  const { userId } = router.query;

  useEffect(() => {
    if (userId) {
      dispatch(getUserDetailAsync(userId as any));
    }
  }, [userId]);

  return loading ? (
    <nav className="fixed w-full z-50 -mt-12 bg-gray-400 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="w-32 h-8 bg-gray-200 rounded"></div>
        <div className="hidden md:flex space-x-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-20 h-8 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </nav>
  ) : (
    <>
      <nav className="bg-white shadow-sm">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center justify-between">
              <span onClick={()=>router.push(`/${userId}`) } className="text-2xl font-bold text-primary cursor-pointer">FormFlow</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/dashboard"
                className="hover:text-gray-300 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/forms"
                className="hover:text-gray-300 transition-colors"
              >
                My Forms
              </Link>
              <Link
                href="/analytics"
                className="hover:text-gray-300 transition-colors"
              >
                Analytics
              </Link>
              <Button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                variant="ghost"
                size="icon"
                className="rounded-full border-2 border-black"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="User"
                  />
                  <AvatarFallback>
                    {capitalize(userDetails?.name.charAt(0)) || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {sidebarOpen && <UserSideBar setSidebarOpen={setSidebarOpen} />}
    </>
  );
};

export default Navbar;
