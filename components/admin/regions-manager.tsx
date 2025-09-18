"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit, Plus, MapPin, Star, Phone, Mail } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface Region {
  id: number
  name: string
  slug: string
  description: string
  short_description: string
  image_url: string
  gallery_images: string[]
  location: string
  services_offered: string[]
  contact_phone: string
  contact_email: string
  is_active: boolean
  is_featured: boolean
  display_order: number
  created_at: string
  updated_at: string
}

interface RegionsManagerProps {
  regions: Region[]
}

export function RegionsManager({ regions: initialRegions }: RegionsManagerProps) {
  const [regions, setRegions] = useState(initialRegions)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRegion, setEditingRegion] = useState<Region | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    short_description: "",
    image_url: "",
    gallery_images: [] as string[],
    location: "",
    services_offered: [] as string[],
    contact_phone: "",
    contact_email: "",
    is_featured: false,
    display_order: 0,
  })

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      short_description: "",
      image_url: "",
      gallery_images: [],
      location: "",
      services_offered: [],
      contact_phone: "",
      contact_email: "",
      is_featured: false,
      display_order: 0,
    })
    setEditingRegion(null)
  }

  const handleEdit = (region: Region) => {
    setEditingRegion(region)
    setFormData({
      name: region.name,
      description: region.description || "",
      short_description: region.short_description || "",
      image_url: region.image_url || "",
      gallery_images: region.gallery_images || [],
      location: region.location || "",
      services_offered: region.services_offered || [],
      contact_phone: region.contact_phone || "",
      contact_email: region.contact_email || "",
      is_featured: region.is_featured || false,
      display_order: region.display_order || 0,
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const url = editingRegion
        ? `/api/admin/regions/${editingRegion.id}`
        : "/api/admin/regions"
      const method = editingRegion ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to save region")
      }

      const savedRegion = await response.json()

      if (editingRegion) {
        setRegions(regions.map((r) => (r.id === editingRegion.id ? savedRegion : r)))
        toast({
          title: "Başarılı",
          description: "Bölge başarıyla güncellendi.",
        })
      } else {
        setRegions([savedRegion, ...regions])
        toast({
          title: "Başarılı",
          description: "Bölge başarıyla oluşturuldu.",
        })
      }

      setIsDialogOpen(false)
      resetForm()
    } catch (error) {
      toast({
        title: "Hata",
        description: "Bölge kaydedilirken bir hata oluştu.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Bu bölgeyi silmek istediğinizden emin misiniz?")) return

    try {
      const response = await fetch(`/api/admin/regions/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete region")
      }

      setRegions(regions.filter((r) => r.id !== id))
      toast({
        title: "Başarılı",
        description: "Bölge başarıyla silindi.",
      })
    } catch (error) {
      toast({
        title: "Hata",
        description: "Bölge silinirken bir hata oluştu.",
        variant: "destructive",
      })
    }
  }

  const addService = () => {
    const service = prompt("Hizmet adını girin:")
    if (service && service.trim()) {
      setFormData({
        ...formData,
        services_offered: [...formData.services_offered, service.trim()],
      })
    }
  }

  const removeService = (index: number) => {
    setFormData({
      ...formData,
      services_offered: formData.services_offered.filter((_, i) => i !== index),
    })
  }

  const addGalleryImage = () => {
    const imageUrl = prompt("Galeri resmi URL'sini girin:")
    if (imageUrl && imageUrl.trim()) {
      setFormData({
        ...formData,
        gallery_images: [...formData.gallery_images, imageUrl.trim()],
      })
    }
  }

  const removeGalleryImage = (index: number) => {
    setFormData({
      ...formData,
      gallery_images: formData.gallery_images.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Bölgelerimiz Yönetimi</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Yeni Bölge Ekle
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingRegion ? "Bölge Düzenle" : "Yeni Bölge Ekle"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Bölge Adı *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location">Konum</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="short_description">Kısa Açıklama</Label>
                <Textarea
                  id="short_description"
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="description">Detaylı Açıklama</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="image_url">Ana Resim URL</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                />
              </div>

              <div>
                <Label>Galeri Resimleri</Label>
                <div className="space-y-2">
                  {formData.gallery_images.map((image, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input value={image} readOnly />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeGalleryImage(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addGalleryImage}>
                    <Plus className="h-4 w-4 mr-2" />
                    Resim Ekle
                  </Button>
                </div>
              </div>

              <div>
                <Label>Sunulan Hizmetler</Label>
                <div className="space-y-2">
                  {formData.services_offered.map((service, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input value={service} readOnly />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeService(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addService}>
                    <Plus className="h-4 w-4 mr-2" />
                    Hizmet Ekle
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact_phone">İletişim Telefonu</Label>
                  <Input
                    id="contact_phone"
                    value={formData.contact_phone}
                    onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="contact_email">İletişim E-postası</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    value={formData.contact_email}
                    onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="display_order">Görüntüleme Sırası</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_featured"
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                  />
                  <Label htmlFor="is_featured">Öne Çıkan Bölge</Label>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  İptal
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Kaydediliyor..." : editingRegion ? "Güncelle" : "Oluştur"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {regions.map((region) => (
          <Card key={region.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-amber-500" />
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {region.name}
                      {region.is_featured && (
                        <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                          <Star className="h-3 w-3 mr-1" />
                          Öne Çıkan
                        </Badge>
                      )}
                    </CardTitle>
                    <p className="text-sm text-gray-600">{region.location}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(region)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(region.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-700">{region.short_description}</p>
                
                {region.services_offered && region.services_offered.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Sunulan Hizmetler:</h4>
                    <div className="flex flex-wrap gap-1">
                      {region.services_offered.map((service, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-4 text-sm text-gray-600">
                  {region.contact_phone && (
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      <span>{region.contact_phone}</span>
                    </div>
                  )}
                  {region.contact_email && (
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      <span>{region.contact_email}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
