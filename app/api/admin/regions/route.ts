import { NextRequest, NextResponse } from "next/server"
import { getRegions, createRegion } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured") === "true"
    
    const regions = await getRegions(featured)
    return NextResponse.json(regions)
  } catch (error) {
    console.error("Error fetching regions:", error)
    return NextResponse.json({ error: "Failed to fetch regions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const region = await createRegion(data)
    return NextResponse.json(region, { status: 201 })
  } catch (error) {
    console.error("Error creating region:", error)
    return NextResponse.json({ error: "Failed to create region" }, { status: 500 })
  }
}
