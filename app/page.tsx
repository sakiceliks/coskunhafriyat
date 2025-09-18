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
import { getServices, getProjects, getRegions, getBlogPosts } from "@/lib/database"

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

export default async function Home() {
  // Server-side veri yükleme
  let services = mockServices
  let projects = mockProjects
  let regions = mockRegions
  let blogPosts = mockBlogPosts

  try {
    const [servicesData, projectsData, regionsData, blogPostsData] = await Promise.all([
      getServices(),
      getProjects(),
      getRegions(),
      getBlogPosts()
    ])

    // Veritabanından gelen veriler varsa kullan
    if (servicesData && servicesData.length > 0) services = servicesData
    if (projectsData && projectsData.length > 0) projects = projectsData
    if (regionsData && regionsData.length > 0) regions = regionsData
    if (blogPostsData && blogPostsData.length > 0) blogPosts = blogPostsData
  } catch (error) {
    console.error("Veri yükleme hatası:", error)
    // Hata durumunda mock data kullan (zaten yukarıda tanımlandı)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />

      {/* Hero Section with Static Background Image */}
      <section className="relative w-full overflow-hidden h-[600px] md:h-[700px] lg:h-[800px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-1.png"
            alt="İnşaat sahası arka planı"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
        </div>

        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* Hero Content */}
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block px-4 py-2 bg-amber-500/90 text-white rounded-full text-sm font-medium mb-4"
              >
                Profesyonel Hafriyat ve İş Makinesi Kiralama
              </motion.div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-md">
                İstanbul'un <span className="text-amber-400">Güvenilir</span> Hafriyat Çözümü
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-10 max-w-xl md:max-w-2xl mx-auto drop-shadow-md">
                JCB, kepçe, loader ve buldozer kiralama hizmetleri ile İstanbul genelinde hafriyat, kazı, yıkım ve
                nakliye işlerinizde yanınızdayız.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link href="/hizmetler" className="w-full sm:w-auto">
                  <AnimatedButton
                    size="lg"
                    className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 sm:px-8 w-full sm:w-auto"
                    hoverEffect="lift"
                    iconAnimation={true}
                  >
                    Hizmetlerimizi Keşfedin
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </AnimatedButton>
                </Link>
                <Link href="/projeler" className="w-full sm:w-auto">
                  <HoverButton
                    size="lg"
                    variant="outline"
                    className="text-white border-white bg-black/30 hover:bg-black/40 hover:text-white font-semibold px-6 sm:px-8 w-full sm:w-auto backdrop-blur-sm"
                    hoverEffect="glow"
                    rippleColor="rgba(255, 255, 255, 0.3)"
                  >
                    Projelerimizi İnceleyin
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </HoverButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection services={services} />

      {/* Regions Section */}
      <RegionsSection regions={regions} />

      {/* Projects Section */}
      <ProjectsSection projects={projects} />

      {/* Blog Section */}
      <BlogSection blogPosts={blogPosts} />

      {/* Features Section */}
      <section className="py-10 md:py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <StaggerIn direction="up" staggerDelay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              <HoverCard>
                <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-amber-100 dark:bg-amber-900 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <HardHat className="h-7 w-7 md:h-8 md:w-8 text-amber-600 dark:text-amber-400" />
                  </motion.div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-gray-900 dark:text-white">
                    Kalite Garantisi
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                    Projelerimiz en yüksek kalite ve dayanıklılık standartlarını karşılar, memnuniyet garantimizle
                    desteklenir.
                  </p>
                </div>
              </HoverCard>
              <HoverCard>
                <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-amber-100 dark:bg-amber-900 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Hammer className="h-7 w-7 md:h-8 md:w-8 text-amber-600 dark:text-amber-400" />
                  </motion.div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-gray-900 dark:text-white">
                    Uzman Operatörler
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                    Ekibimiz hafriyat alanında onlarca yıllık birleşik deneyime sahip yetenekli profesyonellerden
                    oluşur.
                  </p>
                </div>
              </HoverCard>
              <HoverCard className="sm:col-span-2 md:col-span-1">
                <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-amber-100 dark:bg-amber-900 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Compass className="h-7 w-7 md:h-8 md:w-8 text-amber-600 dark:text-amber-400" />
                  </motion.div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-gray-900 dark:text-white">
                    Yenilikçi Çözümler
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
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
                <p className="text-black dark:text-gray-100 font-medium text-sm md:text-base">Tamamlanan Proje</p>
              </div>
            </FadeIn>
            <FadeIn direction="up" delay={0.2}>
              <div className="p-4 md:p-6">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1 md:mb-2">
                  <CountUp end={15} suffix="+" />
                </div>
                <p className="text-black dark:text-gray-100 font-medium text-sm md:text-base">Yıllık Deneyim</p>
              </div>
            </FadeIn>
            <FadeIn direction="up" delay={0.3}>
              <div className="p-4 md:p-6">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1 md:mb-2">
                  <CountUp end={50} suffix="+" />
                </div>
                <p className="text-black dark:text-gray-100 font-medium text-sm md:text-base">Uzman Ekip Üyesi</p>
              </div>
            </FadeIn>
            <FadeIn direction="up" delay={0.4}>
              <div className="p-4 md:p-6">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1 md:mb-2">
                  <CountUp end={98} suffix="%" />
                </div>
                <p className="text-black dark:text-gray-100 font-medium text-sm md:text-base">Müşteri Memnuniyeti</p>
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
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xl sm:max-w-2xl mx-auto mb-6 md:mb-10">
              Bugün ücretsiz danışmanlık ve fiyat teklifi için bizimle iletişime geçin. Ekibimiz vizyonunuzu hassasiyet
              ve mükemmellikle hayata geçirmeye hazır.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/iletisim" className="w-full sm:w-auto">
                <HoverButton
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 md:px-8 w-full sm:w-auto"
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
                  className="text-white border-white hover:bg-white/10 hover:text-white font-semibold px-6 md:px-8 w-full sm:w-auto"
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