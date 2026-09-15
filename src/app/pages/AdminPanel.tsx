import { Users, Activity, AlertTriangle, TrendingUp, Database, RefreshCw, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "motion/react";
import { toast } from "sonner";

export function AdminPanel() {
  // Mock admin data
  const adminStats = [
    { label: "Total Users", value: "12,847", change: "+15%", icon: Users, color: "from-blue-500 to-blue-600" },
    { label: "Total Scans", value: "456,234", change: "+23%", icon: Activity, color: "from-purple-500 to-purple-600" },
    { label: "Scams Detected", value: "124,567", change: "+18%", icon: AlertTriangle, color: "from-red-500 to-red-600" },
    { label: "Detection Rate", value: "99.2%", change: "+0.5%", icon: TrendingUp, color: "from-green-500 to-green-600" },
  ];

  const userGrowthData = [
    { month: "Jan", users: 8500 },
    { month: "Feb", users: 9200 },
    { month: "Mar", users: 10100 },
    { month: "Apr", users: 11000 },
    { month: "May", users: 11800 },
    { month: "Jun", users: 12847 },
  ];

  const scamTrendData = [
    { month: "Jan", scams: 18000 },
    { month: "Feb", scams: 21000 },
    { month: "Mar", scams: 19500 },
    { month: "Apr", scams: 23000 },
    { month: "May", scams: 25500 },
    { month: "Jun", scams: 28000 },
  ];

  const reportedScams = [
    { id: 1, type: "Phishing", description: "Fake banking website", status: "Under Review", priority: "High" },
    { id: 2, type: "Job Scam", description: "Fraudulent job posting", status: "Verified", priority: "Medium" },
    { id: 3, type: "Investment", description: "Pyramid scheme", status: "Under Review", priority: "Critical" },
    { id: 4, type: "Loan Scam", description: "Fake loan provider", status: "Resolved", priority: "Low" },
  ];

  const handleRetrainModel = () => {
    toast.success("Model retraining initiated. This may take several minutes.");
  };

  const handleExportData = () => {
    toast.success("Data export started. You'll receive a download link shortly.");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Under Review": return "text-yellow-500 bg-yellow-500/10 border-yellow-500/30";
      case "Verified": return "text-green-500 bg-green-500/10 border-green-500/30";
      case "Resolved": return "text-blue-500 bg-blue-500/10 border-blue-500/30";
      default: return "text-gray-500 bg-gray-500/10 border-gray-500/30";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "text-red-500";
      case "High": return "text-orange-500";
      case "Medium": return "text-yellow-500";
      case "Low": return "text-green-500";
      default: return "text-gray-500";
    }
  };

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-[#2563EB] bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-400">System overview and management tools</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-[#2563EB]/30 text-white hover:bg-[#2563EB]/10"
              onClick={handleExportData}
            >
              <Database className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button
              className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:opacity-90"
              onClick={handleRetrainModel}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retrain Model
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="backdrop-blur-xl bg-[#111827]/80 rounded-2xl border border-[#2563EB]/30 p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-500 text-sm font-semibold">{stat.change}</span>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* User Growth */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="backdrop-blur-xl bg-[#111827]/80 rounded-2xl border border-[#2563EB]/30 p-6"
          >
            <h3 className="text-xl font-bold mb-6">User Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(37, 99, 235, 0.1)" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111827', 
                    border: '1px solid rgba(37, 99, 235, 0.3)', 
                    borderRadius: '0.5rem',
                    color: '#F3F4F6'
                  }} 
                />
                <Line type="monotone" dataKey="users" stroke="#2563EB" strokeWidth={3} dot={{ fill: '#2563EB', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Scam Detection Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="backdrop-blur-xl bg-[#111827]/80 rounded-2xl border border-[#2563EB]/30 p-6"
          >
            <h3 className="text-xl font-bold mb-6">Scam Detection Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={scamTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(37, 99, 235, 0.1)" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111827', 
                    border: '1px solid rgba(37, 99, 235, 0.3)', 
                    borderRadius: '0.5rem',
                    color: '#F3F4F6'
                  }} 
                />
                <Bar dataKey="scams" fill="#DC2626" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Reported Scams Moderation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="backdrop-blur-xl bg-[#111827]/80 rounded-2xl border border-[#2563EB]/30 p-6"
        >
          <h3 className="text-xl font-bold mb-6">Reported Scams Moderation</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0B1120]/50 border-b border-[#2563EB]/20">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">ID</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Type</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Description</th>
                  <th className="text-center px-6 py-4 text-sm font-semibold text-gray-300">Priority</th>
                  <th className="text-center px-6 py-4 text-sm font-semibold text-gray-300">Status</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reportedScams.map((scam, index) => (
                  <motion.tr
                    key={scam.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="border-b border-[#2563EB]/10 hover:bg-[#2563EB]/5"
                  >
                    <td className="px-6 py-4 text-gray-400">#{scam.id}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs border ${
                        scam.type === "Phishing" ? "text-purple-400 border-purple-400/30 bg-purple-400/10" :
                        scam.type === "Job Scam" ? "text-orange-400 border-orange-400/30 bg-orange-400/10" :
                        scam.type === "Investment" ? "text-red-400 border-red-400/30 bg-red-400/10" :
                        "text-yellow-400 border-yellow-400/30 bg-yellow-400/10"
                      }`}>
                        {scam.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{scam.description}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`font-semibold ${getPriorityColor(scam.priority)}`}>
                        {scam.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs border ${getStatusColor(scam.status)}`}>
                        {scam.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-green-500/30 text-green-500 hover:bg-green-500/10"
                          onClick={() => toast.success("Scam report approved")}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                          onClick={() => toast.success("Scam report rejected")}
                        >
                          <AlertTriangle className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* System Health */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="backdrop-blur-xl bg-[#111827]/80 rounded-2xl border border-[#2563EB]/30 p-6 mt-6"
        >
          <h3 className="text-xl font-bold mb-6">System Health</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">API Response Time</span>
                <span className="text-green-500 font-semibold">98ms</span>
              </div>
              <div className="h-2 bg-[#0B1120] rounded-full overflow-hidden">
                <div className="h-full w-[95%] bg-green-500 rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Model Accuracy</span>
                <span className="text-green-500 font-semibold">99.2%</span>
              </div>
              <div className="h-2 bg-[#0B1120] rounded-full overflow-hidden">
                <div className="h-full w-[99%] bg-green-500 rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Server Uptime</span>
                <span className="text-green-500 font-semibold">99.9%</span>
              </div>
              <div className="h-2 bg-[#0B1120] rounded-full overflow-hidden">
                <div className="h-full w-[99.9%] bg-green-500 rounded-full" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
