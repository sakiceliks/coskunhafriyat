import { type NextRequest, NextResponse } from "next/server"
import { updateCompanyStat } from "@/lib/database"

export async function PUT(request: NextRequest) {
  try {
    const { stats } = await request.json()

    const results = []
    for (const stat of stats) {
      const result = await updateCompanyStat(stat.stat_key, stat.stat_value, stat.stat_label)
      results.push(result)
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error("Error updating company stats:", error)
    return NextResponse.json({ error: "Failed to update company stats" }, { status: 500 })
  }
}
