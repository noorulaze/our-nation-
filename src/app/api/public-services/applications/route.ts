import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { publicServiceStore } from "@/lib/data/publicServicesData";

const submitApplicationSchema = z.object({
  service_id: z.string().min(1, "Service ID is required"),
  applicant_id: z.string().min(1, "Applicant ID is required"),
  applicant_name: z.string().min(2, "Applicant name must be at least 2 characters"),
  applicant_email: z.string().email("Valid email address is required"),
  applicant_phone: z.string().min(7, "Valid contact telephone number is required"),
  ward_number: z.number().int().min(1, "Ward number must be between 1 and 45").max(45, "Ward number must be between 1 and 45"),
  documents: z.array(
    z.object({
      name: z.string(),
      url: z.string().optional(),
    })
  ).optional().default([]),
  notes: z.string().optional().default(""),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const applicant_id = searchParams.get("applicant_id") || undefined;
    const status = searchParams.get("status") || undefined;

    const applications = publicServiceStore.getApplications(applicant_id, status);

    return NextResponse.json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch applications", error: err?.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = submitApplicationSchema.safeParse(body);

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
    const application = publicServiceStore.submitApplication(data);

    return NextResponse.json({
      success: true,
      message: "Guidance application submitted successfully",
      reference_no: application.reference_no,
      application,
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: "Failed to submit application", error: err?.message },
      { status: 500 }
    );
  }
}
