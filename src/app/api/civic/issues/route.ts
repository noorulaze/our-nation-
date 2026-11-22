import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { 
  civicStore, 
  CIVIC_CATEGORIES, 
  getCategoryById, 
  getTanurWardName 
} from "@/lib/data/civicConnectData";

// Validation Schema for Civic Complaint Submission
const createIssueSchema = z.object({
  title: z.string().trim().min(5, "Title must be at least 5 characters long").max(200, "Title cannot exceed 200 characters"),
  category_id: z.string().refine(val => !!getCategoryById(val), {
    message: "Invalid civic issue category",
  }),
  subcategory: z.string().trim().optional(),
  description: z.string().trim().min(15, "Description must be at least 15 characters long").max(3000, "Description cannot exceed 3000 characters"),
  ward_number: z.number().int().min(1, "Ward number must be between 1 and 45").max(45, "Ward number must be between 1 and 45"),
  ward_name: z.string().trim().optional(),
  address_landmark: z.string().trim().min(3, "Please specify a recognizable address or landmark"),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  images: z.array(z.string().url("Image URL must be valid")).optional().default([]),
  contact_preference: z.enum(["in_app", "phone", "email", "none"]).optional().default("in_app"),
  priority: z.enum(["low", "medium", "high", "urgent"]).optional().default("medium"),
  is_anonymous: z.boolean().optional().default(false),
  reporter_name: z.string().trim().optional(),
  reporter_id: z.string().trim().optional(),
  reporter_contact: z.string().trim().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = createIssueSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Validation failed", 
          errors: validated.error.flatten().fieldErrors 
        },
        { status: 400 }
      );
    }

    const data = validated.data;
    const cat = getCategoryById(data.category_id);
    const resolvedSubcategory = data.subcategory || (cat?.subcategories[0] ?? "General");
    const resolvedWardName = data.ward_name || getTanurWardName(data.ward_number);

    // Save issue via civicStore
    const newIssue = civicStore.submitIssue({
      title: data.title,
      description: data.description,
      category_id: cat ? cat.id : data.category_id,
      subcategory: resolvedSubcategory,
      ward_number: data.ward_number,
      ward_name: resolvedWardName,
      address_landmark: data.address_landmark,
      latitude: data.latitude,
      longitude: data.longitude,
      images: data.images,
      contact_preference: data.contact_preference,
      priority: data.priority,
      is_anonymous: data.is_anonymous,
      reporter_name: data.is_anonymous ? "Anonymous Resident" : (data.reporter_name || "Resident"),
      reporter_id: data.reporter_id || "usr-anon",
      reporter_contact: data.reporter_contact,
      district: "Malappuram",
      locality: "Tanur Municipality",
      jurisdiction_type: "municipality",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Civic issue submitted successfully",
        tracking_id: newIssue.tracking_id,
        issue: {
          id: newIssue.id,
          tracking_id: newIssue.tracking_id,
          title: newIssue.title,
          category_id: newIssue.category_id,
          subcategory: newIssue.subcategory,
          ward_number: newIssue.ward_number,
          ward_name: newIssue.ward_name,
          address_landmark: newIssue.address_landmark,
          status: newIssue.status,
          created_at: newIssue.created_at,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting civic issue:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error occurred while processing report" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const wardParam = searchParams.get("ward");
    const categoryParam = searchParams.get("category");
    const statusParam = searchParams.get("status");
    const searchParam = searchParams.get("search")?.toLowerCase().trim();
    const reporterIdParam = searchParams.get("reporter_id");

    let issues = civicStore.getIssues();

    if (wardParam && wardParam !== "all") {
      const wardNum = parseInt(wardParam, 10);
      if (!isNaN(wardNum)) {
        issues = issues.filter(i => i.ward_number === wardNum);
      }
    }

    if (categoryParam && categoryParam !== "all") {
      issues = issues.filter(i => i.category_id === categoryParam);
    }

    if (statusParam && statusParam !== "all") {
      issues = issues.filter(i => i.status === statusParam);
    }

    if (reporterIdParam) {
      issues = issues.filter(i => i.reporter_id === reporterIdParam);
    }

    if (searchParam) {
      issues = issues.filter(i => 
        i.tracking_id.toLowerCase().includes(searchParam) ||
        i.title.toLowerCase().includes(searchParam) ||
        i.address_landmark.toLowerCase().includes(searchParam) ||
        (i.ward_name && i.ward_name.toLowerCase().includes(searchParam))
      );
    }

    // Mask private citizen contact information for public endpoint
    const sanitizedIssues = issues.map(issue => {
      const isOwner = reporterIdParam && issue.reporter_id === reporterIdParam;
      return {
        ...issue,
        reporter_contact: isOwner ? issue.reporter_contact : undefined,
        reporter_name: issue.is_anonymous ? "Anonymous Resident" : issue.reporter_name,
      };
    });

    return NextResponse.json({
      success: true,
      count: sanitizedIssues.length,
      issues: sanitizedIssues,
    });
  } catch (error) {
    console.error("Error retrieving civic issues:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error occurred while retrieving reports" },
      { status: 500 }
    );
  }
}
