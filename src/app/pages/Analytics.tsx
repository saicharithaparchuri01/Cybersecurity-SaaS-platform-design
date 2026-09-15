import { PieChart, Pie, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";
import { TrendingUp, Shield, AlertTriangle, Activity } from "lucide-react";
import { motion } from "motion/react";

export function Analytics() {
  // Mock data for charts
  const scamVsSafeData = [
    { name: "Scam", value: 342, color: "#DC2626" },
    { name: "Safe", value: 905, color: "#16A34A" },
  ];

  const scamCategoriesData = [
    { category: "Phishing", count: 125 },
    { category: "Job Scam", count: 89 },
    { category: "Loan Scam", count: 67 },
    { category: "Investment", count: 43 },
    { category: "Digital Arrest", count: 18 },
  ];

  const weeklyTrendData = [
    { day: "Mon", scams: 12, safe: 35 },
    { day: "Tue", scams: 19, safe: 42 },
    { day: "Wed", scams: 15, safe: 38 },
    { day: "Thu", scams: 22, safe: 45 },
    { day: "Fri", scams: 28, safe: 52 },
    { day: "Sat", scams: 18, safe: 41 },
    { day: "Sun", scams: 14, safe: 33 },
  ];

  const keywordFrequencyData = [
    { keyword: "urgent", count: 87 },
    { keyword: "verify", count: 76 },
    { keyword: "account", count: 65 },
    { keyword: "click", count: 54 },
    { keyword: "limited", count: 43 },
    { keyword: "winner", count: 38 },
    { keyword: "prize", count: 32 },
    { keyword: "confirm", count: 28 },
  ];

  const domainRiskData = [
    { domain: ".xyz", risk: 92 },
    { domain: ".ru", risk: 88 },
    { domain: ".tk", risk: 85 },
    { domain: ".cn", risk: 78 },
    { domain: ".com", risk: 35 },
  ];

  const stats = [
    { label: "Total Detections", value: "1,247", change: "+12%", icon: Activity, color: "from-blue-500 to-blue-600" },
    { label: "Accuracy Rate", value: "99.2%", change: "+0.5%", icon: Shield, color: "from-green-500 to-green-600" },
    { label: "Scams Blocked", value: "342", change: "+8%", icon: AlertTriangle, color: "from-red-500 to-red-600" },
    { label: "Active Users", value: "1.2K", change: "+15%", icon: TrendingUp, color: "from-purple-500 to-purple-600" },
  ];

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-[#2563EB] bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-gray-400">Comprehensive insights into scam detection patterns</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
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
          {/* Scam vs Safe Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="backdrop-blur-xl bg-[#111827]/80 rounded-2xl border border-[#2563EB]/30 p-6"
          >
            <h3 className="text-xl font-bold mb-6">Scam vs Safe Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={scamVsSafeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {scamVsSafeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111827', 
                    border: '1px solid rgba(37, 99, 235, 0.3)', 
                    borderRadius: '0.5rem',
                    color: '#F3F4F6'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Scam Categories Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="backdrop-blur-xl bg-[#111827]/80 rounded-2xl border border-[#2563EB]/30 p-6"
          >
            <h3 className="text-xl font-bold mb-6">Scam Categories</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={scamCategoriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(37, 99, 235, 0.1)" />
                <XAxis dataKey="category" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111827', 
                    border: '1px solid rgba(37, 99, 235, 0.3)', 
                    borderRadius: '0.5rem',
                    color: '#F3F4F6'
                  }} 
                />
                <Bar dataKey="count" fill="#2563EB" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Weekly Trend Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="backdrop-blur-xl bg-[#111827]/80 rounded-2xl border border-[#2563EB]/30 p-6 mb-6"
        >
          <h3 className="text-xl font-bold mb-6">Weekly Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(37, 99, 235, 0.1)" />
              <XAxis dataKey="day" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#111827', 
                  border: '1px solid rgba(37, 99, 235, 0.3)', 
                  borderRadius: '0.5rem',
                  color: '#F3F4F6'
                }} 
              />
              <Legend />
              <Line type="monotone" dataKey="scams" stroke="#DC2626" strokeWidth={2} dot={{ fill: '#DC2626' }} />
              <Line type="monotone" dataKey="safe" stroke="#16A34A" strokeWidth={2} dot={{ fill: '#16A34A' }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bottom Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Keyword Frequency */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="backdrop-blur-xl bg-[#111827]/80 rounded-2xl border border-[#2563EB]/30 p-6"
          >
            <h3 className="text-xl font-bold mb-6">Suspicious Keywords</h3>
            <div className="space-y-3">
              {keywordFrequencyData.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-300">{item.keyword}</span>
                      <span className="text-sm text-gray-400">{item.count}</span>
                    </div>
                    <div className="h-2 bg-[#0B1120] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.count / 87) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className="h-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Domain Risk Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="backdrop-blur-xl bg-[#111827]/80 rounded-2xl border border-[#2563EB]/30 p-6"
          >
            <h3 className="text-xl font-bold mb-6">Domain Risk Score</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={domainRiskData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(37, 99, 235, 0.1)" />
                <XAxis type="number" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <YAxis type="category" dataKey="domain" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111827', 
                    border: '1px solid rgba(37, 99, 235, 0.3)', 
                    borderRadius: '0.5rem',
                    color: '#F3F4F6'
                  }} 
                />
                <Bar dataKey="risk" fill="#DC2626" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
