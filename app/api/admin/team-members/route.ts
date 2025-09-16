import { type NextRequest, NextResponse } from "next/server"
import { createTeamMember } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const result = await createTeamMember(data)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error creating team member:", error)
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 })
  }
}
