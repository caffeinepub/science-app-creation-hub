import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Category, Lesson } from "../backend.d";
import { useActor } from "./useActor";

// ─── Categories ──────────────────────────────────────────────────────────────

export function useGetCategories() {
  const { actor, isFetching: actorFetching } = useActor();
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategories();
    },
    enabled: !!actor && !actorFetching,
  });
}

// ─── Lessons by Category ─────────────────────────────────────────────────────

export function useGetLessonsByCategory(categoryId: bigint | null) {
  const { actor, isFetching: actorFetching } = useActor();
  return useQuery<Lesson[]>({
    queryKey: ["lessonsByCategory", categoryId?.toString()],
    queryFn: async () => {
      if (!actor || categoryId === null) return [];
      return actor.getLessonsByCategory(categoryId);
    },
    enabled: !!actor && !actorFetching && categoryId !== null,
  });
}

// ─── Single Lesson ───────────────────────────────────────────────────────────

export function useGetLessonById(lessonId: bigint | null) {
  const { actor, isFetching: actorFetching } = useActor();
  return useQuery<Lesson | null>({
    queryKey: ["lesson", lessonId?.toString()],
    queryFn: async () => {
      if (!actor || lessonId === null) return null;
      return actor.getLessonById(lessonId);
    },
    enabled: !!actor && !actorFetching && lessonId !== null,
  });
}

// ─── Search ──────────────────────────────────────────────────────────────────

export function useSearchLessons(keyword: string) {
  const { actor, isFetching: actorFetching } = useActor();
  return useQuery<Lesson[]>({
    queryKey: ["searchLessons", keyword],
    queryFn: async () => {
      if (!actor || !keyword.trim()) return [];
      return actor.searchLessons(keyword.trim());
    },
    enabled: !!actor && !actorFetching && keyword.trim().length > 0,
  });
}

// ─── Bookmarks ───────────────────────────────────────────────────────────────

export function useGetBookmarkedLessonIds() {
  const { actor, isFetching: actorFetching } = useActor();
  return useQuery<bigint[]>({
    queryKey: ["bookmarkedLessonIds"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBookmarkedLessonIds();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useAddBookmark() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (lessonId: bigint) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.addBookmark(lessonId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarkedLessonIds"] });
    },
  });
}

export function useRemoveBookmark() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (lessonId: bigint) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.removeBookmark(lessonId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarkedLessonIds"] });
    },
  });
}

// ─── Multiple lessons by IDs (for bookmarks page) ───────────────────────────

export function useGetLessonsByIds(lessonIds: bigint[]) {
  const { actor, isFetching: actorFetching } = useActor();
  return useQuery<Lesson[]>({
    queryKey: ["lessonsByIds", lessonIds.map(String).join(",")],
    queryFn: async () => {
      if (!actor || lessonIds.length === 0) return [];
      const results = await Promise.all(
        lessonIds.map((id) => actor.getLessonById(id)),
      );
      return results.filter((l): l is Lesson => l !== null);
    },
    enabled: !!actor && !actorFetching && lessonIds.length > 0,
  });
}

// ─── Seed Data Initialization ─────────────────────────────────────────────────

export function useInitializeSeedData() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.initializeSeedData();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["lessonsByCategory"] });
    },
  });
}
