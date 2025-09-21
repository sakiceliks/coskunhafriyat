import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  getServices,
  getProjects,
  getBlogPosts,
  getPageContent,
  getTeamMembers,
  getCompanyStats,
  getFaqs,
  getRegions,
  getHeroCarousel,
} from "@/lib/database"
import { ServicesManager } from "@/components/admin/services-manager"
import { ProjectsManager } from "@/components/admin/projects-manager"
import { BlogManager } from "@/components/admin/blog-manager"
import { PageContentManager } from "@/components/admin/page-content-manager"
import { RegionsManager } from "@/components/admin/regions-manager"
import { HeroCarouselManager } from "@/components/admin/hero-carousel-manager"
import { BarChart3, Briefcase, PenTool, FileText, MapPin, Image } from "lucide-react"

export const metadata = {
  title: "Yönetim Paneli | Coşkun Hafriyat",
  description: "Coşkun Hafriyat yönetim paneli - hizmetler, projeler ve blog yönetimi",
}

export default async function AdminPage() {
  // In a real app, you'd check authentication here
  // For demo purposes, we'll skip auth

  try {
    const [services, projects, blogPosts, pageContent, teamMembers, companyStats, faqs, regions, heroCarousel] = await Promise.all([
      getServices(),
      getProjects(),
      getBlogPosts(),
      getPageContent("homepage"), // Get all page content
      getTeamMembers(),
      getCompanyStats(),
      getFaqs(),
      getRegions().catch(() => []), // Regions tablosu yoksa boş array döndür
      getHeroCarousel().catch(() => []), // Hero carousel tablosu yoksa boş array döndür
    ])

    const allPageContent = await Promise.all([
      getPageContent("homepage"),
      getPageContent("about"),
      getPageContent("contact"),
    ]).then((results) => results.flat())

    return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Yönetim Paneli</h1>
          <p className="text-gray-600">İçerik ve proje yönetimi merkezi</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Hizmet</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{services.length}</div>
              <p className="text-xs text-muted-foreground">Aktif hizmet sayısı</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Proje</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projects.length}</div>
              <p className="text-xs text-muted-foreground">Tamamlanan proje</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blog Yazısı</CardTitle>
              <PenTool className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{blogPosts.length}</div>
              <p className="text-xs text-muted-foreground">Yayınlanan yazı</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bölgelerimiz</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{regions.length}</div>
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
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="hero">Hero Carousel</TabsTrigger>
            <TabsTrigger value="services">Hizmetler</TabsTrigger>
            <TabsTrigger value="projects">Projeler</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="regions">Bölgelerimiz</TabsTrigger>
            <TabsTrigger value="pages">Sayfa İçerikleri</TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="space-y-6">
            <HeroCarouselManager initialSlides={heroCarousel} />
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <ServicesManager services={services} />
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <ProjectsManager projects={projects} />
          </TabsContent>

          <TabsContent value="blog" className="space-y-6">
            <BlogManager blogPosts={blogPosts} />
          </TabsContent>

          <TabsContent value="regions" className="space-y-6">
            <RegionsManager regions={regions} />
          </TabsContent>

          <TabsContent value="pages" className="space-y-6">
            <PageContentManager
              pageContent={allPageContent}
              teamMembers={teamMembers}
              companyStats={companyStats}
              faqs={faqs}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
    )
  } catch (error) {
    console.error("Admin page error:", error)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Veritabanı Bağlantı Hatası</h1>
          <p className="text-gray-600 mb-4">
            Veritabanı tabloları henüz oluşturulmamış. Lütfen migration scriptlerini çalıştırın.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md">
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
}
