import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, MapPin, Phone, Mail, Star } from "lucide-react"
import { OrganizationJsonLd, BreadcrumbJsonLd, RegionJsonLd } from "@/components/seo/json-ld"

import { Button } from "@/components/ui/button"
import { getRegions } from "@/lib/database"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerIn } from "@/components/animations/stagger-in"
import { HoverCard } from "@/components/animations/hover-card"

export async function generateMetadata() {
  const regions = await getRegions().catch(() => [])
  
  return {
    title: "Bölgelerimiz | Coşkun Hafriyat - İstanbul Geneli Hafriyat Hizmetleri",
    description:
      "İstanbul'un tüm bölgelerinde profesyonel hafriyat, kazı, yıkım ve nakliye hizmetleri. Kadıköy, Beşiktaş, Şişli, Beyoğlu, Fatih, Üsküdar ve daha fazlası. Ücretsiz keşif için hemen arayın!",
    keywords: "bölgelerimiz, hafriyat, kazı, yıkım, İstanbul, Kadıköy, Beşiktaş, Şişli, Beyoğlu, Fatih, Üsküdar",
    openGraph: {
      title: "Bölgelerimiz | Coşkun Hafriyat",
      description: "İstanbul'un tüm bölgelerinde profesyonel hafriyat, kazı, yıkım ve nakliye hizmetleri",
      url: "https://coskunhafriyat.com/bolgelerimiz",
      siteName: "Coşkun Hafriyat",
      images: [
        {
          url: "https://coskunhafriyat.com/regions-og.jpg",
          width: 1200,
          height: 630,
          alt: "Coşkun Hafriyat Bölgelerimiz",
        },
      ],
      locale: "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Bölgelerimiz | Coşkun Hafriyat",
      description: "İstanbul'un tüm bölgelerinde profesyonel hafriyat, kazı, yıkım ve nakliye hizmetleri",
      images: ["https://coskunhafriyat.com/regions-og.jpg"],
    },
    alternates: {
      canonical: "https://coskunhafriyat.com/bolgelerimiz",
    },
  }
}

