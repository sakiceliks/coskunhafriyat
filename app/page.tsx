"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, HardHat, Hammer, Compass } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedButton } from "@/components/ui/animated-button"
import { HoverButton } from "@/components/ui/hover-button"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerIn } from "@/components/animations/stagger-in"
import { ScaleIn } from "@/components/animations/scale-in"
import { HoverCard } from "@/components/animations/hover-card"
import { CountUp } from "@/components/animations/count-up"
import { ScrollProgress } from "@/components/animations/scroll-progress"
import ServicesSection from "@/components/sections/services-section"
import RegionsSection from "@/components/sections/regions-section"
import ProjectsSection from "@/components/sections/projects-section"
import BlogSection from "@/components/sections/blog-section"
import { CTASection } from "@/components/cta-section"
import { HeroCarousel } from "@/components/hero-carousel"
import { useState, useEffect } from "react"

// Mock data - veritabanı bağlantısı olmadığında kullanılacak
const mockServices = [
  {
    id: 1,
    title: "Hafriyat İşleri",
    slug: "hafriyat-isleri",
    short_description: "Profesyonel hafriyat, kazı ve toprak işleri hizmetleri",
    image_url: "/images/hafriyat.jpg",
    features: ["Modern ekipman", "Deneyimli operatörler", "Zamanında teslimat"]
  },
  {
    id: 2,
    title: "İş Makinesi Kiralama",
    slug: "is-makinesi-kiralama",
    short_description: "JCB, kepçe, loader ve buldozer kiralama hizmetleri",
    image_url: "/images/makine-kiralama.jpg",
    features: ["7/24 hizmet", "Bakımlı makineler", "Uygun fiyatlar"]
  },
  {
    id: 3,
    title: "Yıkım İşleri",
    slug: "yikim-isleri",
    short_description: "Güvenli ve çevre dostu yıkım hizmetleri",
    image_url: "/images/yikim.jpg",
    features: ["Güvenli yıkım", "Çevre dostu", "Hızlı temizlik"]
  }
]

const mockProjects = [
  {
    id: 1,
    title: "Ataşehir Rezidans Projesi",
    slug: "atasehir-rezidans",
    short_description: "Modern rezidans kompleksi hafriyat işleri",
    image_url: "/images/project1.jpg",
    location: "Ataşehir, İstanbul"
  },
  {
    id: 2,
    title: "Kadıköy Ticaret Merkezi",
    slug: "kadikoy-ticaret-merkezi",
    short_description: "Ticaret merkezi temel kazı işleri",
    image_url: "/images/project2.jpg",
    location: "Kadıköy, İstanbul"
  }
]

const mockRegions = [
  {
    id: 1,
    name: "Anadolu Yakası",
    slug: "anadolu-yakasi",
    short_description: "Ataşehir, Üsküdar, Kadıköy ve çevresinde hizmet",
    image_url: "/images/anadolu-yakasi.jpg",
    is_featured: true
  },
  {
    id: 2,
    name: "Avrupa Yakası",
    slug: "avrupa-yakasi",
    short_description: "Beşiktaş, Şişli, Beyoğlu ve çevresinde hizmet",
    image_url: "/images/avrupa-yakasi.jpg",
    is_featured: true
  }
]

const mockBlogPosts = [
  {
    id: 1,
    title: "Hafriyat İşlerinde Dikkat Edilmesi Gerekenler",
    slug: "hafriyat-islerinde-dikkat-edilmesi-gerekenler",
    excerpt: "Hafriyat işlerinde güvenlik ve kalite için önemli noktalar",
    image_url: "/images/blog1.jpg",
    created_at: "2024-01-15",
    author: "Coşkun Hafriyat",
    published_date: "2024-01-15"
  },
  {
    id: 2,
    title: "İş Makinesi Seçimi Nasıl Yapılır?",
    slug: "is-makinesi-secimi-nasil-yapilir",
    excerpt: "Doğru iş makinesi seçimi için rehber",
    image_url: "/images/blog2.jpg",
    created_at: "2024-01-10",
    author: "Coşkun Hafriyat",
    published_date: "2024-01-10"
  }
]

