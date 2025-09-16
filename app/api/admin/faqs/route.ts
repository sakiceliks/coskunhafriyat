import { type NextRequest, NextResponse } from "next/server"
import { createFaq } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const result = await createFaq(data)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error creating FAQ:", error)
    return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 })
  }
}
