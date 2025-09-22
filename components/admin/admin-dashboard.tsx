"use client"

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ServicesManager } from "@/components/admin/services-manager"
import { ProjectsManager } from "@/components/admin/projects-manager"
import { BlogManager } from "@/components/admin/blog-manager"
import { PageContentManager } from "@/components/admin/page-content-manager"
import { AboutPageManager } from "@/components/admin/about-page-manager"
import { RegionsManager } from "@/components/admin/regions-manager"
import { HeroCarouselManager } from "@/components/admin/hero-carousel-manager"
import { BarChart3, Briefcase, PenTool, FileText, MapPin, LogOut, User } from "lucide-react"
import { useAuth } from '@/components/auth/auth-context'

interface AdminData {
  services: any[]
  projects: any[]
  blogPosts: any[]
  pageContent: any[]
  teamMembers: any[]
  companyStats: any[]
  faqs: any[]
  regions: any[]
  heroCarousel: any[]
}

export function AdminDashboard() {
  const { user, logout } = useAuth()
  const [data, setData] = useState<AdminData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Fetch all admin data
        const response = await fetch('/api/admin/data')
        if (!response.ok) {
          throw new Error('Veri yüklenirken hata oluştu')
        }
        
        const adminData = await response.json()
        setData(adminData)
      } catch (error) {
        console.error('Admin data fetch error:', error)
        setError('Veritabanı bağlantı hatası. Lütfen migration scriptlerini çalıştırın.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleLogout = () => {
    logout()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Veriler yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Veritabanı Bağlantı Hatası</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">Gerekli Adımlar:</h3>
            <ol className="text-sm text-yellow-700 text-left space-y-1">
              <li>1. scripts/create-regions-table.sql</li>
              <li>2. scripts/ensure-slug-columns.sql</li>
              <li>3. scripts/02-seed-data.sql</li>
            </ol>
          </div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Veri Bulunamadı</h1>
          <p className="text-gray-600">Admin verileri yüklenemedi.</p>
        </div>
      </div>
    )
  }

  const allPageContent = data.pageContent || []

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Yönetim Paneli</h1>
            <p className="text-gray-600">İçerik ve proje yönetimi merkezi</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <User className="h-4 w-4" />
              <span>{user?.username}</span>
            </div>
            <Button variant="outline" onClick={handleLogout} className="flex items-center space-x-2">
              <LogOut className="h-4 w-4" />
              <span>Çıkış</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Hizmet</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.services.length}</div>
              <p className="text-xs text-muted-foreground">Aktif hizmet sayısı</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Proje</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.projects.length}</div>
              <p className="text-xs text-muted-foreground">Tamamlanan proje</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blog Yazısı</CardTitle>
              <PenTool className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.blogPosts.length}</div>
              <p className="text-xs text-muted-foreground">Yayınlanan yazı</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bölgelerimiz</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.regions.length}</div>
              <p className="text-xs text-muted-foreground">Aktif bölge sayısı</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sayfa İçerikleri</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{allPageContent.length}</div>
              <p className="text-xs text-muted-foreground">Düzenlenebilir içerik</p>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="hero">Hero Carousel</TabsTrigger>
            <TabsTrigger value="services">Hizmetler</TabsTrigger>
            <TabsTrigger value="projects">Projeler</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="regions">Bölgelerimiz</TabsTrigger>
            <TabsTrigger value="about">Hakkımızda</TabsTrigger>
            <TabsTrigger value="pages">Sayfa İçerikleri</TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="space-y-6">
            <HeroCarouselManager initialSlides={data.heroCarousel} />
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <ServicesManager services={data.services} />
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <ProjectsManager projects={data.projects} />
          </TabsContent>

          <TabsContent value="blog" className="space-y-6">
            <BlogManager blogPosts={data.blogPosts} />
          </TabsContent>

          <TabsContent value="regions" className="space-y-6">
            <RegionsManager regions={data.regions} />
          </TabsContent>

          <TabsContent value="about" className="space-y-6">
            <AboutPageManager pageContent={allPageContent} />
          </TabsContent>

          <TabsContent value="pages" className="space-y-6">
            <PageContentManager
              pageContent={allPageContent}
              teamMembers={data.teamMembers}
              companyStats={data.companyStats}
              faqs={data.faqs}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
