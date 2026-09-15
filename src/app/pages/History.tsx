import { useState } from "react";
import { Search, Filter, AlertTriangle, CheckCircle2, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { motion } from "motion/react";

interface HistoryItem {
  id: string;
  message: string;
  probability: number;
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  scamType: string;
  timestamp: string;
  isScam: boolean;
}

export function History() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "scam" | "safe">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock history data
  const mockHistory: HistoryItem[] = Array.from({ length: 25 }, (_, i) => {
    const isScam = Math.random() > 0.5;
    const probability = isScam ? Math.floor(Math.random() * 50) + 50 : Math.floor(Math.random() * 40);
    return {
      id: `scan-${i + 1}`,
      message: isScam 
        ? `URGENT! Your account will be blocked. Click here to verify immediately...`
        : `Hi, let's schedule our meeting for next week. Are you available on Tuesday?`,
      probability,
      riskLevel: probability < 25 ? "Low" : probability < 50 ? "Medium" : probability < 75 ? "High" : "Critical",
      scamType: isScam ? ["Phishing", "Job Scam", "Loan Scam", "Investment Scam"][Math.floor(Math.random() * 4)] : "Safe",
      timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      isScam,
    };
  });

  const filteredHistory = mockHistory.filter((item) => {
    if (filter === "scam" && !item.isScam) return false;
    if (filter === "safe" && item.isScam) return false;
    if (searchQuery && !item.message.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const paginatedHistory = filteredHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low": return "text-green-500 border-green-500/30 bg-green-500/10";
      case "Medium": return "text-yellow-500 border-yellow-500/30 bg-yellow-500/10";
      case "High": return "text-orange-500 border-orange-500/30 bg-orange-500/10";
      case "Critical": return "text-red-500 border-red-500/30 bg-red-500/10";
      default: return "text-gray-500 border-gray-500/30 bg-gray-500/10";
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric", 
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-[#2563EB] bg-clip-text text-transparent">
            Scan History
          </h1>
          <p className="text-gray-400">View and manage your previous scam detection scans</p>
        </div>

        {/* Filters */}
        <div className="backdrop-blur-xl bg-[#111827]/80 rounded-2xl border border-[#2563EB]/30 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search scans..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#0B1120]/50 border-[#2563EB]/30 focus:border-[#2563EB] text-white placeholder:text-gray-500"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                className={filter === "all" ? "bg-[#2563EB]" : "border-[#2563EB]/30 text-gray-400"}
              >
                <Filter className="w-4 h-4 mr-2" />
                All
              </Button>
              <Button
                variant={filter === "scam" ? "default" : "outline"}
                onClick={() => setFilter("scam")}
                className={filter === "scam" ? "bg-red-500 hover:bg-red-600" : "border-[#2563EB]/30 text-gray-400"}
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Scams
              </Button>
              <Button
                variant={filter === "safe" ? "default" : "outline"}
                onClick={() => setFilter("safe")}
                className={filter === "safe" ? "bg-green-500 hover:bg-green-600" : "border-[#2563EB]/30 text-gray-400"}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Safe
              </Button>
            </div>
          </div>
        </div>

        {/* History Table */}
        <div className="backdrop-blur-xl bg-[#111827]/80 rounded-2xl border border-[#2563EB]/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0B1120]/50 border-b border-[#2563EB]/20">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Message Preview</th>
                  <th className="text-center px-6 py-4 text-sm font-semibold text-gray-300">Probability</th>
                  <th className="text-center px-6 py-4 text-sm font-semibold text-gray-300">Risk Level</th>
                  <th className="text-center px-6 py-4 text-sm font-semibold text-gray-300">Type</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-300">Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {paginatedHistory.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-[#2563EB]/10 hover:bg-[#2563EB]/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        {item.isScam ? (
                          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        )}
                        <span className="text-gray-300 line-clamp-2">{item.message}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-semibold text-lg">{item.probability}%</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs border font-semibold ${getRiskColor(item.riskLevel)}`}>
                        {item.riskLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs border ${
                        item.scamType === "Phishing" ? "text-purple-400 border-purple-400/30 bg-purple-400/10" :
                        item.scamType === "Job Scam" ? "text-orange-400 border-orange-400/30 bg-orange-400/10" :
                        item.scamType === "Loan Scam" ? "text-yellow-400 border-yellow-400/30 bg-yellow-400/10" :
                        item.scamType === "Investment Scam" ? "text-red-400 border-red-400/30 bg-red-400/10" :
                        "text-green-400 border-green-400/30 bg-green-400/10"
                      }`}>
                        {item.scamType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 text-gray-400 text-sm">
                        <Calendar className="w-4 h-4" />
                        {formatDate(item.timestamp)}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-[#0B1120]/50 border-t border-[#2563EB]/20 flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredHistory.length)} of {filteredHistory.length} results
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="border-[#2563EB]/30 text-gray-400 disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className={currentPage === pageNum ? "bg-[#2563EB]" : "border-[#2563EB]/30 text-gray-400"}
                  >
                    {pageNum}
                  </Button>
                );
              })}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="border-[#2563EB]/30 text-gray-400 disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
