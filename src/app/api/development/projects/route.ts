import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { digitalMunicipalityStore } from "@/lib/data/digitalMunicipalityData";
import { ProjectCategory, ProjectStatus } from "@/types/digitalMunicipality";

const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.enum([
    "roads_transportation",
    "drainage_water",
    "drinking_water",
    "waste_management",
    "education",
    "healthcare",
    "public_infrastructure",
    "parks_public_spaces",
    "other_development",
    "roads_transport",
    "water_drainage",
    "public_facilities",
    "environment",
    "streetlights",
    "community_infrastructure"
  ]),
  ward_number: z.number().int().min(1).max(45).optional(),
  locality: z.string().optional(),
  department: z.string().min(2, "Department is required"),
  official_source_name: z.string().min(2, "Official source name is required"),
  official_source_url: z.string().url("Must be a valid URL"),
  budget_sanctioned: z.string().min(1, "Budget is required"),
  approved_budget: z.string().optional(),
  estimated_cost: z.string().optional(),
  actual_expenditure: z.string().optional(),
  funding_source: z.string().optional(),
  announcement_date: z.string().optional(),
  approval_date: z.string().optional(),
  start_date: z.string().optional(),
  expected_completion_date: z.string().optional(),
  status: z.enum([
    "Proposed", "Approved", "Planned", "In Progress", "Delayed", "Completed", "On Hold", "Cancelled", "Announced"
  ]),
  progress_percentage: z.number().min(0).max(100).optional(),
  project_image: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") as ProjectCategory | null;
    const status = searchParams.get("status") as ProjectStatus | null;
    const wardParam = searchParams.get("ward");
    const wardNumber = wardParam ? parseInt(wardParam, 10) : undefined;
    const search = searchParams.get("q") || undefined;
    const sortBy = (searchParams.get("sortBy") as any) || undefined;

    const projects = digitalMunicipalityStore.getProjects({
      category: category && category !== ("all" as any) ? category : undefined,
      status: status && status !== ("all" as any) ? status : undefined,
      wardNumber: wardNumber && wardNumber > 0 ? wardNumber : undefined,
      search,
      sortBy,
    });

    const stats = digitalMunicipalityStore.getProjectStats();

    return NextResponse.json({
      success: true,
      count: projects.length,
      stats,
      data: projects,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch development projects", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = projectSchema.parse(body);

    const newProject = digitalMunicipalityStore.addProject({
      municipality_id: "40000000-0000-0000-0000-000000000007",
      municipality_name: "Tanur Municipality",
      municipality_name_ml: "Tanur Municipality",
      ward_number: validated.ward_number,
      ward_name: validated.ward_number ? `Ward ${validated.ward_number}` : undefined,
      ward_name_ml: validated.ward_number ? `Ward ${validated.ward_number}` : undefined,
      locality: validated.locality || "Tanur Town",
      locality_ml: validated.locality || "Tanur Town",
      title: validated.title,
      title_ml: validated.title,
      description: validated.description,
      description_ml: validated.description,
      category: validated.category as ProjectCategory,
      category_name: validated.category,
      category_name_ml: validated.category,
      department: validated.department,
      department_ml: validated.department,
      implementing_agency: validated.department,
      official_source_name: validated.official_source_name,
      official_source_url: validated.official_source_url,
      budget_sanctioned: validated.budget_sanctioned,
      approved_budget: validated.approved_budget || validated.budget_sanctioned,
      estimated_cost: validated.estimated_cost,
      actual_expenditure: validated.actual_expenditure,
      funding_source: validated.funding_source,
      announcement_date: validated.announcement_date || new Date().toISOString().split("T")[0],
      approval_date: validated.approval_date,
      start_date: validated.start_date,
      expected_completion_date: validated.expected_completion_date,
      status: validated.status as ProjectStatus,
      progress_percentage: validated.progress_percentage ?? 0,
      completion_percentage: validated.progress_percentage ?? 0,
      project_image: validated.project_image || "https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?w=1200&auto=format&fit=crop",
      latitude: validated.latitude || 10.9768,
      longitude: validated.longitude || 75.8672,
      is_verified: true,
      verification_status: "verified",
      last_verified_date: new Date().toISOString().split("T")[0],
      progress_updates: [],
    });

    return NextResponse.json(
      {
        success: true,
        message: "Development project created successfully",
        data: newProject,
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation failed", issues: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to create project", details: error.message },
      { status: 500 }
    );
  }
}
