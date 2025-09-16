import { type NextRequest, NextResponse } from "next/server"
import { updatePageContent } from "@/lib/database"

export async function PUT(request: NextRequest) {
  try {
    const { page_name, section_name, content_key, content_value } = await request.json()

    const result = await updatePageContent(page_name, section_name, content_key, content_value)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error updating page content:", error)
    return NextResponse.json({ error: "Failed to update page content" }, { status: 500 })
  }
}
