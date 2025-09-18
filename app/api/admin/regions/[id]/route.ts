import { NextRequest, NextResponse } from "next/server"
import { getRegionById, updateRegion, deleteRegion } from "@/lib/database"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const region = await getRegionById(Number.parseInt(params.id))
    if (!region) {
      return NextResponse.json({ error: "Region not found" }, { status: 404 })
    }
    return NextResponse.json(region)
  } catch (error) {
    console.error("Error fetching region:", error)
    return NextResponse.json({ error: "Failed to fetch region" }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const region = await updateRegion(Number.parseInt(params.id), data)
    return NextResponse.json(region)
  } catch (error) {
    console.error("Error updating region:", error)
    return NextResponse.json({ error: "Failed to update region" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await deleteRegion(Number.parseInt(params.id))
    return NextResponse.json({ message: "Region deleted successfully" })
  } catch (error) {
    console.error("Error deleting region:", error)
    return NextResponse.json({ error: "Failed to delete region" }, { status: 500 })
  }
}
