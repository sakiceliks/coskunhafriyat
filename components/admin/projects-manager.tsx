"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye, MapPin, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"
import { ImageUpload } from "@/components/ui/image-upload"

interface Project {
  id: number
  title: string
  short_description: string
  description: string
  project_type: string
  location: string
  completion_date: string
  project_size: string
  client_name: string
  image_url: string
  gallery_images: string[]
  created_at: string
}

interface ProjectsManagerProps {
  projects: Project[]
}

export function ProjectsManager({ projects }: ProjectsManagerProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const router = useRouter()

  const handleCreateProject = async (formData: FormData) => {
    const projectData = {
      title: formData.get("title") as string,
      short_description: formData.get("short_description") as string,
      description: formData.get("description") as string,
      project_type: formData.get("project_type") as string,
      location: formData.get("location") as string,
      completion_date: formData.get("completion_date") as string,
      project_size: formData.get("project_size") as string,
      client_name: formData.get("client_name") as string,
      image_url: formData.get("image_url") as string,
      gallery_images: (formData.get("gallery_images") as string)
        .split(",")
        .map((url) => url.trim())
        .filter(Boolean),
    }

    try {
      const response = await fetch("/api/admin/projeler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      })

      if (!response.ok) {
        throw new Error("Failed to create project")
      }

      setIsCreateOpen(false)
      router.refresh()
    } catch (error) {
      console.error("Error creating project:", error)
      alert("Proje oluşturulurken bir hata oluştu")
    }
  }

  const handleUpdateProject = async (formData: FormData) => {
    if (!editingProject) return

    const projectData = {
      title: formData.get("title") as string,
      short_description: formData.get("short_description") as string,
      description: formData.get("description") as string,
      project_type: formData.get("project_type") as string,
      location: formData.get("location") as string,
      completion_date: formData.get("completion_date") as string,
      project_size: formData.get("project_size") as string,
      client_name: formData.get("client_name") as string,
      image_url: formData.get("image_url") as string,
      gallery_images: (formData.get("gallery_images") as string)
        .split(",")
        .map((url) => url.trim())
        .filter(Boolean),
    }

    try {
      const response = await fetch(`/api/admin/projeler/${editingProject.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      })

      if (!response.ok) {
        throw new Error("Failed to update project")
      }

      setEditingProject(null)
      router.refresh()
    } catch (error) {
      console.error("Error updating project:", error)
      alert("Proje güncellenirken bir hata oluştu")
    }
  }

  const handleDeleteProject = async (id: number) => {
    if (confirm("Bu projeyi silmek istediğinizden emin misiniz?")) {
      try {
        const response = await fetch(`/api/admin/projeler/${id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("Failed to delete project")
        }

        router.refresh()
      } catch (error) {
        console.error("Error deleting project:", error)
        alert("Proje silinirken bir hata oluştu")
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Proje Yönetimi</h2>
          <p className="text-gray-600">Tamamlanan projelerinizi yönetin</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Yeni Proje
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Yeni Proje Ekle</DialogTitle>
              <DialogDescription>Yeni bir proje oluşturun</DialogDescription>
            </DialogHeader>
            <ProjectForm onSubmit={handleCreateProject} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="relative">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription>{project.short_description}</CardDescription>
                </div>
                <Badge variant="secondary">{project.project_type}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{new Date(project.completion_date).toLocaleDateString("tr-TR")}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href={`/projeler/${project.id}`} target="_blank" rel="noreferrer">
                      <Eye className="h-4 w-4" />
                    </a>
                  </Button>
                  <Dialog
                    open={editingProject?.id === project.id}
                    onOpenChange={(open) => !open && setEditingProject(null)}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setEditingProject(project)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Projeyi Düzenle</DialogTitle>
                        <DialogDescription>Proje bilgilerini güncelleyin</DialogDescription>
                      </DialogHeader>
                      <ProjectForm project={project} onSubmit={handleUpdateProject} />
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteProject(project.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function ProjectForm({ project, onSubmit }: { project?: Project; onSubmit: (formData: FormData) => void }) {
  const [imageUrl, setImageUrl] = useState(project?.image_url || "")
  const [galleryImages, setGalleryImages] = useState(project?.gallery_images || [])

  const formatDateForInput = (dateValue: string | Date | null | undefined): string => {
    if (!dateValue) return ""

    try {
      // If it's already a string, try to parse it as a date
      const date = typeof dateValue === "string" ? new Date(dateValue) : dateValue

      // Check if the date is valid
      if (isNaN(date.getTime())) return ""

      // Format as YYYY-MM-DD for date input
      return date.toISOString().split("T")[0]
    } catch (error) {
      console.error("Error formatting date:", error)
      return ""
    }
  }

  const handleSubmit = (formData: FormData) => {
    formData.set("image_url", imageUrl)
    formData.set("gallery_images", galleryImages.join(", "))
    onSubmit(formData)
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Proje Adı</Label>
          <Input id="title" name="title" defaultValue={project?.title} required />
        </div>
        <div>
          <Label htmlFor="project_type">Proje Tipi</Label>
          <Select name="project_type" defaultValue={project?.project_type}>
            <SelectTrigger>
              <SelectValue placeholder="Proje tipi seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Konut">Konut</SelectItem>
              <SelectItem value="Ticari">Ticari</SelectItem>
              <SelectItem value="Sanayi">Sanayi</SelectItem>
              <SelectItem value="Villa">Villa</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="short_description">Kısa Açıklama</Label>
        <Input id="short_description" name="short_description" defaultValue={project?.short_description} required />
      </div>

      <div>
        <Label htmlFor="description">Detaylı Açıklama</Label>
        <Textarea id="description" name="description" defaultValue={project?.description} rows={4} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="location">Konum</Label>
          <Input id="location" name="location" defaultValue={project?.location} required />
        </div>
        <div>
          <Label htmlFor="completion_date">Tamamlanma Tarihi</Label>
          <Input
            id="completion_date"
            name="completion_date"
            type="date"
            defaultValue={formatDateForInput(project?.completion_date)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="project_size">Proje Büyüklüğü</Label>
          <Input id="project_size" name="project_size" defaultValue={project?.project_size} />
        </div>
        <div>
          <Label htmlFor="client_name">Müşteri Adı</Label>
          <Input id="client_name" name="client_name" defaultValue={project?.client_name} />
        </div>
      </div>

      <div>
        <ImageUpload
          label="Ana Proje Görseli"
          value={imageUrl}
          onChange={setImageUrl}
          onRemove={() => setImageUrl("")}
        />
      </div>

      <div>
        <ImageUpload
          label="Galeri Görselleri"
          multiple={true}
          values={galleryImages}
          onMultipleChange={setGalleryImages}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit">{project ? "Güncelle" : "Oluştur"}</Button>
      </div>
    </form>
  )
}
