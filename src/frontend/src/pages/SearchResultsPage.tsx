import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowLeftIcon, SearchIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import LessonCard from "../components/LessonCard";
import {
  useGetBookmarkedLessonIds,
  useSearchLessons,
} from "../hooks/useQueries";

export default function SearchResultsPage() {
  const searchParams = useSearch({ from: "/layout/search" });
  const query = searchParams.q ?? "";
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const { data: lessons, isLoading, isError } = useSearchLessons(query);
  const { data: bookmarkedIds = [] } = useGetBookmarkedLessonIds();
  const bookmarkedSet = new Set(bookmarkedIds.map(String));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      navigate({ to: "/search", search: { q: inputValue.trim() } });
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Back */}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <Button variant="ghost" size="sm" asChild>
          <Link
            to="/"
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Home
          </Link>
        </Button>
      </motion.div>

      {/* Search form */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="font-display font-bold text-2xl mb-4">
          {query ? (
            <>
              Results for <span className="text-gradient-teal">"{query}"</span>
            </>
          ) : (
            "Search Lessons"
          )}
        </h1>
        <form onSubmit={handleSearch} className="flex gap-3 max-w-xl">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search by title, topic, or tag..."
              data-ocid="home.search_input"
              className="pl-10 bg-muted/40 border-border/60 placeholder:text-muted-foreground focus:border-primary/60"
            />
          </div>
          <Button
            type="submit"
            data-ocid="home.search_submit_button"
            className="bg-primary text-primary-foreground hover:shadow-glow-teal transition-shadow"
          >
            Search
          </Button>
        </form>
      </motion.div>

      <div className="border-t border-border/40 mb-8" />

      {/* Loading */}
      {isLoading && (
        <div
          data-ocid="search.loading_state"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"].map((k) => (
            <div key={k} className="card-glass rounded-xl p-5 h-48">
              <div className="flex justify-between mb-3">
                <Skeleton className="w-3/4 h-5 bg-muted/50" />
                <Skeleton className="w-8 h-8 rounded-md bg-muted/50" />
              </div>
              <Skeleton className="w-full h-4 mb-2 bg-muted/40" />
              <Skeleton className="w-5/6 h-4 mb-4 bg-muted/40" />
              <div className="flex gap-2">
                <Skeleton className="w-16 h-5 rounded-full bg-muted/50" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <div
          data-ocid="search.error_state"
          className="rounded-xl border border-destructive/30 bg-destructive/10 p-6 text-center"
        >
          <p className="text-destructive font-medium">Search failed</p>
          <p className="text-muted-foreground text-sm mt-1">
            Please try a different search term.
          </p>
        </div>
      )}

      {/* No query */}
      {!query && !isLoading && (
        <div className="rounded-xl border border-border/40 bg-muted/10 p-12 text-center">
          <SearchIcon className="w-10 h-10 text-primary/30 mx-auto mb-3" />
          <p className="font-display font-semibold text-lg text-foreground/60">
            Enter a search term above
          </p>
        </div>
      )}

      {/* Empty results */}
      {query && !isLoading && !isError && lessons?.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          data-ocid="search.empty_state"
          className="rounded-xl border border-border/40 bg-muted/10 p-12 text-center max-w-lg mx-auto"
        >
          <SearchIcon className="w-10 h-10 text-primary/30 mx-auto mb-3" />
          <p className="font-display font-semibold text-xl text-foreground/60 mb-2">
            No results found
          </p>
          <p className="text-muted-foreground text-sm">
            Try searching for a different topic or keyword.
          </p>
        </motion.div>
      )}

      {/* Results */}
      <AnimatePresence>
        {!isLoading && !isError && (lessons?.length ?? 0) > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-sm text-muted-foreground mb-5">
              <span className="text-foreground font-medium">
                {lessons!.length}
              </span>{" "}
              result
              {lessons!.length !== 1 ? "s" : ""} found
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {lessons!.map((lesson, idx) => (
                <LessonCard
                  key={lesson.id.toString()}
                  lesson={lesson}
                  isBookmarked={bookmarkedSet.has(lesson.id.toString())}
                  index={idx}
                  data-ocid={`search.lesson.item.${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
