import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { digitalMunicipalityStore } from "@/lib/data/digitalMunicipalityData";

const updateSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  category: z.string().optional(),
  ward_number: z.number().int().min(1).max(45).optional(),
  locality: z.string().optional(),
  department: z.string().optional(),
  official_source_name: z.string().optional(),
  official_source_url: z.string().url().optional(),
  budget_sanctioned: z.string().optional(),
  approved_budget: z.string().optional(),
  estimated_cost: z.string().optional(),
  actual_expenditure: z.string().optional(),
  funding_source: z.string().optional(),
  start_date: z.string().optional(),
  expected_completion_date: z.string().optional(),
  actual_completion_date: z.string().optional(),
  status: z.enum([
    "Proposed", "Approved", "Planned", "In Progress", "Delayed", "Completed", "On Hold", "Cancelled", "Announced"
  ]).optional(),
  progress_percentage: z.number().min(0).max(100).optional(),
  project_image: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  is_verified: z.boolean().optional(),
  verification_status: z.enum(["verified", "pending_verification", "unverified"]).optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = digitalMunicipalityStore.getProjectById(id);

    if (!project) {
      return NextResponse.json(
        { success: false, error: "Development project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Failed to retrieve project", details: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validated = updateSchema.parse(body);

    const existing = digitalMunicipalityStore.getProjectById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Development project not found" },
        { status: 404 }
      );
    }

    const updated = digitalMunicipalityStore.updateProject(id, validated as any, "Admin API");
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Failed to update project" },
        { status: 500 }
      );
    }

    const fresh = digitalMunicipalityStore.getProjectById(id);
    return NextResponse.json({
      success: true,
      message: "Development project updated successfully",
      data: fresh,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation failed", issues: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to update project", details: error.message },
      { status: 500 }
    );
  }
}
