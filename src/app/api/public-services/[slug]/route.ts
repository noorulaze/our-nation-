import { NextRequest, NextResponse } from "next/server";
import { publicServiceStore } from "@/lib/data/publicServicesData";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const service = publicServiceStore.getServiceBySlug(slug) || publicServiceStore.getServiceById(slug);

    if (!service) {
      return NextResponse.json(
        { success: false, message: "Public service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      service,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch public service details", error: err?.message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const existing = publicServiceStore.getServiceBySlug(slug) || publicServiceStore.getServiceById(slug);

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Public service not found" },
        { status: 404 }
      );
    }

    const updates = await req.json();
    const updated = publicServiceStore.updateService(existing.id, updates, "Admin Officer");

    return NextResponse.json({
      success: true,
      message: "Public service updated successfully",
      service: updated,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: "Failed to update public service", error: err?.message },
      { status: 500 }
    );
  }
}
