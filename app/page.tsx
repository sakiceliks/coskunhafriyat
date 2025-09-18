"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle, ChevronRight, HardHat, Hammer, Compass, MapPin, Star, Calendar, User, Ruler } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedButton } from "@/components/ui/animated-button"
import { HoverButton } from "@/components/ui/hover-button"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerIn } from "@/components/animations/stagger-in"
import { ScaleIn } from "@/components/animations/scale-in"
import { HoverCard } from "@/components/animations/hover-card"
import { CountUp } from "@/components/animations/count-up"
import { ScrollProgress } from "@/components/animations/scroll-progress"
import { getServices, getProjects, getRegions } from "@/lib/database"

export default async function Home() {
  // Veri çekme işlemleri
  const [services, projects, regions] = await Promise.all([
    getServices().catch(() => []),
    getProjects().catch(() => []),
    getRegions().catch(() => [])
  ])

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
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
              <div className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-3 md:mb-4">
                Hizmetlerimiz
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
                Profesyonel Hafriyat Hizmetleri
              </h2>
              <p className="text-base md:text-lg text-gray-700">
                İhtiyacınıza özel hafriyat, kazı, yıkım ve nakliye çözümleri ile projelerinizi güvenle tamamlayın.
              </p>
            </div>
          </FadeIn>

          <StaggerIn direction="up" staggerDelay={0.1}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              {services.slice(0, 6).map((service: any, index: number) => (
                <HoverCard key={service.id}>
                  <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100">
                    <div className="relative h-48 md:h-56 overflow-hidden">
                      <Image
                        src={service.image_url || "/images/hero-2.png"}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6 md:p-8">
                      <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-900">{service.title}</h3>
                      <p className="text-gray-700 mb-4 text-sm sm:text-base line-clamp-3">
                        {service.short_description}
                      </p>
                      <Link href={`/hizmetler/${service.slug}`}>
                        <Button className="bg-amber-500 hover:bg-amber-600 text-black w-full">
                          Detayları Görün
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </HoverCard>
              ))}
            </div>
          </StaggerIn>

          <div className="text-center mt-10">
            <Link href="/hizmetler">
              <AnimatedButton
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold"
                hoverEffect="shine"
              >
                Tüm Hizmetleri Görün
                <ArrowRight className="ml-2 h-4 w-4" />
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Regions Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
              <div className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-3 md:mb-4">
                Bölgelerimiz
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
                İstanbul Geneli Hizmet
              </h2>
              <p className="text-base md:text-lg text-gray-700">
                Modern ekipmanlarımız ve deneyimli ekibimizle İstanbul'un her bölgesinde güvenilir hafriyat hizmetleri sunuyoruz.
              </p>
            </div>
          </FadeIn>

          <StaggerIn direction="up" staggerDelay={0.1}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              {regions.slice(0, 6).map((region: any, index: number) => (
                <HoverCard key={region.id}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100">
                    <div className="relative h-48 md:h-56 overflow-hidden">
                      <Image
                        src={region.image_url || "/images/hero-3.png"}
                        alt={region.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {region.is_featured && (
                        <div className="absolute top-4 left-4 bg-amber-500 text-black px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                          <Star className="h-4 w-4 mr-1" />
                          Öne Çıkan
                        </div>
                      )}
                    </div>
                    <div className="p-6 md:p-8">
                      <div className="flex items-center mb-3">
                        <MapPin className="h-5 w-5 text-amber-500 mr-2" />
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900">{region.name}</h3>
                      </div>
                      <p className="text-gray-700 mb-4 text-sm sm:text-base line-clamp-3">
                        {region.short_description}
                      </p>
                      <Link href={`/bolgelerimiz/${region.slug}`}>
                        <Button className="bg-amber-500 hover:bg-amber-600 text-black w-full">
                          Detayları Görün
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </HoverCard>
              ))}
            </div>
          </StaggerIn>

          <div className="text-center mt-10">
            <Link href="/bolgelerimiz">
              <AnimatedButton
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold"
                hoverEffect="shine"
              >
                Tüm Bölgeleri Görün
                <ArrowRight className="ml-2 h-4 w-4" />
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
              <div className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-3 md:mb-4">
                Projelerimiz
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
                Başarılı Projelerimiz
              </h2>
              <p className="text-base md:text-lg text-gray-700">
                Uzmanlığımızı ve mükemmellik taahhüdümüzü sergileyen başarılı projelerimizi keşfedin.
              </p>
            </div>
          </FadeIn>

          <StaggerIn direction="up" staggerDelay={0.1}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              {projects.slice(0, 6).map((project: any, index: number) => (
                <HoverCard key={project.id}>
                  <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100">
                    <div className="relative h-48 md:h-56 overflow-hidden">
                      <Image
                        src={project.image_url || "/images/hero-4.png"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6 md:p-8">
                      <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-900">{project.title}</h3>
                      <p className="text-gray-700 mb-4 text-sm sm:text-base line-clamp-3">
                        {project.short_description}
                      </p>
                      
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        {project.location && (
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                            <span>{project.location}</span>
                          </div>
                        )}
                        {project.project_type && (
                          <div className="flex items-center">
                            <HardHat className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                            <span>{project.project_type}</span>
                          </div>
                        )}
                      </div>

                      <Link href={`/projeler/${project.slug || project.id}`}>
                        <Button className="bg-amber-500 hover:bg-amber-600 text-black w-full">
                          Detayları Görün
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </HoverCard>
              ))}
            </div>
          </StaggerIn>

          <div className="text-center mt-10">
            <Link href="/projeler">
              <AnimatedButton
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold"
                hoverEffect="shine"
              >
                Tüm Projeleri Görün
                <ArrowRight className="ml-2 h-4 w-4" />
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </section>

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
