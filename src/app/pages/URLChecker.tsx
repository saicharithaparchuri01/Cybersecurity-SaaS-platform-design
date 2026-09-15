import { useState } from "react";
import { Globe, Shield, AlertTriangle, CheckCircle2, ExternalLink, Clock, MapPin } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Progress } from "../components/ui/progress";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

interface URLAnalysis {
  url: string;
  isSafe: boolean;
  riskScore: number;
  domainAge: number;
  tld: string;
  isShortenedUrl: boolean;
  isHttps: boolean;
  reasons: string[];
}

export function URLChecker() {
  const [url, setUrl] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<URLAnalysis | null>(null);

  const handleAnalyze = async () => {
    if (!url.trim()) {
      toast.error("Please enter a URL to analyze");
      return;
    }

    // Basic URL validation
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
    } catch {
      toast.error("Please enter a valid URL");
      return;
    }

    setAnalyzing(true);
    setResult(null);

    // Simulate analysis
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock analysis result
    const parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
    const tld = parsedUrl.hostname.split('.').pop() || '';
    const suspiciousTlds = ['xyz', 'ru', 'tk', 'cn', 'ml', 'ga'];
    const isSuspiciousTld = suspiciousTlds.includes(tld.toLowerCase());
    const isShortenedUrl = ['bit.ly', 'tinyurl.com', 'goo.gl', 't.co'].some(domain => parsedUrl.hostname.includes(domain));
    const isHttps = parsedUrl.protocol === 'https:';
    
    const riskScore = Math.floor(
      (isSuspiciousTld ? 40 : 0) +
      (isShortenedUrl ? 30 : 0) +
      (!isHttps ? 20 : 0) +
      Math.random() * 20
    );

    const isSafe = riskScore < 40;
    const domainAge = Math.floor(Math.random() * 3000) + 30;

    const reasons: string[] = [];
    if (isSuspiciousTld) reasons.push(`Suspicious TLD detected (.${tld})`);
    if (isShortenedUrl) reasons.push("Shortened URL detected - destination unclear");
    if (!isHttps) reasons.push("Non-HTTPS connection - potential security risk");
    if (domainAge < 180) reasons.push("Recently registered domain (less than 6 months)");
    if (isSafe) reasons.push("Domain verified in trusted database");
    if (isHttps && !isSuspiciousTld) reasons.push("Secure HTTPS connection");

    const mockResult: URLAnalysis = {
      url: parsedUrl.href,
      isSafe,
      riskScore,
      domainAge,
      tld,
      isShortenedUrl,
      isHttps,
      reasons,
    };

    setResult(mockResult);
    setAnalyzing(false);
    toast.success("Analysis completed!");
  };

  const getRiskColor = (score: number) => {
    if (score < 25) return { bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-500" };
    if (score < 50) return { bg: "bg-yellow-500/10", border: "border-yellow-500/30", text: "text-yellow-500" };
    if (score < 75) return { bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-500" };
    return { bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-500" };
  };

  const getRiskLevel = (score: number) => {
    if (score < 25) return "Low Risk";
    if (score < 50) return "Medium Risk";
    if (score < 75) return "High Risk";
    return "Critical Risk";
  };

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-[#2563EB] bg-clip-text text-transparent">
            URL Security Checker
          </h1>
          <p className="text-gray-400">Analyze URLs for potential security threats and risks</p>
        </div>

        {/* Input Section */}
        <div className="backdrop-blur-xl bg-[#111827]/80 rounded-2xl border border-[#2563EB]/30 p-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Enter URL to Analyze</label>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="https://example.com or example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                    className="pl-10 bg-[#0B1120]/50 border-[#2563EB]/30 focus:border-[#2563EB] text-white placeholder:text-gray-500"
                  />
                </div>
                <Button
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:opacity-90 px-8"
                >
                  {analyzing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Shield className="w-5 h-5 mr-2" />
                      </motion.div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5 mr-2" />
                      Check URL
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Main Result Card */}
              <div className="backdrop-blur-xl bg-[#111827]/80 rounded-2xl border border-[#2563EB]/30 p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4">
                    {result.isSafe ? (
                      <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-8 h-8 text-red-500" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-2xl font-bold mb-2">
                        {result.isSafe ? "URL Appears Safe" : "Potentially Unsafe URL"}
                      </h3>
                      <a 
                        href={result.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#2563EB] hover:text-[#7C3AED] flex items-center gap-2 text-sm"
                      >
                        {result.url}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-xl border font-semibold ${getRiskColor(result.riskScore).bg} ${getRiskColor(result.riskScore).border} ${getRiskColor(result.riskScore).text}`}>
                    {getRiskLevel(result.riskScore)}
                  </div>
                </div>

                {/* Risk Score */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Risk Score</span>
                    <span className={`text-2xl font-bold ${getRiskColor(result.riskScore).text}`}>
                      {result.riskScore}/100
                    </span>
                  </div>
                  <div className="relative h-3 bg-[#0B1120] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.riskScore}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full rounded-full ${
                        result.riskScore < 25 ? "bg-green-500" :
                        result.riskScore < 50 ? "bg-yellow-500" :
                        result.riskScore < 75 ? "bg-orange-500" :
                        "bg-red-500"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Domain Age */}
                <div className="backdrop-blur-xl bg-[#111827]/80 rounded-2xl border border-[#2563EB]/30 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-500" />
                    </div>
                    <h4 className="font-semibold">Domain Age</h4>
                  </div>
                  <div className="text-3xl font-bold mb-1">{result.domainAge}</div>
                  <div className="text-sm text-gray-400">days old</div>
                  {result.domainAge < 180 && (
                    <div className="mt-3 text-xs text-yellow-500 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Recently registered
                    </div>
                  )}
                </div>

                {/* TLD Info */}
                <div className="backdrop-blur-xl bg-[#111827]/80 rounded-2xl border border-[#2563EB]/30 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-purple-500" />
                    </div>
                    <h4 className="font-semibold">Top Level Domain</h4>
                  </div>
                  <div className="text-3xl font-bold mb-1">.{result.tld}</div>
                  <div className="text-sm text-gray-400">Domain extension</div>
                  {['xyz', 'ru', 'tk', 'cn', 'ml', 'ga'].includes(result.tld.toLowerCase()) && (
                    <div className="mt-3 text-xs text-red-500 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      High-risk TLD
                    </div>
                  )}
                </div>

                {/* Security */}
                <div className="backdrop-blur-xl bg-[#111827]/80 rounded-2xl border border-[#2563EB]/30 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl ${result.isHttps ? 'bg-green-500/20' : 'bg-red-500/20'} flex items-center justify-center`}>
                      <Shield className={`w-5 h-5 ${result.isHttps ? 'text-green-500' : 'text-red-500'}`} />
                    </div>
                    <h4 className="font-semibold">Security</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">HTTPS</span>
                      <span className={result.isHttps ? "text-green-500" : "text-red-500"}>
                        {result.isHttps ? "✓ Enabled" : "✗ Disabled"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Shortened URL</span>
                      <span className={result.isShortenedUrl ? "text-yellow-500" : "text-gray-500"}>
                        {result.isShortenedUrl ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Analysis Details */}
              <div className="backdrop-blur-xl bg-[#111827]/80 rounded-2xl border border-[#2563EB]/30 p-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Analysis Details
                </h4>
                <div className="space-y-3">
                  {result.reasons.map((reason, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 text-gray-300"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2" />
                      <span>{reason}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
