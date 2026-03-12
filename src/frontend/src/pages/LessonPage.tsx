import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeftIcon, BookOpenIcon, Loader2, TagIcon } from "lucide-react";
import { motion } from "motion/react";
import BookmarkButton from "../components/BookmarkButton";
import {
  useGetBookmarkedLessonIds,
  useGetCategories,
  useGetLessonById,
} from "../hooks/useQueries";

function renderContent(content: string) {
  const sections = content.split(/\n\n+/);
  return sections.map((section) => {
    const sectionKey = section.slice(0, 40);
    if (section.startsWith("## ")) {
      return (
        <h3
          key={sectionKey}
          className="font-display font-bold text-xl text-foreground mt-8 mb-3"
        >
          {section.replace(/^## /, "")}
        </h3>
      );
    }
    if (section.startsWith("# ")) {
      return (
        <h2
          key={sectionKey}
          className="font-display font-bold text-2xl text-foreground mt-8 mb-3"
        >
          {section.replace(/^# /, "")}
        </h2>
      );
    }
    if (section.includes("\n- ") || section.startsWith("- ")) {
      const items = section
        .split("\n")
        .filter((l) => l.trim().startsWith("- "));
      return (
        <ul
          key={sectionKey}
          className="list-disc list-inside space-y-1.5 text-foreground/90 my-4 pl-2"
        >
          {items.map((item) => (
            <li key={item} className="text-base leading-relaxed">
              {item.replace(/^- /, "")}
            </li>
          ))}
        </ul>
      );
    }
    const lines = section.split("\n");
    return (
      <p
        key={sectionKey}
        className="text-base text-foreground/85 leading-[1.8] my-4"
      >
        {lines.map((line, j) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: stable content lines within a paragraph
          <span key={j}>
            {line}
            {j < lines.length - 1 && <br />}
          </span>
        ))}
      </p>
    );
  });
}

export default function LessonPage() {
  const { id } = useParams({ from: "/layout/lesson/$id" });
  const navigate = useNavigate();
  const lessonId = id ? BigInt(id) : null;

  const { data: lesson, isLoading, isError } = useGetLessonById(lessonId);
  const { data: bookmarkedIds = [] } = useGetBookmarkedLessonIds();
  const { data: categories } = useGetCategories();

  const bookmarkedSet = new Set(bookmarkedIds.map(String));
  const isBookmarked = lessonId
    ? bookmarkedSet.has(lessonId.toString())
    : false;

  const category = categories?.find(
    (c) => lesson && c.id === lesson.categoryId,
  );

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            lesson
              ? navigate({
                  to: "/category/$id",
                  params: { id: lesson.categoryId.toString() },
                })
              : navigate({ to: "/" })
          }
          data-ocid="lesson.back_button"
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          {category ? category.name : "Back"}
        </Button>
      </motion.div>

      {/* Loading */}
      {isLoading && (
        <div data-ocid="lesson.loading_state" className="max-w-3xl">
          <Skeleton className="w-3/4 h-10 mb-4 bg-muted/50" />
          <div className="flex gap-2 mb-6">
            <Skeleton className="w-16 h-6 rounded-full bg-muted/50" />
            <Skeleton className="w-20 h-6 rounded-full bg-muted/50" />
          </div>
          <Skeleton className="w-full h-4 mb-2 bg-muted/40" />
          <Skeleton className="w-5/6 h-4 mb-2 bg-muted/40" />
          <Skeleton className="w-full h-4 mb-2 bg-muted/40" />
          <Skeleton className="w-4/5 h-4 mb-8 bg-muted/40" />
          <div className="flex items-center gap-2 mt-2">
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">
              Loading lesson...
            </span>
          </div>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div
          data-ocid="lesson.error_state"
          className="rounded-xl border border-destructive/30 bg-destructive/10 p-8 text-center max-w-lg mx-auto"
        >
          <p className="text-destructive font-medium text-lg mb-1">
            Failed to load lesson
          </p>
          <p className="text-muted-foreground text-sm">
            Please go back and try again.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => navigate({ to: "/" })}
          >
            Go Home
          </Button>
        </div>
      )}

      {/* Not Found */}
      {!isLoading && !isError && !lesson && (
        <div className="rounded-xl border border-border/40 bg-muted/10 p-12 text-center max-w-lg mx-auto">
          <BookOpenIcon className="w-12 h-12 text-primary/30 mx-auto mb-4" />
          <p className="font-display font-semibold text-xl text-foreground/60 mb-2">
            Lesson not found
          </p>
          <Button variant="outline" size="sm" className="mt-2" asChild>
            <Link to="/">Go Home</Link>
          </Button>
        </div>
      )}

      {/* Lesson Content */}
      {!isLoading && !isError && lesson && (
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-3xl"
        >
          {/* Header */}
          <header className="mb-8">
            {/* Category breadcrumb */}
            {category && (
              <Link
                to="/category/$id"
                params={{ id: category.id.toString() }}
                className="text-xs text-primary/70 hover:text-primary font-medium tracking-wider uppercase transition-colors mb-3 block"
              >
                {category.name}
              </Link>
            )}

            {/* Title + bookmark */}
            <div className="flex items-start justify-between gap-4">
              <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground leading-[1.1]">
                {lesson.title}
              </h1>
              <BookmarkButton
                lessonId={lesson.id}
                isBookmarked={isBookmarked}
                data-ocid="lesson.bookmark_toggle"
                size="default"
                showLabel={true}
              />
            </div>

            {/* Short description */}
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {lesson.shortDescription}
            </p>

            {/* Tags */}
            {lesson.tags.length > 0 && (
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <TagIcon className="w-3.5 h-3.5 text-muted-foreground" />
                {lesson.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-border/60 text-muted-foreground bg-muted/30 text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </header>

          {/* Divider */}
          <div className="border-t border-border/30 mb-8" />

          {/* Body */}
          <div className="card-glass rounded-2xl p-6 md:p-8">
            {renderContent(lesson.content)}
          </div>

          {/* Footer navigation */}
          <div className="mt-10 flex items-center justify-between gap-4 pt-6 border-t border-border/30">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                navigate({
                  to: "/category/$id",
                  params: { id: lesson.categoryId.toString() },
                })
              }
              className="gap-2 border-border/60 hover:border-primary/40"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              More in {category?.name ?? "this category"}
            </Button>
            <BookmarkButton
              lessonId={lesson.id}
              isBookmarked={isBookmarked}
              data-ocid="lesson.bookmark_toggle"
              showLabel={true}
            />
          </div>
        </motion.article>
      )}
    </div>
  );
}
