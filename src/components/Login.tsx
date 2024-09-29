"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";
import { showToast } from "./ui/toast";

const AnimatedIllustration = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.circle
        cx="200"
        cy="200"
        r="80"
        stroke="#000000"
        strokeWidth="20"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <motion.path
        d="M200 120 L200 280 M120 200 L280 200"
        stroke="#000000"
        strokeWidth="20"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 2,
          delay: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </svg>
  );
};

export default function LogInComp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loginMethod, setLoginMethod] = useState("password");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(300); // Initial time in seconds (5 minutes)
  const [isActive, setIsActive] = useState(true); // Track if countdown is active

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1); // Decrease time by 1 second
      }, 1000);
    }

    if (timeLeft === 0) {
      setIsActive(false); // Stop countdown when time reaches 0
    }

    return () => {
      if (interval) clearInterval(interval); // Cleanup interval on unmount
    };
  }, [isActive, timeLeft]);

  const handleStartCountdown = () => {
    setTimeLeft(300); // Reset countdown to 5 minutes
    setIsActive(true); // Start the countdown
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (loginMethod === "password" && (!email || !password)) {
      setError("Please fill in all fields");
      return;
    }

    if (loginMethod === "otp" && (!email || !otp)) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      if (loginMethod === "password") {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
          const data = await res.json();
          showToast("success", data.message);
          setEmail("");
          setPassword("");
          setLoading(false);
          localStorage.setItem("accessTokenFD", data.token);
          router.push("/admin/dashboard");
        } else {
          setLoading(false);
          showToast("error", "invalid credential");
        }
      } else {
        const res = await fetch("/api/auth/verify-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        });

        if (res.ok) {
          const data = await res.json();
          localStorage.setItem("accessTokenFD", data.token);
          showToast("success", data.message);
          router.push("./admin/dashboard");
        } else {
          showToast("error", "Something went wrong");
        }
      }
      setLoading(false);
    } catch (err: any) {
      console.error(err);
      setLoading(false);
      setError(err);
      showToast("error", err);
    }
  };

  const handleSendOtp = async () => {
    if (!email) {
      setError("Please enter your email to receive OTP");
      return;
    }
    try {
      setLoading(true);
      handleStartCountdown();
      setSuccess("");
      const res = await fetch("/api/auth/request-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        const data = await res.json();
        showToast("success", data.message);
        setSuccess("An OTP sent to you mail address");
        setLoading(false);
      } else {
        const data = await res.json();
        showToast("error", data.message);
        setLoading(false);
      }
    } catch (err: any) {
      showToast("error", err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <ToastContainer position="top-right" autoClose={5000} />
      {/* White section with simple animation */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Link
            href="/"
            className="text-3xl font-bold mb-8 block text-center text-black"
          >
            FormFlow
          </Link>
          <AnimatedIllustration />
        </motion.div>
      </div>

      {/* Black section with login form */}
      <div className="w-full md:w-1/2 bg-black text-white flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Log in to your account
          </h2>
          <Tabs
            defaultValue="password"
            onValueChange={(value: any) => setLoginMethod(value)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="otp">OTP</TabsTrigger>
            </TabsList>
            <TabsContent value="password">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                    className="pl-10 bg-white bg-opacity-10 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-white bg-opacity-10 border-gray-600 text-white placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button
                  loading={loading}
                  type="submit"
                  className="w-full bg-white text-black hover:bg-gray-200 transition-colors"
                >
                  Log in
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="otp">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                    className="pl-10 bg-white bg-opacity-10 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>

                <Button
                  loading={loading}
                  type="button"
                  onClick={handleSendOtp}
                  className="w-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                >
                  Send OTP
                </Button>
                <div className="relative">
                  <Smartphone
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <Input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e: any) => {
                      setOtp(e.target.value);
                    }}
                    className="pl-10 bg-white bg-opacity-10 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                {success && timeLeft !== 0 && (
                  <span className="text-[12px] text-green-500">
                    {success}, It will be expire in{" "}
                    <b
                      className={`text-white ${
                        timeLeft < 25 && "text-red-500"
                      }`}
                    >
                      {formatTime(timeLeft)}
                    </b>
                  </span>
                )}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button
                  loading={loading}
                  type="submit"
                  className="w-full bg-white text-black hover:bg-gray-200 transition-colors"
                >
                  Log in with OTP
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          <div className="mt-4 text-center">
            <Link
              href="/forgot-password"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Forgot your password?
            </Link>
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link href="/signup" className="text-white hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
