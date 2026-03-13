import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Crown, Menu, ShieldCheck, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Stores", href: "/stores" },
  { label: "Promotions", href: "/promotions" },
  { label: "Events", href: "/events" },
];

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const { actor, isFetching } = useActor();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isLoggedIn = loginStatus === "success" && !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  const { data: isAdmin } = useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching && isLoggedIn,
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 border-b border-gold-dim bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group"
              data-ocid="nav.link"
            >
              <div className="w-8 h-8 rounded-full gradient-gold flex items-center justify-center shadow-gold-sm">
                <Crown className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display text-lg md:text-xl font-bold text-gradient-gold">
                Grand Plaza
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    currentPath === link.href
                      ? "text-gold bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                  data-ocid="nav.link"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Auth */}
            <div className="hidden md:flex items-center gap-3">
              {isAdmin && (
                <Badge className="bg-gold/20 text-gold border-gold-dim gap-1">
                  <ShieldCheck className="w-3 h-3" /> Admin
                </Badge>
              )}
              {isLoggedIn ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clear}
                  className="border-gold-dim text-gold hover:bg-gold/10"
                  data-ocid="nav.button"
                >
                  Sign Out
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={login}
                  disabled={isLoggingIn}
                  className="gradient-gold text-primary-foreground font-semibold hover:opacity-90 shadow-gold-sm"
                  data-ocid="nav.primary_button"
                >
                  {isLoggingIn ? "Signing in..." : "Sign In"}
                </Button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="md:hidden p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-ocid="nav.toggle"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-gold-dim overflow-hidden"
            >
              <div className="px-4 py-3 space-y-1 bg-background">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPath === link.href
                        ? "text-gold bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-2 flex flex-col gap-2">
                  {isLoggedIn ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        clear();
                        setMobileOpen(false);
                      }}
                      className="border-gold-dim text-gold"
                      data-ocid="nav.button"
                    >
                      Sign Out
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => {
                        login();
                        setMobileOpen(false);
                      }}
                      disabled={isLoggingIn}
                      className="gradient-gold text-primary-foreground font-semibold"
                      data-ocid="nav.primary_button"
                    >
                      {isLoggingIn ? "Signing in..." : "Sign In"}
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-navy-deep border-t border-gold-dim mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full gradient-gold flex items-center justify-center">
                  <Crown className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-display text-xl font-bold text-gradient-gold">
                  Grand Plaza Mall
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                The premier shopping destination in the heart of the city.
                Luxury brands, gourmet dining, and world-class entertainment —
                all under one roof.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">
                Explore
              </h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-gold text-sm transition-colors"
                      data-ocid="nav.link"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">
                Hours
              </h4>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>Mon – Fri: 10am – 10pm</li>
                <li>Sat – Sun: 10am – 11pm</li>
                <li className="text-gold mt-2">📍 1 Grand Plaza Ave</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gold-dim mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-xs">
              © {new Date().getFullYear()} Grand Plaza Mall. All rights
              reserved.
            </p>
            <p className="text-muted-foreground text-xs">
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
