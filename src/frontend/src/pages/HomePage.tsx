import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRightIcon,
  AtomIcon,
  BookOpenIcon,
  CodeIcon,
  FlaskConicalIcon,
  SearchIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useGetCategories } from "../hooks/useQueries";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  flask: <FlaskConicalIcon className="w-8 h-8" />,
  code: <CodeIcon className="w-8 h-8" />,
  atom: <AtomIcon className="w-8 h-8" />,
  book: <BookOpenIcon className="w-8 h-8" />,
  default: <FlaskConicalIcon className="w-8 h-8" />,
};

const CATEGORY_GRADIENTS = [
  "from-primary/20 to-primary/5",
  "from-accent/20 to-accent/5",
];

function getIcon(icon: string) {
  return CATEGORY_ICONS[icon] ?? CATEGORY_ICONS.default;
}

export default function HomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: categories, isLoading, isError } = useGetCategories();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({ to: "/search", search: { q: searchQuery.trim() } });
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Decorative orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.04] blur-3xl"
        style={{ background: "oklch(0.72 0.18 195)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-32 right-0 w-[400px] h-[400px] rounded-full opacity-[0.04] blur-3xl"
        style={{ background: "oklch(0.78 0.16 75)" }}
      />

      {/* ── Hero Section ─────────────────────────────────────────────── */}
      <section className="relative container mx-auto px-4 pt-16 pb-20">
        <div className="relative z-10 max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Badge
              variant="outline"
              className="mb-5 border-primary/40 text-primary bg-primary/10 text-xs font-body tracking-wider uppercase px-3 py-1"
            >
              Interactive Learning Platform
            </Badge>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="font-display font-bold text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight mb-6"
          >
            Explore <span className="text-gradient-teal">Science.</span>
            <br />
            Learn to Build <span className="text-gradient-gold">Apps.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-lg text-muted-foreground max-w-xl leading-relaxed mb-10"
          >
            From quantum mechanics to mobile development — structured lessons
            that take you from curious to capable.
          </motion.p>

          {/* Search Bar */}
          <motion.form
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            onSubmit={handleSearch}
            className="flex gap-3 max-w-xl"
          >
            <div className="relative flex-1">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lessons, topics, tags..."
                data-ocid="home.search_input"
                className="pl-12 h-12 bg-muted/40 border-border/60 text-base placeholder:text-muted-foreground focus:border-primary/60 focus:shadow-glow-teal transition-shadow rounded-xl"
              />
            </div>
            <Button
              type="submit"
              data-ocid="home.search_submit_button"
              className="h-12 px-6 bg-primary text-primary-foreground font-semibold rounded-xl hover:shadow-glow-teal transition-shadow"
            >
              Search
            </Button>
          </motion.form>
        </div>

        {/* Hero banner image — right side, overlapping */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="hidden lg:block absolute top-8 right-0 w-[520px] h-[300px] rounded-2xl overflow-hidden border border-border/30 shadow-card-dark"
        >
          <img
            src="/assets/generated/hero-science-banner.dim_1600x500.jpg"
            alt="Science & Technology visualization"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/30 to-transparent" />
        </motion.div>
      </section>

      {/* ── Categories Section ────────────────────────────────────────── */}
      <section className="container mx-auto px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="mb-8"
        >
          <h2 className="font-display font-bold text-2xl text-foreground mb-1">
            Learning Paths
          </h2>
          <p className="text-muted-foreground text-sm">
            Choose a category to start exploring
          </p>
        </motion.div>

        {/* Loading */}
        {isLoading && (
          <div
            data-ocid="home.loading_state"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {[1, 2].map((i) => (
              <div key={i} className="card-glass rounded-xl p-6 h-48">
                <Skeleton className="w-12 h-12 rounded-xl mb-4 bg-muted/50" />
                <Skeleton className="w-2/3 h-6 mb-2 bg-muted/50" />
                <Skeleton className="w-full h-4 bg-muted/40" />
                <Skeleton className="w-3/4 h-4 mt-2 bg-muted/40" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div
            data-ocid="home.error_state"
            className="rounded-xl border border-destructive/30 bg-destructive/10 p-6 text-center"
          >
            <p className="text-destructive font-medium">
              Failed to load categories
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Please refresh the page to try again.
            </p>
          </div>
        )}

        {/* Category Cards */}
        <AnimatePresence>
          {!isLoading && !isError && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(categories ?? []).map((category, idx) => (
                <motion.div
                  key={category.id.toString()}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                  data-ocid={`home.category.item.${idx + 1}`}
                >
                  <Link
                    to="/category/$id"
                    params={{ id: category.id.toString() }}
                    className="block group"
                  >
                    <div
                      className={`card-glass rounded-xl p-6 flex gap-5 items-start hover:border-primary/40 hover:shadow-glow-teal transition-all duration-300 bg-gradient-to-br ${CATEGORY_GRADIENTS[idx % CATEGORY_GRADIENTS.length]} cursor-pointer`}
                    >
                      {/* Icon */}
                      <div
                        className="shrink-0 w-14 h-14 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary group-hover:shadow-glow-teal transition-shadow animate-float"
                        style={{ animationDelay: `${idx * 1.5}s` }}
                      >
                        {getIcon(category.icon)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-display font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                            {category.name}
                          </h3>
                          <ArrowRightIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-0.5" />
                        </div>
                        <p className="text-muted-foreground text-sm mt-1.5 leading-relaxed">
                          {category.description}
                        </p>
                        <p className="text-xs text-primary/70 mt-3 font-medium tracking-wide uppercase">
                          Explore lessons →
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}

              {/* Empty state */}
              {categories?.length === 0 && (
                <div className="col-span-2 rounded-xl border border-border/40 bg-muted/20 p-12 text-center">
                  <FlaskConicalIcon className="w-12 h-12 text-primary/40 mx-auto mb-4" />
                  <p className="font-display font-semibold text-lg text-foreground/70 mb-1">
                    Loading content...
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Lessons are being set up. Refresh in a moment.
                  </p>
                </div>
              )}
            </div>
          )}
        </AnimatePresence>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto text-center"
        >
          {[
            { label: "Categories", value: "2+" },
            { label: "Lessons", value: "12+" },
            { label: "Topics", value: "30+" },
          ].map((stat) => (
            <div key={stat.label} className="card-glass rounded-xl p-4">
              <p className="font-display font-bold text-2xl text-gradient-teal">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
