import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { 
  publicServiceStore, 
  SERVICE_CATEGORIES, 
  getServiceCategoryByKey 
} from "@/lib/data/publicServicesData";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || undefined;
    const query = searchParams.get("q") || undefined;
    const sort = (searchParams.get("sort") as "popular" | "recent" | "name") || "popular";

    const services = publicServiceStore.getServices(category, query, sort);

    return NextResponse.json({
      success: true,
      count: services.length,
      categories: SERVICE_CATEGORIES,
      services,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch public services", error: err?.message },
      { status: 500 }
    );
  }
}

const createServiceSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  category: z.string().refine(val => !!getServiceCategoryByKey(val), {
    message: "Invalid service category",
  }),
  department: z.string().min(3, "Department name is required"),
  summary: z.string().min(10, "Summary must be at least 10 characters"),
  eligibility: z.array(z.string()).min(1, "At least one eligibility criterion is required"),
  required_documents: z.array(z.string()).min(1, "At least one required document is needed"),
  procedure_steps: z.array(
    z.object({
      step_number: z.number().int(),
      title: z.string(),
      description: z.string(),
    })
  ).min(1, "At least one procedure step is required"),
  processing_time_text: z.string().min(2, "Processing time text is required"),
  fee_structure: z.string().min(2, "Fee structure description is required"),
  official_portal_url: z.string().url().optional(),
  official_portal_name: z.string().optional(),
  source_reference: z.string().min(3, "Statutory source reference is required"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = createServiceSchema.safeParse(body);

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
    const cat = getServiceCategoryByKey(data.category)!;
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    const newService = publicServiceStore.createService({
      slug,
      title: data.title,
      category: cat.key,
      category_name: cat.name,
      department: data.department,
      summary: data.summary,
      eligibility: data.eligibility,
      required_documents: data.required_documents,
      procedure_steps: data.procedure_steps,
      processing_time_text: data.processing_time_text,
      fee_structure: data.fee_structure,
      office_location: "Tanur Municipality Office, Main Road, Tanur - 676302",
      contact_phone: "0494 2440228",
      contact_email: "tanurmunicipality@gmail.com",
      working_hours: "Monday to Saturday: 10:00 AM – 5:00 PM",
      is_online_available: !!data.official_portal_url,
      official_portal_url: data.official_portal_url,
      official_portal_name: data.official_portal_name,
      last_verified_date: new Date().toISOString().split("T")[0],
      source_reference: data.source_reference,
      supports_internal_application: true,
      published: true,
    });

    return NextResponse.json({
      success: true,
      message: "Public service listing created successfully",
      service: newService,
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: "Failed to create public service", error: err?.message },
      { status: 500 }
    );
  }
}
