import { Link } from "react-router";
import { Shield, Brain, Globe, Zap, CheckCircle, TrendingUp, Users, Lock } from "lucide-react";
import { Button } from "../components/ui/button";
import { motion } from "motion/react";

export function Landing() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0B1120]/80 border-b border-[#2563EB]/20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold">Fraudlens</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-white hover:text-[#2563EB]">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:opacity-90">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2563EB]/10 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#2563EB]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#7C3AED]/20 rounded-full blur-[120px]" />
        
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/30 mb-6">
              <Zap className="w-4 h-4 text-[#2563EB]" />
              <span className="text-sm">AI-Powered Scam Detection</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent leading-tight">
              AI-Powered Protection<br />Against Digital Scams
            </h1>
            
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Intelligent Multi-Layer Scam Detection System using NLP, Machine Learning,
              and URL Risk Analysis to keep you safe from digital threats.
            </p>
            
            <div className="flex items-center justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:opacity-90 text-lg px-8">
                  Try Demo
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-[#2563EB] text-white hover:bg-[#2563EB]/10 text-lg px-8">
                  Login
                </Button>
              </Link>
            </div>

            {/* Hero Image/Illustration */}
            <div className="mt-16 relative">
              <div className="relative max-w-4xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/20 to-[#7C3AED]/20 rounded-3xl blur-3xl" />
                <div className="relative backdrop-blur-xl bg-[#111827]/60 rounded-3xl border border-[#2563EB]/30 p-8">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-4">
                      <div className="h-12 bg-gradient-to-r from-[#2563EB]/20 to-transparent rounded-lg" />
                      <div className="h-32 bg-gradient-to-br from-[#DC2626]/20 to-[#DC2626]/5 rounded-lg border border-[#DC2626]/30 flex items-center justify-center">
                        <Shield className="w-12 h-12 text-[#DC2626]" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-20 bg-[#16A34A]/10 rounded-lg border border-[#16A34A]/30 flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-[#16A34A]" />
                      </div>
                      <div className="h-20 bg-[#2563EB]/10 rounded-lg border border-[#2563EB]/30 flex items-center justify-center">
                        <Brain className="w-8 h-8 text-[#2563EB]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-gray-400 text-lg">Advanced AI technology to protect you from digital threats</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Brain,
                title: "NLP-Based Detection",
                description: "Advanced natural language processing to identify scam patterns and suspicious content"
              },
              {
                icon: Globe,
                title: "URL Analysis",
                description: "Deep domain analysis, shortened link detection, and TLD risk assessment"
              },
              {
                icon: TrendingUp,
                title: "Scam Probability Scoring",
                description: "Real-time risk scoring from 0-100% with detailed explanations"
              },
              {
                icon: Lock,
                title: "Multi-Language Support",
                description: "Detect scams in multiple languages including English, Hindi, and Telugu"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="backdrop-blur-xl bg-[#111827]/60 rounded-2xl border border-[#2563EB]/20 p-6 hover:border-[#2563EB]/50 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto">
          <div className="backdrop-blur-xl bg-gradient-to-r from-[#2563EB]/10 to-[#7C3AED]/10 rounded-3xl border border-[#2563EB]/20 p-12">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent mb-2">
                  99.2%
                </div>
                <div className="text-gray-400">Detection Accuracy</div>
              </div>
              <div>
                <div className="text-5xl font-bold bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent mb-2">
                  500K+
                </div>
                <div className="text-gray-400">Scams Detected</div>
              </div>
              <div>
                <div className="text-5xl font-bold bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent mb-2">
                  100K+
                </div>
                <div className="text-gray-400">Protected Users</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Protect Yourself?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust Fraudlens to keep them safe from digital scams
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:opacity-90 text-lg px-12">
                Get Started Free
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[#2563EB]/20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <span className="font-semibold">Fraudlens</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2026 Fraudlens. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}