import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";
import type { Lesson } from "../backend.d";
import BookmarkButton from "./BookmarkButton";

interface LessonCardProps {
  lesson: Lesson;
  isBookmarked: boolean;
  index?: number;
  "data-ocid"?: string;
}

export default function LessonCard({
  lesson,
  isBookmarked,
  index = 0,
  "data-ocid": dataOcid,
}: LessonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
      data-ocid={dataOcid}
      className="group relative"
    >
      {/* Bookmark button sits above the link, outside the anchor */}
      <div className="absolute top-3 right-3 z-10">
        <BookmarkButton
          lessonId={lesson.id}
          isBookmarked={isBookmarked}
          data-ocid="lesson.bookmark_toggle"
          size="icon"
        />
      </div>

      <Link
        to="/lesson/$id"
        params={{ id: lesson.id.toString() }}
        className="block h-full"
      >
        <div className="h-full card-glass rounded-xl p-5 flex flex-col gap-3 hover:border-primary/40 hover:shadow-glow-teal transition-all duration-300 cursor-pointer">
          {/* Title with right padding for the bookmark button */}
          <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2 pr-10">
            {lesson.title}
          </h3>

          {/* Short description */}
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1">
            {lesson.shortDescription}
          </p>

          {/* Tags + arrow */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="flex flex-wrap gap-1.5">
              {lesson.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs border-border/60 text-muted-foreground bg-muted/30 px-2 py-0.5"
                >
                  {tag}
                </Badge>
              ))}
              {lesson.tags.length > 3 && (
                <Badge
                  variant="outline"
                  className="text-xs border-border/40 text-muted-foreground/70"
                >
                  +{lesson.tags.length - 3}
                </Badge>
              )}
            </div>
            <ArrowRightIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
