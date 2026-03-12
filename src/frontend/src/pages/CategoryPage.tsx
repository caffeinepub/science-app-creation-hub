import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeftIcon,
  AtomIcon,
  BookOpenIcon,
  CodeIcon,
  FlaskConicalIcon,
} from "lucide-react";
import { motion } from "motion/react";
import LessonCard from "../components/LessonCard";
import {
  useGetBookmarkedLessonIds,
  useGetCategories,
  useGetLessonsByCategory,
} from "../hooks/useQueries";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  flask: <FlaskConicalIcon className="w-6 h-6" />,
  code: <CodeIcon className="w-6 h-6" />,
  atom: <AtomIcon className="w-6 h-6" />,
  book: <BookOpenIcon className="w-6 h-6" />,
  default: <BookOpenIcon className="w-6 h-6" />,
};

export default function CategoryPage() {
  const { id } = useParams({ from: "/layout/category/$id" });
  const navigate = useNavigate();
  const categoryId = id ? BigInt(id) : null;

  const { data: categories, isLoading: categoriesLoading } = useGetCategories();
  const {
    data: lessons,
    isLoading: lessonsLoading,
    isError,
  } = useGetLessonsByCategory(categoryId);
  const { data: bookmarkedIds = [] } = useGetBookmarkedLessonIds();

  const category = categories?.find((c) => c.id === categoryId);
  const bookmarkedSet = new Set(bookmarkedIds.map(String));

  const isLoading = categoriesLoading || lessonsLoading;

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Back button */}
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
            All Categories
          </Link>
        </Button>
      </motion.div>

      {/* Category Header */}
      {isLoading ? (
        <div data-ocid="category.loading_state" className="mb-10">
          <Skeleton className="w-12 h-12 rounded-xl mb-4 bg-muted/50" />
          <Skeleton className="w-64 h-8 mb-2 bg-muted/50" />
          <Skeleton className="w-96 h-4 bg-muted/40" />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shrink-0">
              {CATEGORY_ICONS[category?.icon ?? "default"] ??
                CATEGORY_ICONS.default}
            </div>
            <div>
              <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-2">
                {category?.name ?? "Category"}
              </h1>
              <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
                {category?.description}
              </p>
            </div>
          </div>

          {/* Lesson count */}
          {lessons && (
            <div className="mt-4 flex items-center gap-2">
              <BookOpenIcon className="w-4 h-4 text-primary/70" />
              <span className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">
                  {lessons.length}
                </span>{" "}
                lesson
                {lessons.length !== 1 ? "s" : ""} available
              </span>
            </div>
          )}
        </motion.div>
      )}

      {/* Divider */}
      <div className="border-t border-border/40 mb-8" />

      {/* Error */}
      {isError && (
        <div
          data-ocid="category.error_state"
          className="rounded-xl border border-destructive/30 bg-destructive/10 p-6 text-center"
        >
          <p className="text-destructive font-medium">Failed to load lessons</p>
          <p className="text-muted-foreground text-sm mt-1">
            Please refresh the page to try again.
          </p>
        </div>
      )}

      {/* Lessons Loading Skeletons */}
      {lessonsLoading && !isError && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
                <Skeleton className="w-20 h-5 rounded-full bg-muted/50" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!lessonsLoading && !isError && lessons?.length === 0 && (
        <div
          data-ocid="category.empty_state"
          className="rounded-xl border border-border/40 bg-muted/10 p-16 text-center"
        >
          <BookOpenIcon className="w-12 h-12 text-primary/30 mx-auto mb-4" />
          <p className="font-display font-semibold text-xl text-foreground/60 mb-2">
            No lessons yet
          </p>
          <p className="text-muted-foreground text-sm">
            Check back soon — lessons are being added.
          </p>
        </div>
      )}

      {/* Lessons Grid */}
      {!lessonsLoading && !isError && (lessons?.length ?? 0) > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {lessons!.map((lesson, idx) => (
            <LessonCard
              key={lesson.id.toString()}
              lesson={lesson}
              isBookmarked={bookmarkedSet.has(lesson.id.toString())}
              index={idx}
              data-ocid={`category.lesson.item.${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Back to home link at bottom */}
      {!isLoading && (
        <div className="mt-12 pt-8 border-t border-border/30">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate({ to: "/" })}
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to all categories
          </Button>
        </div>
      )}
    </div>
  );
}
