import { useState } from "react";
import { MessageSquare, ThumbsUp, AlertTriangle, TrendingUp, Send, Shield, Users } from "lucide-react";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import { motion } from "motion/react";
import { toast } from "sonner";

interface ScamReport {
  id: string;
  title: string;
  description: string;
  type: string;
  author: string;
  timestamp: string;
  upvotes: number;
  comments: number;
}

export function Community() {
  const [reportTitle, setReportTitle] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [reportType, setReportType] = useState("");

  // Mock data
  const trendingScams = [
    { type: "Phishing", count: 234, trend: "+12%" },
    { type: "Job Scam", count: 187, trend: "+8%" },
    { type: "Investment", count: 156, trend: "+15%" },
    { type: "Loan Scam", count: 143, trend: "+5%" },
  ];

  const scamReports: ScamReport[] = [
    {
      id: "1",
      title: "Fake Job Offer from Tech Company",
      description: "Received an email claiming to be from a major tech company offering a remote job. They asked for payment for 'training materials' before starting.",
      type: "Job Scam",
      author: "Sarah K.",
      timestamp: "2 hours ago",
      upvotes: 45,
      comments: 12,
    },
    {
      id: "2",
      title: "Phishing Email Pretending to be Bank",
      description: "Got an urgent email saying my account was compromised. The link led to a fake banking website.",
      type: "Phishing",
      author: "Mike R.",
      timestamp: "5 hours ago",
      upvotes: 67,
      comments: 23,
    },
    {
      id: "3",
      title: "Investment Scheme Promise 300% Returns",
      description: "WhatsApp message promising guaranteed 300% returns in 30 days through cryptocurrency investment.",
      type: "Investment Scam",
      author: "Alex T.",
      timestamp: "1 day ago",
      upvotes: 89,
      comments: 34,
    },
    {
      id: "4",
      title: "Fake Scholarship Program",
      description: "Email about winning a scholarship but requires upfront payment for 'processing fees'.",
      type: "Scholarship Scam",
      author: "Priya M.",
      timestamp: "1 day ago",
      upvotes: 54,
      comments: 18,
    },
  ];

  const awarenessTips = [
    {
      icon: Shield,
      title: "Never Share OTP",
      description: "Legitimate companies will never ask for your OTP via call or message",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: AlertTriangle,
      title: "Verify Before Clicking",
      description: "Always verify URLs before clicking links in emails or messages",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Users,
      title: "Research Companies",
      description: "Research job offers and investment opportunities before committing",
      color: "from-green-500 to-green-600"
    },
  ];

  const handleSubmitReport = () => {
    if (!reportTitle.trim() || !reportDescription.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    toast.success("Report submitted successfully!");
    setReportTitle("");
    setReportDescription("");
    setReportType("");
  };

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-[#2563EB] bg-clip-text text-transparent">
            Community Hub
          </h1>
          <p className="text-gray-400">Report scams, share awareness, and help protect others</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Report Form */}
            <div className="backdrop-blur-xl bg-[#111827]/80 rounded-2xl border border-[#2563EB]/30 p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#2563EB]" />
                Report a Scam
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Title</label>
                  <Input
                    placeholder="Brief description of the scam"
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    className="bg-[#0B1120]/50 border-[#2563EB]/30 focus:border-[#2563EB] text-white placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Scam Type</label>
                  <Input
                    placeholder="e.g., Phishing, Job Scam, Investment"
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="bg-[#0B1120]/50 border-[#2563EB]/30 focus:border-[#2563EB] text-white placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Description</label>
                  <Textarea
                    placeholder="Provide details about the scam to help others..."
                    value={reportDescription}
                    onChange={(e) => setReportDescription(e.target.value)}
                    className="min-h-[120px] bg-[#0B1120]/50 border-[#2563EB]/30 focus:border-[#2563EB] text-white placeholder:text-gray-500 resize-none"
                  />
                </div>
                <Button
                  onClick={handleSubmitReport}
                  className="w-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:opacity-90"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Report
                </Button>
              </div>
            </div>

            {/* Recent Reports */}
            <div className="backdrop-blur-xl bg-[#111827]/80 rounded-2xl border border-[#2563EB]/30 p-6">
              <h3 className="text-xl font-bold mb-4">Recent Scam Reports</h3>
              <div className="space-y-4">
                {scamReports.map((report, index) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-[#2563EB]/20 rounded-xl p-4 hover:border-[#2563EB]/40 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{report.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full border ${
                        report.type === "Phishing" ? "text-purple-400 border-purple-400/30 bg-purple-400/10" :
                        report.type === "Job Scam" ? "text-orange-400 border-orange-400/30 bg-orange-400/10" :
                        report.type === "Investment Scam" ? "text-red-400 border-red-400/30 bg-red-400/10" :
                        "text-yellow-400 border-yellow-400/30 bg-yellow-400/10"
                      }`}>
                        {report.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{report.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4 text-gray-500">
                        <span>{report.author}</span>
                        <span>•</span>
                        <span>{report.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="flex items-center gap-1 hover:text-[#2563EB] transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{report.upvotes}</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-[#2563EB] transition-colors">
                          <MessageSquare className="w-4 h-4" />
                          <span>{report.comments}</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Scams */}
            <div className="backdrop-blur-xl bg-[#111827]/80 rounded-2xl border border-[#2563EB]/30 p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#2563EB]" />
                Trending Scams
              </h3>
              <div className="space-y-3">
                {trendingScams.map((scam, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#0B1120]/50 border border-[#2563EB]/20"
                  >
                    <div>
                      <div className="font-semibold">{scam.type}</div>
                      <div className="text-xs text-gray-400">{scam.count} reports</div>
                    </div>
                    <div className="text-green-500 text-sm font-semibold">{scam.trend}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Awareness Tips */}
            <div className="backdrop-blur-xl bg-[#111827]/80 rounded-2xl border border-[#2563EB]/30 p-6">
              <h3 className="text-xl font-bold mb-4">Safety Tips</h3>
              <div className="space-y-4">
                {awarenessTips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-3"
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tip.color} flex items-center justify-center flex-shrink-0`}>
                      <tip.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">{tip.title}</div>
                      <div className="text-xs text-gray-400">{tip.description}</div>
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
