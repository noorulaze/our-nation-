import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { publicServiceStore } from "@/lib/data/publicServicesData";
import { ServiceApplicationStatus } from "@/types/digitalMunicipality";

const updateStatusSchema = z.object({
  status: z.enum([
    "submitted",
    "under_review",
    "documents_verified",
    "forwarded_guidance",
    "completed",
    "rejected"
  ]),
  note: z.string().optional(),
  actor: z.string().optional(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const application = publicServiceStore.getApplicationById(id) || publicServiceStore.getApplicationByReference(id);

    if (!application) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      application,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch application", error: err?.message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await req.json();
    const validated = updateStatusSchema.safeParse(body);

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

    const { status, note, actor } = validated.data;
    const updated = publicServiceStore.updateApplicationStatus(
      id,
      status as ServiceApplicationStatus,
      note,
      actor || "Municipal Helpdesk Officer"
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Application status updated successfully",
      application: updated,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: "Failed to update application", error: err?.message },
      { status: 500 }
    );
  }
}
