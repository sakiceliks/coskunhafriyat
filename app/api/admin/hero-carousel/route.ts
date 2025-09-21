import { NextRequest, NextResponse } from "next/server"
import { getHeroCarousel, createHeroSlide } from "@/lib/database"

export async function GET() {
  try {
    const slides = await getHeroCarousel()
    return NextResponse.json(slides)
  } catch (error) {
    console.error("Error fetching hero carousel:", error)
    return NextResponse.json({ error: "Failed to fetch hero carousel" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const slide = await createHeroSlide(data)
    
    if (!slide) {
      return NextResponse.json({ error: "Failed to create hero slide" }, { status: 500 })
    }
    
    return NextResponse.json(slide, { status: 201 })
  } catch (error) {
    console.error("Error creating hero slide:", error)
    return NextResponse.json({ error: "Failed to create hero slide" }, { status: 500 })
  }
}