export default function Home() {
  const [services, setServices] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [regions, setRegions] = useState<any[]>([])
  const [blogPosts, setBlogPosts] = useState<any[]>([])
  const [heroSlides, setHeroSlides] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Client-side veri yükleme
    const loadData = async () => {
      try {
        // Local API çağrıları
        const [servicesData, projectsData, regionsData, blogPostsData, heroSlidesData] = await Promise.all([
         fetch('https://coskunhafriyat.com/api/admin/services').then(res => res.json()),
         fetch('https://coskunhafriyat.com/api/admin/projects').then(res => res.json()),
        fetch('https://coskunhafriyat.com/api/admin/regions').then(res => res.json()),
      fetch('https://coskunhafriyat.com/api/admin/blog').then(res => res.json()),
      fetch('https://coskunhafriyat.com/api/admin/hero-carousel').then(res => res.json())
       ])

        // API'den gelen verileri kullan
        setServices(servicesData)
        setProjects(projectsData)
        setRegions(regionsData)
        setBlogPosts(blogPostsData)
        setHeroSlides(heroSlidesData)
        setLoading(false)
      } catch (error) {
        console.error("Veri yükleme hatası:", error)
        // Hata durumunda mock data kullan
        setServices(mockServices)
        setProjects(mockProjects)
        setRegions(mockRegions)
        setBlogPosts(mockBlogPosts)
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />

      {/* Hero Carousel */}
      <HeroCarousel slides={heroSlides} />

      {/* Regions Section - Right after Hero */}
      {!loading && <RegionsSection regions={regions} />}
      <CTASection
        title="Bölgenizde Hizmet Alın"
        description="İstanbul'un tüm bölgelerinde aynı kalite ve güvenilirlikle hizmet veriyoruz. Hemen iletişime geçin!"
        variant="minimal"
      />
      {/* Services Section */}
      {!loading && <ServicesSection services={services} />}

      {/* CTA Section 1 */}
      <CTASection
        title="Hizmetlerimizle Tanışın"
        description="Profesyonel hafriyat, kazı, yıkım ve iş makinesi kiralama hizmetlerimizle projelerinizi güvenle tamamlayın."
        variant="secondary"
      />

      {/* CTA Section 2 */}
     

      {/* Projects Section */}
      {!loading && <ProjectsSection projects={projects} />}

      {/* CTA Section 3 */}
      <CTASection
        title="Projelerimizi İnceleyin"
        description="Tamamladığımız başarılı projeleri inceleyin ve sizin için de aynı kaliteyi sunabileceğimizi görün."
        variant="primary"
      />

      {/* Blog Section */}
      {!loading && <BlogSection blogPosts={blogPosts} />}

      {/* Features Section */}
      <section className="py-10 md:py-16 bg-gray-800 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <StaggerIn direction="up" staggerDelay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              <HoverCard>
                <div className="bg-gray-700 dark:bg-gray-800 p-6 md:p-8 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-amber-500/20 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <HardHat className="h-7 w-7 md:h-8 md:w-8 text-amber-500" />
                  </motion.div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-white dark:text-white">
                    Kalite Garantisi
                  </h3>
                  <p className="text-gray-300 dark:text-gray-300 text-sm sm:text-base">
                    Projelerimiz en yüksek kalite ve dayanıklılık standartlarını karşılar, memnuniyet garantimizle
                    desteklenir.
                  </p>
                </div>
              </HoverCard>
              <HoverCard>
                <div className="bg-gray-700 dark:bg-gray-800 p-6 md:p-8 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-amber-500/20 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Hammer className="h-7 w-7 md:h-8 md:w-8 text-amber-500" />
                  </motion.div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-white dark:text-white">
                    Uzman Operatörler
                  </h3>
                  <p className="text-gray-300 dark:text-gray-300 text-sm sm:text-base">
                    Ekibimiz hafriyat alanında onlarca yıllık birleşik deneyime sahip yetenekli profesyonellerden
                    oluşur.
                  </p>
                </div>
              </HoverCard>
              <HoverCard className="sm:col-span-2 md:col-span-1">
                <div className="bg-gray-700 dark:bg-gray-800 p-6 md:p-8 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-amber-500/20 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Compass className="h-7 w-7 md:h-8 md:w-8 text-amber-500" />
                  </motion.div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-white dark:text-white">
                    Yenilikçi Çözümler
                  </h3>
                  <p className="text-gray-300 dark:text-gray-300 text-sm sm:text-base">
                    Verimli ve sürdürülebilir sonuçlar sunmak için son teknoloji ve yöntemleri uyguluyoruz.
                  </p>
                </div>
              </HoverCard>
            </div>
          </StaggerIn>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 md:py-16 bg-amber-500 dark:bg-amber-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 text-center max-w-5xl mx-auto">
            <FadeIn direction="up" delay={0.1}>
              <div className="p-4 md:p-6">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1 md:mb-2">
                  <CountUp end={500} suffix="+" />
                </div>
                <p className="text-black dark:text-white font-medium text-sm md:text-base">Tamamlanan Proje</p>
              </div>
            </FadeIn>
            <FadeIn direction="up" delay={0.2}>
              <div className="p-4 md:p-6">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1 md:mb-2">
                  <CountUp end={15} suffix="+" />
                </div>
                <p className="text-black dark:text-white font-medium text-sm md:text-base">Yıllık Deneyim</p>
              </div>
            </FadeIn>
            <FadeIn direction="up" delay={0.3}>
              <div className="p-4 md:p-6">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1 md:mb-2">
                  <CountUp end={50} suffix="+" />
                </div>
                <p className="text-black dark:text-white font-medium text-sm md:text-base">Uzman Ekip Üyesi</p>
              </div>
            </FadeIn>
            <FadeIn direction="up" delay={0.4}>
              <div className="p-4 md:p-6">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1 md:mb-2">
                  <CountUp end={98} suffix="%" />
                </div>
                <p className="text-black dark:text-white font-medium text-sm md:text-base">Müşteri Memnuniyeti</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gray-900 dark:bg-black text-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
              Hafriyat Projenizi Başlatmaya Hazır mısınız?
            </h2>
            <p className="text-gray-200 dark:text-gray-300 text-sm sm:text-base md:text-lg max-w-xl sm:max-w-2xl mx-auto mb-6 md:mb-10">
              Bugün ücretsiz danışmanlık ve fiyat teklifi için bizimle iletişime geçin. Ekibimiz vizyonunuzu hassasiyet
              ve mükemmellikle hayata geçirmeye hazır.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/iletisim" className="w-full sm:w-auto">
                <HoverButton
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 md:px-8 w-full sm:w-auto"
                  hoverEffect="ripple"
                >
                  Ücretsiz Teklif Alın
                  <ChevronRight className="ml-2 h-4 w-4" />
                </HoverButton>
              </Link>
              <Link href="/iletisim" className="w-full sm:w-auto">
                <AnimatedButton
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-black font-semibold px-6 md:px-8 w-full sm:w-auto bg-transparent"
                  hoverEffect="pulse"
                  iconAnimation={true}
                >
                  Ekibimizle İletişime Geçin
                  <ChevronRight className="ml-2 h-4 w-4" />
                </AnimatedButton>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}