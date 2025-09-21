import { NextRequest, NextResponse } from "next/server"
import { getHeroSlideById, updateHeroSlide, deleteHeroSlide } from "@/lib/database"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const slide = await getHeroSlideById(id)
    
    if (!slide) {
      return NextResponse.json({ error: "Hero slide not found" }, { status: 404 })
    }
    
    return NextResponse.json(slide)
  } catch (error) {
    console.error("Error fetching hero slide:", error)
    return NextResponse.json({ error: "Failed to fetch hero slide" }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const data = await request.json()
    const slide = await updateHeroSlide(id, data)
    
    if (!slide) {
      return NextResponse.json({ error: "Failed to update hero slide" }, { status: 500 })
    }
    
    return NextResponse.json(slide)
  } catch (error) {
    console.error("Error updating hero slide:", error)
    return NextResponse.json({ error: "Failed to update hero slide" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const success = await deleteHeroSlide(id)
    
    if (!success) {
      return NextResponse.json({ error: "Failed to delete hero slide" }, { status: 500 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting hero slide:", error)
    return NextResponse.json({ error: "Failed to delete hero slide" }, { status: 500 })
  }
}
