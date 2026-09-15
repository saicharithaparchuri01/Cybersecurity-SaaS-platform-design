import { useState } from "react";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  Scan, 
  TrendingUp,
  AlertCircle,
  Activity,
  Database
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import { Progress } from "../components/ui/progress";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

interface ScanResult {
  isScam: boolean;
  probability: number;
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  scamType?: string;
  reasons: string[];
  suspiciousWords: string[];
}

export function Dashboard() {
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  // Mock stats
  const stats = [
    { label: "Total Scans", value: "1,247", icon: Activity, color: "from-blue-500 to-blue-600" },
    { label: "Scams Detected", value: "342", icon: AlertTriangle, color: "from-red-500 to-red-600" },
    { label: "Risk Exposure", value: "27.4%", icon: TrendingUp, color: "from-yellow-500 to-yellow-600" },
    { label: "Most Common", value: "Phishing", icon: Database, color: "from-purple-500 to-purple-600" },
  ];

  const handleScan = async () => {
    if (!message.trim() && !url.trim()) {
      toast.error("Please enter a message or URL to scan");
      return;
    }

    setScanning(true);
    setResult(null);

    // Simulate scanning with mock ML analysis
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Mock result generation
    const mockProbability = Math.random() * 100;
    const isScam = mockProbability > 40;
    
    let riskLevel: "Low" | "Medium" | "High" | "Critical";
    if (mockProbability < 25) riskLevel = "Low";
    else if (mockProbability < 50) riskLevel = "Medium";
    else if (mockProbability < 75) riskLevel = "High";
    else riskLevel = "Critical";

    const scamTypes = ["Phishing", "Job Scam", "Loan Scam", "Investment Scam", "Digital Arrest", "Scholarship Scam"];
    
    const mockResult: ScanResult = {
      isScam,
      probability: Math.round(mockProbability),
      riskLevel,
      scamType: isScam ? scamTypes[Math.floor(Math.random() * scamTypes.length)] : undefined,
      reasons: isScam ? [
        "Urgency language detected",
        "Financial request identified",
        "Suspicious domain pattern",
        "Shortened URL detected",
      ] : [
        "No suspicious patterns found",
        "Legitimate domain verified",
        "Natural language structure",
      ],
      suspiciousWords: isScam ? ["urgent", "click", "verify", "limited", "account"] : [],
    };

    setResult(mockResult);
    setScanning(false);
    toast.success("Scan completed!");
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low": return "text-green-500 border-green-500/30 bg-green-500/10";
      case "Medium": return "text-yellow-500 border-yellow-500/30 bg-yellow-500/10";
      case "High": return "text-orange-500 border-orange-500/30 bg-orange-500/10";
      case "Critical": return "text-red-500 border-red-500/30 bg-red-500/10";
      default: return "text-gray-500 border-gray-500/30 bg-gray-500/10";
    }
  };

  const getProgressColor = (probability: number) => {
    if (probability < 25) return "bg-green-500";
    if (probability < 50) return "bg-yellow-500";
    if (probability < 75) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-[#2563EB] bg-clip-text text-transparent">
            Scam Detection Dashboard
          </h1>
          <p className="text-gray-400">Analyze messages and URLs for potential scams using AI</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Scan Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Scan Input Card */}
            <div className="backdrop-blur-xl bg-[#111827]/80 rounded-2xl border border-[#2563EB]/30 p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Message to Scan</label>
                  <Textarea
                    placeholder="Paste the suspicious message, email, or text here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[120px] bg-[#0B1120]/50 border-[#2563EB]/30 focus:border-[#2563EB] text-white placeholder:text-gray-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">URL (Optional)</label>
                  <Input
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="bg-[#0B1120]/50 border-[#2563EB]/30 focus:border-[#2563EB] text-white placeholder:text-gray-500"
                  />
                </div>

                <Button
                  onClick={handleScan}
                  disabled={scanning}
                  className="w-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:opacity-90 text-lg py-6 relative overflow-hidden"
                >
                  {scanning ? (
                    <>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <Scan className="w-5 h-5 mr-2 animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5 mr-2" />
                      Scan Message
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Results Section */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="backdrop-blur-xl bg-[#111827]/80 rounded-2xl border border-[#2563EB]/30 p-6 space-y-6"
                >
                  {/* Result Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {result.isScam ? (
                        <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                          <AlertTriangle className="w-6 h-6 text-red-500" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                        </div>
                      )}
                      <div>
                        <h3 className="text-xl font-bold">
                          {result.isScam ? "Potential Scam Detected" : "Message Appears Safe"}
                        </h3>
                        {result.scamType && (
                          <span className={`inline-block px-3 py-1 rounded-full text-xs border mt-1 ${
                            result.scamType === "Phishing" ? "text-purple-400 border-purple-400/30 bg-purple-400/10" :
                            result.scamType === "Job Scam" ? "text-orange-400 border-orange-400/30 bg-orange-400/10" :
                            result.scamType === "Loan Scam" ? "text-yellow-400 border-yellow-400/30 bg-yellow-400/10" :
                            result.scamType === "Investment Scam" ? "text-red-400 border-red-400/30 bg-red-400/10" :
                            result.scamType === "Digital Arrest" ? "text-pink-400 border-pink-400/30 bg-pink-400/10" :
                            "text-blue-400 border-blue-400/30 bg-blue-400/10"
                          }`}>
                            {result.scamType}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-xl border font-semibold ${getRiskColor(result.riskLevel)}`}>
                      {result.riskLevel}
                    </div>
                  </div>

                  {/* Probability Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Scam Probability</span>
                      <span className="text-2xl font-bold">{result.probability}%</span>
                    </div>
                    <div className="relative h-3 bg-[#0B1120] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.probability}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full rounded-full ${getProgressColor(result.probability)}`}
                      />
                    </div>
                  </div>

                  {/* Reasons */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Analysis Details
                    </h4>
                    <div className="space-y-2">
                      {result.reasons.map((reason, index) => (
                        <div key={index} className="flex items-start gap-2 text-gray-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2" />
                          <span className="text-sm">{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Suspicious Words */}
                  {result.suspiciousWords.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Suspicious Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.suspiciousWords.map((word, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
                          >
                            {word}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="backdrop-blur-xl bg-[#111827]/80 rounded-2xl border border-[#2563EB]/30 p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
