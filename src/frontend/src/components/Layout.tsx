import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";
import { Link, Outlet, useNavigate, useRouter } from "@tanstack/react-router";
import {
  BookmarkIcon,
  FlaskConicalIcon,
  Loader2,
  MenuIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

function LoginButton() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: unknown) {
        const err = error as Error;
        if (err?.message === "User is already authenticated") {
          await clear();
          setTimeout(() => login(), 300);
        } else {
          console.error("Login error:", error);
        }
      }
    }
  };

  return (
    <Button
      onClick={handleAuth}
      disabled={isLoggingIn}
      variant={isAuthenticated ? "outline" : "default"}
      size="sm"
      data-ocid={isAuthenticated ? "nav.logout_button" : "nav.login_button"}
      className={
        isAuthenticated
          ? "border-border text-foreground hover:bg-muted"
          : "bg-primary text-primary-foreground hover:shadow-glow-teal transition-shadow"
      }
    >
      {isLoggingIn ? (
        <>
          <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
          Logging in...
        </>
      ) : isAuthenticated ? (
        "Sign Out"
      ) : (
        "Sign In"
      )}
    </Button>
  );
}

export default function Layout() {
  const navigate = useNavigate();
  const router = useRouter();
  const currentSearch =
    (router.state.location.search as { q?: string })?.q ?? "";
  const [searchQuery, setSearchQuery] = useState(currentSearch);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({ to: "/search", search: { q: searchQuery.trim() } });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen mesh-bg flex flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            data-ocid="nav.home_link"
            className="flex items-center gap-2.5 shrink-0 group"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:shadow-glow-teal transition-shadow">
              <FlaskConicalIcon className="w-4 h-4 text-primary" />
            </div>
            <span className="font-display font-bold text-lg hidden sm:block text-gradient-teal">
              SciHub
            </span>
          </Link>

          {/* Desktop Search */}
          <form
            onSubmit={handleSearch}
            className="flex-1 max-w-md hidden md:flex gap-2"
          >
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lessons, topics..."
                data-ocid="home.search_input"
                className="pl-9 bg-muted/50 border-border/60 placeholder:text-muted-foreground focus:border-primary/60 text-sm"
              />
            </div>
            <Button
              type="submit"
              size="sm"
              data-ocid="home.search_submit_button"
              className="bg-primary text-primary-foreground hover:shadow-glow-teal transition-shadow shrink-0"
            >
              Search
            </Button>
          </form>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            <Button variant="ghost" size="sm" asChild>
              <Link
                to="/bookmarks"
                data-ocid="nav.bookmarks_link"
                className="gap-1.5"
              >
                <BookmarkIcon className="w-4 h-4" />
                Bookmarks
              </Link>
            </Button>
            <LoginButton />
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <XIcon className="w-5 h-5" />
            ) : (
              <MenuIcon className="w-5 h-5" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl px-4 py-4 flex flex-col gap-3">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search lessons..."
                  className="pl-9 bg-muted/50 border-border/60 text-sm"
                />
              </div>
              <Button
                type="submit"
                size="sm"
                className="bg-primary text-primary-foreground"
              >
                Go
              </Button>
            </form>
            <div className="flex flex-col gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="justify-start"
                asChild
              >
                <Link
                  to="/bookmarks"
                  data-ocid="nav.bookmarks_link"
                  onClick={() => setMobileMenuOpen(false)}
                  className="gap-2"
                >
                  <BookmarkIcon className="w-4 h-4" />
                  Bookmarks
                </Link>
              </Button>
              <div className="pt-1">
                <LoginButton />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background/60 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FlaskConicalIcon className="w-4 h-4 text-primary" />
            <span className="font-display font-semibold text-sm text-gradient-teal">
              SciHub
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()}. Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary/80 hover:text-primary transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
