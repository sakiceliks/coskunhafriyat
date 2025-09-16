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
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import { ImageUpload } from "@/components/ui/image-upload"

interface Service {
  id: number
  title: string
  short_description: string
  description: string
  features: string[]
  price_range: string
  image_url: string
  icon: string
  created_at: string
  slug?: string
}

interface ServicesManagerProps {
  services: Service[]
}

export function ServicesManager({ services }: ServicesManagerProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const router = useRouter()

  const handleCreateService = async (formData: FormData) => {
    const serviceData = {
      title: formData.get("title") as string,
      short_description: formData.get("short_description") as string,
      description: formData.get("description") as string,
      features: (formData.get("features") as string).split(",").map((f) => f.trim()),
      price_range: formData.get("price_range") as string,
      image_url: formData.get("image_url") as string,
      icon: formData.get("icon") as string,
    }

    try {
      const response = await fetch("/api/admin/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceData),
      })

      if (!response.ok) {
        throw new Error("Failed to create service")
      }

      setIsCreateOpen(false)
      router.refresh()
    } catch (error) {
      console.error("Error creating service:", error)
      alert("Hizmet oluşturulurken bir hata oluştu")
    }
  }

  const handleUpdateService = async (formData: FormData) => {
    if (!editingService) return

    const serviceData = {
      title: formData.get("title") as string,
      short_description: formData.get("short_description") as string,
      description: formData.get("description") as string,
      features: (formData.get("features") as string).split(",").map((f) => f.trim()),
      price_range: formData.get("price_range") as string,
      image_url: formData.get("image_url") as string,
      icon: formData.get("icon") as string,
    }

    try {
      const response = await fetch(`/api/admin/services/${editingService.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceData),
      })

      if (!response.ok) {
        throw new Error("Failed to update service")
      }

      setEditingService(null)
      router.refresh()
    } catch (error) {
      console.error("Error updating service:", error)
      alert("Hizmet güncellenirken bir hata oluştu")
    }
  }

  const handleDeleteService = async (id: number) => {
    if (confirm("Bu hizmeti silmek istediğinizden emin misiniz?")) {
      try {
        const response = await fetch(`/api/admin/services/${id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("Failed to delete service")
        }

        router.refresh()
      } catch (error) {
        console.error("Error deleting service:", error)
        alert("Hizmet silinirken bir hata oluştu")
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Hizmet Yönetimi</h2>
          <p className="text-gray-600">Sunduğunuz hizmetleri yönetin</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Yeni Hizmet
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Yeni Hizmet Ekle</DialogTitle>
              <DialogDescription>Yeni bir hizmet oluşturun</DialogDescription>
            </DialogHeader>
            <ServiceForm onSubmit={handleCreateService} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="relative">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription>{service.short_description}</CardDescription>
                </div>
                <Badge variant="secondary">{service.price_range}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href={`/services/${service.slug || service.id}`} target="_blank" rel="noreferrer">
                      <Eye className="h-4 w-4" />
                    </a>
                  </Button>
                  <Dialog
                    open={editingService?.id === service.id}
                    onOpenChange={(open) => !open && setEditingService(null)}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setEditingService(service)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Hizmeti Düzenle</DialogTitle>
                        <DialogDescription>Hizmet bilgilerini güncelleyin</DialogDescription>
                      </DialogHeader>
                      <ServiceForm service={service} onSubmit={handleUpdateService} />
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteService(service.id)}
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

function ServiceForm({ service, onSubmit }: { service?: Service; onSubmit: (formData: FormData) => void }) {
  const [imageUrl, setImageUrl] = useState(service?.image_url || "")

  const handleSubmit = (formData: FormData) => {
    formData.set("image_url", imageUrl)
    onSubmit(formData)
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Hizmet Adı</Label>
          <Input id="title" name="title" defaultValue={service?.title} required />
        </div>
        <div>
          <Label htmlFor="price_range">Fiyat Aralığı</Label>
          <Input id="price_range" name="price_range" defaultValue={service?.price_range} required />
        </div>
      </div>

      <div>
        <Label htmlFor="short_description">Kısa Açıklama</Label>
        <Input id="short_description" name="short_description" defaultValue={service?.short_description} required />
      </div>

      <div>
        <Label htmlFor="description">Detaylı Açıklama</Label>
        <Textarea id="description" name="description" defaultValue={service?.description} rows={4} required />
      </div>

      <div>
        <Label htmlFor="features">Özellikler (virgülle ayırın)</Label>
        <Textarea id="features" name="features" defaultValue={service?.features?.join(", ")} rows={3} required />
      </div>

      <div>
        <ImageUpload label="Hizmet Görseli" value={imageUrl} onChange={setImageUrl} onRemove={() => setImageUrl("")} />
      </div>

      <div>
        <Label htmlFor="icon">İkon</Label>
        <Input id="icon" name="icon" defaultValue={service?.icon} />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit">{service ? "Güncelle" : "Oluştur"}</Button>
      </div>
    </form>
  )
}
