import { Button } from "@/components/ui/button";
import { BookmarkCheckIcon, BookmarkIcon, LogInIcon } from "lucide-react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useAddBookmark, useRemoveBookmark } from "../hooks/useQueries";

interface BookmarkButtonProps {
  lessonId: bigint;
  isBookmarked: boolean;
  "data-ocid"?: string;
  size?: "sm" | "default" | "icon";
  showLabel?: boolean;
}

export default function BookmarkButton({
  lessonId,
  isBookmarked,
  "data-ocid": dataOcid,
  size = "sm",
  showLabel = false,
}: BookmarkButtonProps) {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const addBookmark = useAddBookmark();
  const removeBookmark = useRemoveBookmark();

  const isPending = addBookmark.isPending || removeBookmark.isPending;

  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Sign in to save bookmarks", {
        description: "Use the Sign In button in the navigation to get started.",
        icon: <LogInIcon className="w-4 h-4" />,
      });
      return;
    }

    try {
      if (isBookmarked) {
        await removeBookmark.mutateAsync(lessonId);
        toast.success("Bookmark removed");
      } else {
        await addBookmark.mutateAsync(lessonId);
        toast.success("Lesson bookmarked!");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Button
      variant={isBookmarked ? "default" : "outline"}
      size={size}
      disabled={isPending}
      onClick={handleToggle}
      data-ocid={dataOcid}
      className={
        isBookmarked
          ? "bg-primary/20 border-primary/50 text-primary hover:bg-primary/30 transition-all"
          : "border-border/60 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all"
      }
      title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      {isBookmarked ? (
        <BookmarkCheckIcon className="w-4 h-4" />
      ) : (
        <BookmarkIcon className="w-4 h-4" />
      )}
      {showLabel && (
        <span className="ml-1.5">
          {isPending ? "..." : isBookmarked ? "Saved" : "Save"}
        </span>
      )}
    </Button>
  );
}
