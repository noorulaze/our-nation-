import { z } from "zod";

export const postSchema = z.object({
  communityId: z.string().uuid("Invalid community ID"),
  content: z.string().min(3, "Post must be at least 3 characters").max(2500, "Post cannot exceed 2500 characters"),
  mediaUrls: z.array(z.string().url("Invalid image URL")).max(4, "Maximum 4 images allowed").default([]),
});

export const commentSchema = z.object({
  postId: z.string().uuid("Invalid post ID"),
  content: z.string().min(1, "Comment cannot be empty").max(600, "Comment cannot exceed 600 characters"),
});

export const eventSchema = z.object({
  communityId: z.string().uuid("Invalid community ID"),
  title: z.string().min(3, "Title must be at least 3 characters").max(120),
  titleMl: z.string().max(150).optional().nullable(),
  description: z.string().min(10, "Description must be at least 10 characters").max(3000),
  category: z.string().min(2, "Category is required"),
  locationName: z.string().min(3, "Location name is required").max(150),
  latitude: z.number().min(-90).max(90).optional().nullable(),
  longitude: z.number().min(-180).max(180).optional().nullable(),
  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), "Valid start date is required"),
  endDate: z.string().optional().nullable().refine((val) => !val || !isNaN(Date.parse(val)), "Invalid end date"),
  imageUrl: z.string().url("Invalid image URL").optional().nullable(),
  organizerName: z.string().min(2, "Organizer name is required").max(100),
  contactPhone: z.string().regex(/^[0-9+ -]{7,15}$/, "Invalid phone format").optional().nullable(),
  contactEmail: z.string().email("Invalid email").optional().nullable(),
});

export const businessSchema = z.object({
  communityId: z.string().uuid("Invalid community ID"),
  name: z.string().min(2, "Business name is required").max(120),
  nameMl: z.string().max(150).optional().nullable(),
  category: z.string().min(2, "Category is required"),
  description: z.string().min(10, "Description must be at least 10 characters").max(3000),
  address: z.string().min(5, "Address must be at least 5 characters").max(250),
  latitude: z.number().min(-90).max(90).optional().nullable(),
  longitude: z.number().min(-180).max(180).optional().nullable(),
  phone: z.string().min(7, "Valid phone number is required").max(20),
  email: z.string().email("Invalid email").optional().nullable(),
  website: z.string().url("Invalid website URL").optional().nullable().or(z.literal("")),
  openingHours: z.record(z.string()).optional().nullable(),
  imageUrl: z.string().url("Invalid image URL").optional().nullable(),
});

export const announcementSchema = z.object({
  communityId: z.string().uuid("Invalid community ID"),
  title: z.string().min(3, "Title must be at least 3 characters").max(150),
  titleMl: z.string().max(180).optional().nullable(),
  content: z.string().min(10, "Content must be at least 10 characters").max(5000),
  category: z.string().min(2, "Category is required"),
  isOfficial: z.boolean().default(true),
  publisherOrganization: z.string().min(2, "Publisher organization required").max(120),
  imageUrl: z.string().url().optional().nullable(),
  expiresAt: z.string().optional().nullable(),
});

export const issueReportSchema = z.object({
  communityId: z.string().uuid("Invalid community ID"),
  title: z.string().min(5, "Title must be at least 5 characters").max(140),
  description: z.string().min(15, "Please describe the problem in detail (min 15 characters)").max(2000),
  category: z.enum(["roads", "waste_management", "water", "public_facilities", "environment", "other"]),
  locationName: z.string().min(3, "Landmark or location is required").max(150),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  imageUrl: z.string().url("Invalid image URL").optional().nullable(),
});

export const profileUpdateSchema = z.object({
  displayName: z.string().min(2, "Display name must be at least 2 characters").max(60),
  bio: z.string().max(300, "Bio cannot exceed 300 characters").optional().nullable(),
  preferredLanguage: z.enum(["ml", "en"]),
  selectedCommunityId: z.string().uuid().optional().nullable(),
  interests: z.array(z.string()).optional(),
});

export const moderationActionSchema = z.object({
  status: z.enum(["approved", "rejected", "removed", "under_review", "acknowledged", "in_progress", "resolved"]),
  reason: z.string().max(300).optional(),
});

export const naaduAiQuerySchema = z.object({
  query: z.string().min(1, "Query cannot be empty").max(1000, "Query cannot exceed 1000 characters"),
  communityId: z.string().optional().nullable(),
  language: z.enum(["ml", "en"]).default("en"),
  userId: z.string().optional().nullable(),
  userName: z.string().optional().nullable(),
});
