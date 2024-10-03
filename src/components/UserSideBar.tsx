import React, { useEffect, useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Zap,
  Rocket,
  ChevronRight,
  User,
  X,
  ChevronDown,
  ChevronUp,
  LogOut,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/router";
import { getUserDetailAsync, updateUserDetailAsync } from "@/redux/usersSlice";
import { capitalize } from "@mui/material";
import { Logout } from "@/lib/auth/logout";
import { ToastContainer } from "material-react-toastify";
import { showToast } from "./ui/toast";

const plans: any = [
  { name: "Basic", icon: <Zap className="h-4 w-4" />, color: "bg-blue-500" },
  {
    name: "Pro",
    icon: <Sparkles className="h-4 w-4" />,
    color: "bg-purple-500",
  },
  {
    name: "Enterprise",
    icon: <Rocket className="h-4 w-4" />,
    color: "bg-orange-500",
  },
];

interface UserSideBarType {
  setSidebarOpen: (e: boolean) => void;
}

export const UserSideBar = ({
  setSidebarOpen,
}: UserSideBarType) => {
  const [updateProfileOpen, setUpdateProfileOpen] = useState(false);
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [newPass, setNewPass] = useState("")

  const dispatch: AppDispatch= useDispatch();
  const {userDetails, loading, updateLoading} = useSelector((state: RootState) => state.userDetails)
  const router = useRouter();
  const {userId} = router.query;


  // useEffect(()=>{
  //   if(userId){
  //     dispatch(getUserDetailAsync(userId as any));
  //   }
  // },[dispatch, userId])

  // console.log('userDetails----->>>--',userDetails,userId)

  const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    plan: "Pro",
  };

  const handleLogout = async () => {
    await Logout()
    console.log("Logging out...");
  };

  const handleUpdate = async (e: any)=>{
    e.preventDefault();
    const updateData : { name?: string; email?: string; password?: string } = {}
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (newPass) updateData.password = newPass;

    if (Object.keys(updateData).length === 0) {
      showToast("error", 'Please provide at least one field to update');

      return;
    }

    if(userId){
      const data : any = await dispatch(updateUserDetailAsync({userId, updateData}));
      
      showToast(data.error ? "error": "success", data.error ? data.error.message : 'user details updated successful');
    }
  }

  return (
    <>
    <ToastContainer position="top-right" autoClose={5000} />
      <AnimatePresence>
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="fixed inset-y-0 right-0 max-w-full flex z-50"
        >
          <div className="w-screen max-w-md">
            <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
              <div className="px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900">
                    User Profile
                  </h2>
                  <div className="ml-3 h-7 flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSidebarOpen(false)}
                      aria-label="Close panel"
                    >
                      <X className="h-6 w-6 text-black" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mt-6 relative flex-1 px-4 sm:px-6">
                <div className="flex  flex-col items-center">
                  <Avatar className="h-24 w-24 border-2 border-black text-black text-[20px]">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{capitalize(userDetails.name.charAt(0))}</AvatarFallback>
                  </Avatar>
                  <h3 className="mt-2 text-xl text-black font-semibold">{capitalize(userDetails.name)}</h3>
                  <p className="text-gray-500">{userDetails.email}</p>
                  <div className="mt-4">
                    <Badge
                      className={`${
                        plans?.find((p: any) => p.name === userDetails.userPlans[0].plan.name).color
                      } text-white`}
                    >
                      {plans?.find((p: any) => p.name === userDetails.userPlans[0].plan.name).icon}
                      <span className="ml-1">{userDetails.userPlans[0].plan.name} Plan</span>
                    </Badge>
                  </div>
                </div>

                <div className="mt-8 text-black">
                  <Button
                    className="w-full justify-between"
                    onClick={() => setUpdateProfileOpen(!updateProfileOpen)}
                  >
                    Update Profile
                    {updateProfileOpen ? (
                      <ChevronUp className="ml-2 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                  <AnimatePresence>
                    {updateProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 space-y-4"
                      >
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" onChange={(e:any)=> setName(e.target.value) } defaultValue={userDetails.name} />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            onChange={(e:any)=> setEmail(e.target.value) }
                            defaultValue={userDetails.email}
                          />
                        </div>
                        <div>
                          <Label htmlFor="password">New Password</Label>
                          <Input id="password"  onChange={(e:any)=> setNewPass(e.target.value) } type="text" />
                        </div>
                        <Button loading={updateLoading} onClick={handleUpdate} className="w-full">Save Changes</Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-4">
                    Upgrade Your Plan
                  </h4>
                  {plans.map((plan: any) => (
                    <motion.div
                      key={plan.name}
                      className={`p-4 rounded-lg ${plan.color} bg-opacity-10 flex justify-between items-center mb-4`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${plan.color}`}>
                          {plan.icon}
                        </div>
                        <div>
                          <h5 className="font-semibold text-black">{plan.name} Plan</h5>
                          <p className="text-sm text-gray-600">
                            Unlock more features
                          </p>
                        </div>
                      </div>
                      <Button
                        variant={
                          plan.name === userDetails.userPlans[0].plan.name ? "outline" : "default"
                        }
                        onClick={()=> router.push("/pricing")}
                        className={`${plan.name === userDetails?.userPlans[0].plan.name ?'text-black': 'text-white'}`}
                        size="sm"
                      >
                        {plan.name === userDetails.userPlans[0].plan.name ? "Current" : "Upgrade"}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      className="w-full flex items-center justify-center"
                      variant="destructive"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};
