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
import { Plus, Edit, Trash2, Eye, Calendar, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { ImageUpload } from "@/components/ui/image-upload"

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  published_date: string
  featured_image: string
  tags: string[]
  status: string
  created_at: string
}

interface BlogManagerProps {
  blogPosts: BlogPost[]
}

export function BlogManager({ blogPosts }: BlogManagerProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const router = useRouter()

  const handleCreatePost = async (formData: FormData) => {
    const postData = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
      author: formData.get("author") as string,
      published_date: formData.get("published_date") as string,
      featured_image: formData.get("featured_image") as string,
      tags: (formData.get("tags") as string)
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      status: formData.get("status") as string,
    }

    try {
      const response = await fetch("/api/admin/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })

      if (!response.ok) {
        throw new Error("Failed to create blog post")
      }

      setIsCreateOpen(false)
      router.refresh()
    } catch (error) {
      console.error("Error creating blog post:", error)
      alert("Blog yazısı oluşturulurken bir hata oluştu")
    }
  }

  const handleUpdatePost = async (formData: FormData) => {
    if (!editingPost) return

    const postData = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
      author: formData.get("author") as string,
      published_date: formData.get("published_date") as string,
      featured_image: formData.get("featured_image") as string,
      tags: (formData.get("tags") as string)
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      status: formData.get("status") as string,
    }

    try {
      const response = await fetch(`/api/admin/blog/${editingPost.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })

      if (!response.ok) {
        throw new Error("Failed to update blog post")
      }

      setEditingPost(null)
      router.refresh()
    } catch (error) {
      console.error("Error updating blog post:", error)
      alert("Blog yazısı güncellenirken bir hata oluştu")
    }
  }

  const handleDeletePost = async (id: number) => {
    if (confirm("Bu blog yazısını silmek istediğinizden emin misiniz?")) {
      try {
        const response = await fetch(`/api/admin/blog/${id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("Failed to delete blog post")
        }

        router.refresh()
      } catch (error) {
        console.error("Error deleting blog post:", error)
        alert("Blog yazısı silinirken bir hata oluştu")
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Blog Yönetimi</h2>
          <p className="text-gray-600">Blog yazılarınızı yönetin</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Yeni Yazı
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Yeni Blog Yazısı</DialogTitle>
              <DialogDescription>Yeni bir blog yazısı oluşturun</DialogDescription>
            </DialogHeader>
            <BlogPostForm onSubmit={handleCreatePost} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Card key={post.id} className="relative">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </div>
                <Badge variant={post.status === "published" ? "default" : "secondary"}>
                  {post.status === "published" ? "Yayında" : "Taslak"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{new Date(post.published_date).toLocaleDateString("tr-TR")}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-4">
                {post.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {post.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{post.tags.length - 3}
                  </Badge>
                )}
              </div>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer">
                      <Eye className="h-4 w-4" />
                    </a>
                  </Button>
                  <Dialog open={editingPost?.id === post.id} onOpenChange={(open) => !open && setEditingPost(null)}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setEditingPost(post)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Yazıyı Düzenle</DialogTitle>
                        <DialogDescription>Blog yazısını güncelleyin</DialogDescription>
                      </DialogHeader>
                      <BlogPostForm post={post} onSubmit={handleUpdatePost} />
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeletePost(post.id)}
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

function BlogPostForm({ post, onSubmit }: { post?: BlogPost; onSubmit: (formData: FormData) => void }) {
  const [featuredImage, setFeaturedImage] = useState(post?.featured_image || "")

  const handleSubmit = (formData: FormData) => {
    formData.set("featured_image", featuredImage)
    onSubmit(formData)
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Başlık</Label>
          <Input id="title" name="title" defaultValue={post?.title} required />
        </div>
        <div>
          <Label htmlFor="slug">URL Slug</Label>
          <Input id="slug" name="slug" defaultValue={post?.slug} required />
        </div>
      </div>

      <div>
        <Label htmlFor="excerpt">Özet</Label>
        <Textarea id="excerpt" name="excerpt" defaultValue={post?.excerpt} rows={2} required />
      </div>

      <div>
        <Label htmlFor="content">İçerik</Label>
        <Textarea id="content" name="content" defaultValue={post?.content} rows={8} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="author">Yazar</Label>
          <Input id="author" name="author" defaultValue={post?.author || "HafriyatMaster"} required />
        </div>
        <div>
          <Label htmlFor="published_date">Yayın Tarihi</Label>
          <Input
            id="published_date"
            name="published_date"
            type="date"
            defaultValue={post?.published_date?.split("T")[0] || new Date().toISOString().split("T")[0]}
            required
          />
        </div>
      </div>

      <div>
        <ImageUpload
          label="Öne Çıkan Görsel"
          value={featuredImage}
          onChange={setFeaturedImage}
          onRemove={() => setFeaturedImage("")}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="tags">Etiketler (virgülle ayırın)</Label>
          <Input id="tags" name="tags" defaultValue={post?.tags?.join(", ")} />
        </div>
        <div>
          <Label htmlFor="status">Durum</Label>
          <Select name="status" defaultValue={post?.status || "draft"}>
            <SelectTrigger>
              <SelectValue placeholder="Durum seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Taslak</SelectItem>
              <SelectItem value="published">Yayında</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit">{post ? "Güncelle" : "Oluştur"}</Button>
      </div>
    </form>
  )
}
