import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BookmarkIcon, LogInIcon } from "lucide-react";
import { motion } from "motion/react";
import LessonCard from "../components/LessonCard";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useGetBookmarkedLessonIds,
  useGetLessonsByIds,
} from "../hooks/useQueries";

function LoginPrompt() {
  const { login, loginStatus } = useInternetIdentity();
  const isLoggingIn = loginStatus === "logging-in";

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
        <LogInIcon className="w-8 h-8 text-primary" />
      </div>
      <h2 className="font-display font-bold text-2xl text-foreground mb-2">
        Sign in to view bookmarks
      </h2>
      <p className="text-muted-foreground text-base max-w-sm mb-8">
        Your saved lessons are tied to your account. Sign in to access them from
        any device.
      </p>
      <Button
        onClick={login}
        disabled={isLoggingIn}
        data-ocid="bookmarks.login_button"
        className="bg-primary text-primary-foreground px-8 py-2.5 rounded-xl hover:shadow-glow-teal transition-shadow"
      >
        {isLoggingIn ? "Signing in..." : "Sign In"}
      </Button>
    </div>
  );
}

export default function BookmarksPage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const {
    data: bookmarkedIds = [],
    isLoading: idsLoading,
    isError: idsError,
  } = useGetBookmarkedLessonIds();

  const {
    data: lessons = [],
    isLoading: lessonsLoading,
    isError: lessonsError,
  } = useGetLessonsByIds(bookmarkedIds);

  const isLoading = idsLoading || (bookmarkedIds.length > 0 && lessonsLoading);
  const isError = idsError || lessonsError;

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4">
        <LoginPrompt />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
            <BookmarkIcon className="w-5 h-5 text-primary" />
          </div>
          <h1 className="font-display font-bold text-3xl text-foreground">
            Bookmarks
          </h1>
        </div>
        <p className="text-muted-foreground text-sm ml-12">
          Your saved lessons for quick reference
        </p>
      </motion.div>

      <div className="border-t border-border/40 mb-8" />

      {/* Error */}
      {isError && (
        <div
          data-ocid="bookmarks.error_state"
          className="rounded-xl border border-destructive/30 bg-destructive/10 p-6 text-center"
        >
          <p className="text-destructive font-medium">
            Failed to load bookmarks
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            Please refresh and try again.
          </p>
        </div>
      )}

      {/* Loading */}
      {isLoading && !isError && (
        <div
          data-ocid="bookmarks.loading_state"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {["sk1", "sk2", "sk3", "sk4"].map((k) => (
            <div key={k} className="card-glass rounded-xl p-5 h-48">
              <div className="flex justify-between mb-3">
                <Skeleton className="w-3/4 h-5 bg-muted/50" />
                <Skeleton className="w-8 h-8 rounded-md bg-muted/50" />
              </div>
              <Skeleton className="w-full h-4 mb-2 bg-muted/40" />
              <Skeleton className="w-5/6 h-4 mb-4 bg-muted/40" />
              <div className="flex gap-2">
                <Skeleton className="w-16 h-5 rounded-full bg-muted/50" />
                <Skeleton className="w-20 h-5 rounded-full bg-muted/50" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !isError && lessons.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          data-ocid="bookmarks.empty_state"
          className="rounded-2xl border border-border/40 bg-muted/10 p-16 text-center max-w-md mx-auto mt-8"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5">
            <BookmarkIcon className="w-8 h-8 text-primary/50" />
          </div>
          <p className="font-display font-semibold text-xl text-foreground/70 mb-2">
            No saved lessons yet
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Bookmark lessons while you explore to save them here for later.
          </p>
        </motion.div>
      )}

      {/* Lessons grid */}
      {!isLoading && !isError && lessons.length > 0 && (
        <>
          <p className="text-sm text-muted-foreground mb-5">
            <span className="text-foreground font-medium">
              {lessons.length}
            </span>{" "}
            saved lesson
            {lessons.length !== 1 ? "s" : ""}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {lessons.map((lesson, idx) => (
              <LessonCard
                key={lesson.id.toString()}
                lesson={lesson}
                isBookmarked={true}
                index={idx}
                data-ocid={`bookmarks.lesson.item.${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
