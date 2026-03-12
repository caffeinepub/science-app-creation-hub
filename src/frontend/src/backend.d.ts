import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Lesson {
    id: bigint;
    categoryId: bigint;
    title: string;
    content: string;
    tags: Array<string>;
    shortDescription: string;
}
export interface UserProfile {
    name: string;
}
export interface Category {
    id: bigint;
    icon: string;
    name: string;
    description: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addBookmark(lessonId: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getBookmarkedLessonIds(): Promise<Array<bigint>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCategories(): Promise<Array<Category>>;
    getLessonById(lessonId: bigint): Promise<Lesson | null>;
    getLessonsByCategory(categoryId: bigint): Promise<Array<Lesson>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    initializeSeedData(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    removeBookmark(lessonId: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchLessons(keyword: string): Promise<Array<Lesson>>;
}
