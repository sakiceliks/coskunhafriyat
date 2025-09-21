"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/ui/image-upload"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Plus, Edit, Trash2, Eye, ArrowUp, ArrowDown } from "lucide-react"
import { toast } from "sonner"

interface HeroSlide {
  id: number
  title: string
  subtitle?: string
  description?: string
  image_url: string
  button_text?: string
  button_link?: string
  button_text_2?: string
  button_link_2?: string
  is_active: boolean
  display_order: number
  created_at: string
  updated_at: string
}

interface HeroCarouselManagerProps {
  initialSlides: HeroSlide[]
}

export function HeroCarouselManager({ initialSlides }: HeroCarouselManagerProps) {
  const [slides, setSlides] = useState<HeroSlide[]>(initialSlides)
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    image_url: "",
    button_text: "",
    button_link: "",
    button_text_2: "",
    button_link_2: "",
    display_order: 0,
    is_active: true,
  })

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      image_url: "",
      button_text: "",
      button_link: "",
      button_text_2: "",
      button_link_2: "",
      display_order: 0,
      is_active: true,
    })
    setEditingSlide(null)
  }

  const handleEdit = (slide: HeroSlide) => {
    setEditingSlide(slide)
    setFormData({
      title: slide.title,
      subtitle: slide.subtitle || "",
      description: slide.description || "",
      image_url: slide.image_url,
      button_text: slide.button_text || "",
      button_link: slide.button_link || "",
      button_text_2: slide.button_text_2 || "",
      button_link_2: slide.button_link_2 || "",
      display_order: slide.display_order,
      is_active: slide.is_active,
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const url = editingSlide 
        ? `/api/admin/hero-carousel/${editingSlide.id}`
        : "/api/admin/hero-carousel"
      
      const method = editingSlide ? "PUT" : "POST"
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to save hero slide")
      }

      const savedSlide = await response.json()
      
      if (editingSlide) {
        setSlides(slides.map(slide => 
          slide.id === editingSlide.id ? savedSlide : slide
        ))
        toast.success("Hero slide updated successfully")
      } else {
        setSlides([...slides, savedSlide])
        toast.success("Hero slide created successfully")
      }

      setIsDialogOpen(false)
      resetForm()
    } catch (error) {
      console.error("Error saving hero slide:", error)
      toast.error("Failed to save hero slide")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/hero-carousel/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete hero slide")
      }

      setSlides(slides.filter(slide => slide.id !== id))
      toast.success("Hero slide deleted successfully")
    } catch (error) {
      console.error("Error deleting hero slide:", error)
      toast.error("Failed to delete hero slide")
    }
  }

  const handleToggleActive = async (id: number, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/hero-carousel/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_active: isActive }),
      })

      if (!response.ok) {
        throw new Error("Failed to update hero slide")
      }

      const updatedSlide = await response.json()
      setSlides(slides.map(slide => 
        slide.id === id ? updatedSlide : slide
      ))
      toast.success(`Hero slide ${isActive ? "activated" : "deactivated"}`)
    } catch (error) {
      console.error("Error updating hero slide:", error)
      toast.error("Failed to update hero slide")
    }
  }

  const sortedSlides = [...slides].sort((a, b) => a.display_order - b.display_order)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Hero Carousel Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage homepage hero section slides</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-amber-500 hover:bg-amber-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add New Slide
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingSlide ? "Edit Hero Slide" : "Create New Hero Slide"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Main headline"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input
                    id="subtitle"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="Subtitle or tagline"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Description text"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url">Background Image *</Label>
                <ImageUpload
                  value={formData.image_url}
                  onChange={(value) => setFormData({ ...formData, image_url: value })}
                  onRemove={() => setFormData({ ...formData, image_url: "" })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="button_text">Primary Button Text</Label>
                  <Input
                    id="button_text"
                    value={formData.button_text}
                    onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                    placeholder="Button text"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="button_link">Primary Button Link</Label>
                  <Input
                    id="button_link"
                    value={formData.button_link}
                    onChange={(e) => setFormData({ ...formData, button_link: e.target.value })}
                    placeholder="/hizmetler"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="button_text_2">Secondary Button Text</Label>
                  <Input
                    id="button_text_2"
                    value={formData.button_text_2}
                    onChange={(e) => setFormData({ ...formData, button_text_2: e.target.value })}
                    placeholder="Button text"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="button_link_2">Secondary Button Link</Label>
                  <Input
                    id="button_link_2"
                    value={formData.button_link_2}
                    onChange={(e) => setFormData({ ...formData, button_link_2: e.target.value })}
                    placeholder="/projeler"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false)
                    resetForm()
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : editingSlide ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {sortedSlides.map((slide) => (
          <Card key={slide.id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CardTitle className="text-lg text-gray-900 dark:text-white">
                    {slide.title}
                  </CardTitle>
                  <Badge variant={slide.is_active ? "default" : "secondary"}>
                    {slide.is_active ? "Active" : "Inactive"}
                  </Badge>
                  <Badge variant="outline">
                    Order: {slide.display_order}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={slide.is_active}
                    onCheckedChange={(checked) => handleToggleActive(slide.id, checked)}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(slide)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Hero Slide</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{slide.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(slide.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  {slide.subtitle && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Subtitle:</strong> {slide.subtitle}
                    </p>
                  )}
                  {slide.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Description:</strong> {slide.description}
                    </p>
                  )}
                  <div className="flex space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    {slide.button_text && (
                      <span><strong>Button 1:</strong> {slide.button_text}</span>
                    )}
                    {slide.button_text_2 && (
                      <span><strong>Button 2:</strong> {slide.button_text_2}</span>
                    )}
                  </div>
                </div>
                <div className="relative h-32 rounded-lg overflow-hidden">
                  <img
                    src={slide.image_url}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {slides.length === 0 && (
        <Card className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No hero slides found. Create your first slide to get started.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