export default async function RegionsPage() {
  let regions: any[] = []
  
  try {
    regions = await getRegions()
  } catch (error) {
    console.error("Bölgeler yüklenirken hata:", error)
    regions = []
  }

  // Güvenlik kontrolü
  if (!Array.isArray(regions)) {
    regions = []
  }

  const breadcrumbItems = [
    { name: "Ana Sayfa", url: "/" },
    { name: "Bölgelerimiz", url: "/bolgelerimiz" },
  ]

  return (
    <>
      <OrganizationJsonLd />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <RegionJsonLd regions={regions} />

      <div className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <section className="relative h-[300px] sm:h-[400px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <Image
            src="/images/hero-2.png"
            alt="İstanbul bölgeleri hafriyat hizmetleri"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4">Bölgelerimiz</h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-xl sm:max-w-2xl">
              İstanbul'un tüm bölgelerinde profesyonel hafriyat, kazı, yıkım ve nakliye hizmetleri sunuyoruz.
            </p>
          </div>
        </section>

        {/* Featured Regions */}
        <section className="py-12 md:py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
                <div className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-3 md:mb-4">
                  Hizmet Verdiğimiz Bölgeler
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-6">İstanbul Geneli Hafriyat Hizmetleri</h2>
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300">
                  Modern ekipmanlarımız ve deneyimli ekibimizle İstanbul'un her bölgesinde güvenilir hafriyat hizmetleri sunuyoruz.
                </p>
              </div>
            </FadeIn>

                     <StaggerIn direction="up" staggerDelay={0.1}>
                       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 max-w-7xl mx-auto">
                {regions.length === 0 ? (
                  <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5 text-center py-12">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Bölgelerimiz Yakında</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Hizmet verdiğimiz bölgelerin listesi yakında eklenecek.
                      </p>
                      <Link href="/iletisim">
                        <Button className="bg-amber-500 hover:bg-amber-600 text-black">
                          İletişime Geçin
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  regions.map((region: any, index: number) => (
                  <HoverCard key={region.id}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100 dark:border-gray-700">
                      <div className="relative h-32 md:h-40 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900 dark:to-amber-800 flex items-center justify-center">
                        <div className="text-center">
                          <MapPin className="h-12 w-12 md:h-16 md:w-16 text-amber-500 dark:text-amber-400 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                          <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">{region.name}</h3>
                        </div>
                        {region.is_featured && (
                          <div className="absolute top-4 left-4 bg-amber-500 text-black px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                            <Star className="h-4 w-4 mr-1" />
                            Öne Çıkan
                          </div>
                        )}
                      </div>
                      <div className="p-6 md:p-8">
                        <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm sm:text-base line-clamp-3">
                          {region.short_description}
                        </p>

                        {region.services_offered && region.services_offered.length > 0 && (
                          <div className="mb-5">
                            <div className="flex flex-wrap gap-2">
                              {region.services_offered.slice(0, 3).map((service: string, idx: number) => (
                                <span
                                  key={idx}
                                  className="inline-block bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-medium"
                                >
                                  {service}
                                </span>
                              ))}
                              {region.services_offered.length > 3 && (
                                <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
                                  +{region.services_offered.length - 3} daha
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="space-y-2 mb-6">
                          {region.contact_phone && (
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <Phone className="h-4 w-4 text-amber-500 mr-2" />
                              <span>{region.contact_phone}</span>
                            </div>
                          )}
                          {region.contact_email && (
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <Mail className="h-4 w-4 text-amber-500 mr-2" />
                              <span>{region.contact_email}</span>
                            </div>
                          )}
                        </div>

                        <Link href={`/bolgelerimiz/${region.slug}`}>
                          <Button className="bg-amber-500 hover:bg-amber-600 text-black w-full">
                            Detayları Görün
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </HoverCard>
                  ))
                )}
              </div>
            </StaggerIn>
          </div>
        </section>

        {/* Why Choose Us for All Regions */}
        <section className="py-12 md:py-20 bg-gray-500">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
                <div className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-3 md:mb-4">
                  Neden Tüm Bölgelerde Bizi Seçmelisiniz
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-6">İstanbul Geneli Güvenilir Hizmet</h2>
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300">
                  Her bölgede aynı kalite ve güvenilirlik standartlarımızla hizmet veriyoruz.
                </p>
              </div>
            </FadeIn>

            <StaggerIn direction="up" staggerDelay={0.1}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-amber-100 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-4">
                      <benefit.icon className="h-6 w-6 md:h-7 md:w-7 text-amber-600" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold mb-3 text-gray-900 dark:text-white">{benefit.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </StaggerIn>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <FadeIn>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
                Bölgenizde Hafriyat Hizmeti Almak İster misiniz?
              </h2>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xl md:max-w-2xl mx-auto mb-6 md:mb-10">
                İstanbul'un her bölgesinde ücretsiz keşif ve detaylı teklif için hemen bizimle iletişime geçin.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link href="/iletisim" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 md:px-8 w-full sm:w-auto"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Ücretsiz Keşif İsteyin
                  </Button>
                </Link>
                <Link href="/iletisim" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-white border-white hover:bg-white/10 hover:text-white font-semibold px-6 md:px-8 w-full sm:w-auto"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Teklif Alın
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </div>
    </>
  )
}

const benefits = [
  {
    icon: MapPin,
    title: "Tüm Bölgelerde Hizmet",
    description: "İstanbul'un her bölgesinde aynı kalite ve güvenilirlikle hizmet veriyoruz.",
  },
  {
    icon: CheckCircle,
    title: "Deneyimli Ekip",
    description: "Her bölgede uzman ekibimizle profesyonel hizmet sunuyoruz.",
  },
  {
    icon: Star,
    title: "Kalite Garantisi",
    description: "Tüm bölgelerde aynı yüksek kalite standartlarımızı koruyoruz.",
  },
]
