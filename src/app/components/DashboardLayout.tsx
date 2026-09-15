import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { 
  Shield, 
  LayoutDashboard, 
  History, 
  BarChart3, 
  Globe, 
  Users, 
  User, 
  LogOut, 
  Menu,
  X,
  ChevronDown
} from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";

export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState("English");

  const navItems = [
    { path: "/app", label: "Dashboard", icon: LayoutDashboard },
    { path: "/app/history", label: "History", icon: History },
    { path: "/app/analytics", label: "Analytics", icon: BarChart3 },
    { path: "/app/url-checker", label: "URL Checker", icon: Globe },
    { path: "/app/community", label: "Community", icon: Users },
    { path: "/app/profile", label: "Profile", icon: User },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#111827]/90 border-b border-[#2563EB]/20">
        <div className="px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/app" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold hidden md:block">Fraudlens</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant="ghost"
                    className={`relative ${
                      isActive
                        ? "text-white bg-[#2563EB]/20"
                        : "text-gray-400 hover:text-white hover:bg-[#2563EB]/10"
                    }`}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#2563EB] to-[#7C3AED]"
                      />
                    )}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0B1120]/50 border border-[#2563EB]/20">
              <span className="text-sm">{language}</span>
              <ChevronDown className="w-4 h-4" />
            </div>

            {/* Logout */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="hidden md:flex text-gray-400 hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-[#2563EB]/20 bg-[#0B1120]"
            >
              <div className="px-6 py-4 space-y-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)}>
                      <div
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                          isActive
                            ? "bg-[#2563EB]/20 text-white"
                            : "text-gray-400 hover:bg-[#2563EB]/10 hover:text-white"
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </div>
                    </Link>
                  );
                })}
                <div className="pt-2 border-t border-[#2563EB]/20">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#DC2626]/10 hover:text-[#DC2626] w-full"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        <Outlet />
      </main>
    </div>
  );
}