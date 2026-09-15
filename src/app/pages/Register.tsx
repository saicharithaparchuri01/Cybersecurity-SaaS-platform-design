import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Shield, Mail, Lock, User } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { motion } from "motion/react";

export function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock registration - navigate to dashboard
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#2563EB]/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#7C3AED]/20 rounded-full blur-[120px]" />

      {/* Logo */}
      <Link to="/" className="absolute top-6 left-6 flex items-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center">
          <Shield className="w-6 h-6" />
        </div>
        <span className="text-xl font-bold">Fraudlens</span>
      </Link>

      {/* Register Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="backdrop-blur-xl bg-[#111827]/80 rounded-3xl border border-[#2563EB]/30 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-gray-400">Join Fraudlens to protect yourself from scams</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 bg-[#0B1120]/50 border-[#2563EB]/30 focus:border-[#2563EB] text-white placeholder:text-gray-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-[#0B1120]/50 border-[#2563EB]/30 focus:border-[#2563EB] text-white placeholder:text-gray-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-[#0B1120]/50 border-[#2563EB]/30 focus:border-[#2563EB] text-white placeholder:text-gray-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 bg-[#0B1120]/50 border-[#2563EB]/30 focus:border-[#2563EB] text-white placeholder:text-gray-500"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:opacity-90 text-lg py-6"
            >
              Create Account
            </Button>

            <div className="text-center text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-[#2563EB] hover:text-[#7C3AED] transition-colors font-semibold">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}