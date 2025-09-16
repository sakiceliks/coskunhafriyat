import { type NextRequest, NextResponse } from "next/server"
import { updateFaq, deleteFaq } from "@/lib/database"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const data = await request.json()
    const result = await updateFaq(id, data)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error updating FAQ:", error)
    return NextResponse.json({ error: "Failed to update FAQ" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    await deleteFaq(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting FAQ:", error)
    return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 })
  }
}
