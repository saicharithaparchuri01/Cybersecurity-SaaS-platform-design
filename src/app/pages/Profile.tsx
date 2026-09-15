import { useState } from "react";
import { User, Mail, Shield, Activity, AlertTriangle, Edit2, Save } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Progress } from "../components/ui/progress";
import { motion } from "motion/react";
import { toast } from "sonner";

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("john_doe");
  const [email, setEmail] = useState("john.doe@example.com");

  // Mock user data
  const userStats = {
    totalScans: 1247,
    scamsDetected: 342,
    riskExposure: 27.4,
    memberSince: "January 2025",
    accountLevel: "Premium",
  };

  const recentActivity = [
    { action: "Scanned message", result: "Scam Detected", time: "2 hours ago", risk: "High" },
    { action: "URL checked", result: "Safe", time: "5 hours ago", risk: "Low" },
    { action: "Scanned message", result: "Safe", time: "1 day ago", risk: "Low" },
    { action: "Scanned message", result: "Scam Detected", time: "2 days ago", risk: "Critical" },
    { action: "URL checked", result: "Scam Detected", time: "3 days ago", risk: "Medium" },
  ];

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low": return "text-green-500";
      case "Medium": return "text-yellow-500";
      case "High": return "text-orange-500";
      case "Critical": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-[#2563EB] bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="text-gray-400">Manage your account and view your security stats</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="backdrop-blur-xl bg-[#111827]/80 rounded-2xl border border-[#2563EB]/30 p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-1">@{username}</h2>
                <p className="text-gray-400 text-sm">{email}</p>
                <div className="mt-4 inline-block px-3 py-1 rounded-full bg-gradient-to-r from-[#2563EB]/20 to-[#7C3AED]/20 border border-[#2563EB]/30">
                  <span className="text-sm font-semibold">{userStats.accountLevel}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#0B1120]/50">
                  <span className="text-gray-400 text-sm">Member Since</span>
                  <span className="font-semibold">{userStats.memberSince}</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full border-[#2563EB]/30 text-white hover:bg-[#2563EB]/10"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>

            {/* Edit Form */}
            {isEditing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="backdrop-blur-xl bg-[#111827]/80 rounded-2xl border border-[#2563EB]/30 p-6 mt-6"
              >
                <h3 className="font-bold mb-4">Edit Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Username</label>
                    <Input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-[#0B1120]/50 border-[#2563EB]/30 focus:border-[#2563EB] text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email</label>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-[#0B1120]/50 border-[#2563EB]/30 focus:border-[#2563EB] text-white"
                    />
                  </div>
                  <Button
                    onClick={handleSave}
                    className="w-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:opacity-90"
                  >
                    Save Changes
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Stats and Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="backdrop-blur-xl bg-[#111827]/80 rounded-2xl border border-[#2563EB]/30 p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">{userStats.totalScans.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Total Scans</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="backdrop-blur-xl bg-[#111827]/80 rounded-2xl border border-[#2563EB]/30 p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">{userStats.scamsDetected}</div>
                <div className="text-sm text-gray-400">Scams Detected</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="backdrop-blur-xl bg-[#111827]/80 rounded-2xl border border-[#2563EB]/30 p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">{userStats.riskExposure}%</div>
                <div className="text-sm text-gray-400">Risk Exposure</div>
              </motion.div>
            </div>

            {/* Risk Exposure Meter */}
            <div className="backdrop-blur-xl bg-[#111827]/80 rounded-2xl border border-[#2563EB]/30 p-6">
              <h3 className="text-xl font-bold mb-4">Risk Exposure Level</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Your Risk Level</span>
                  <span className="text-2xl font-bold">{userStats.riskExposure}%</span>
                </div>
                <div className="relative h-4 bg-[#0B1120] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${userStats.riskExposure}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full"
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  You have a low to medium risk exposure. Continue using Kavach AI to stay protected.
                </p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="backdrop-blur-xl bg-[#111827]/80 rounded-2xl border border-[#2563EB]/30 p-6">
              <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-[#0B1120]/50 border border-[#2563EB]/20"
                  >
                    <div className="flex-1">
                      <div className="font-semibold mb-1">{activity.action}</div>
                      <div className="text-sm text-gray-400">{activity.time}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-semibold ${
                        activity.result === "Safe" ? "text-green-500" : "text-red-500"
                      }`}>
                        {activity.result}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getRiskColor(activity.risk)}`}>
                        {activity.risk}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
