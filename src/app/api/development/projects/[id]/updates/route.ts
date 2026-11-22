import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { digitalMunicipalityStore } from "@/lib/data/digitalMunicipalityData";

const milestoneSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  note: z.string().min(5, "Note must be at least 5 characters"),
  date: z.string().optional(),
  official_remarks: z.string().optional(),
  milestone_percentage: z.number().min(0).max(100).optional(),
  evidence_url: z.string().url().optional().or(z.literal("")),
  verified_by: z.string().min(2, "Verifier name is required"),
  photographs: z.array(z.string()).optional(),
  update_type: z.enum(["announcement", "approval", "commencement", "progress", "inspection", "completion"]).optional(),
});

export async function POST(
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

    const body = await request.json();
    const validated = milestoneSchema.parse(body);

    const added = digitalMunicipalityStore.addProjectProgressUpdate(id, {
      date: validated.date || new Date().toISOString().split("T")[0],
      title: validated.title,
      title_ml: validated.title,
      note: validated.note,
      note_ml: validated.note,
      official_remarks: validated.official_remarks,
      milestone_percentage: validated.milestone_percentage,
      evidence_url: validated.evidence_url || undefined,
      verified_by: validated.verified_by,
      photographs: validated.photographs || [],
      update_type: validated.update_type || "progress",
    });

    if (validated.milestone_percentage !== undefined) {
      digitalMunicipalityStore.updateProject(id, {
        progress_percentage: validated.milestone_percentage,
        completion_percentage: validated.milestone_percentage,
      }, validated.verified_by);
    }

    const updatedProject = digitalMunicipalityStore.getProjectById(id);

    return NextResponse.json({
      success: true,
      message: "Progress update added successfully",
      data: updatedProject,
    }, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation failed", issues: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to add progress update", details: error.message },
      { status: 500 }
    );
  }
}
