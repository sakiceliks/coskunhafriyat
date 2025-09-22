import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Phone, Mail, MapPin, Star } from "lucide-react"
import { SingleServiceJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld"

import { Button } from "@/components/ui/button"
import { getRegionBySlug } from "@/lib/database"
import { createSlug, convertTurkishToEnglish } from "@/lib/slug-utils"
import { notFound } from "next/navigation"
import { FadeIn } from "@/components/animations/fade-in"
import { CTASection } from "@/components/cta-section"

interface RegionServicePageProps {
  params: {
    region: string
    service: string
  }
}

export async function generateMetadata({ params }: RegionServicePageProps) {
  const regionSlug = params.region
  const serviceSlug = params.service
  
  // Get region data
  const region = await getRegionBySlug(regionSlug)
  
  if (!region) {
    return {
      title: "Bölge Bulunamadı | Coşkun Hafriyat",
    }
  }

  // Find the service in region's services_offered
  const serviceName = region.services_offered?.find(service => 
    createSlug(service) === serviceSlug
  )

  if (!serviceName) {
    return {
      title: "Hizmet Bulunamadı | Coşkun Hafriyat",
    }
  }

  const title = `${region.name} ${serviceName}`
  const description = `${region.name} bölgesinde profesyonel ${serviceName.toLowerCase()} hizmetleri sunuyoruz. Modern ekipmanlarımız ve deneyimli ekibimizle güvenilir hizmet alabilirsiniz.`

  return {
    title: `${title} | Coşkun Hafriyat - Profesyonel Hafriyat Hizmetleri`,
    description,
    keywords: `${title}, hafriyat, kazı, yıkım, ${region.name}, profesyonel hizmet`,
    openGraph: {
      title: `${title} | Coşkun Hafriyat`,
      description,
      url: `https://coskunhafriyat.com/bolgelerimiz/${regionSlug}/${serviceSlug}`,
      siteName: "Coşkun Hafriyat",
      images: [
        {
          url: `/images/services/${createSlug(serviceName)}.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Coşkun Hafriyat`,
      description,
      images: [`/images/services/${createSlug(serviceName)}.jpg`],
    },
    alternates: {
      canonical: `https://coskunhafriyat.com/bolgelerimiz/${regionSlug}/${serviceSlug}`,
    },
  }
}

export default async function RegionServicePage({ params }: RegionServicePageProps) {
  const regionSlug = params.region
  const serviceSlug = params.service
  
  // Get region data
  const region = await getRegionBySlug(regionSlug)
  
  if (!region) {
    notFound()
  }

  // Find the service in region's services_offered
  const serviceName = region.services_offered?.find(service => 
    createSlug(service) === serviceSlug
  )

  if (!serviceName) {
    notFound()
  }

  // Create service object
  const service = {
    id: `region-${region.id}-${createSlug(serviceName)}`,
    title: `${region.name} ${serviceName}`,
    slug: `${regionSlug}-${serviceSlug}`,
    short_description: `${region.name} bölgesinde ${serviceName.toLowerCase()} hizmetleri`,
    description: `${region.name} bölgesinde profesyonel ${serviceName.toLowerCase()} hizmetleri sunuyoruz. Modern ekipmanlarımız ve deneyimli ekibimizle güvenilir hizmet alabilirsiniz.`,
    image_url: `/images/services/${createSlug(serviceName)}.jpg`,
    price_range: "Fiyat için iletişime geçin",
    features: [
      "Profesyonel ekipman",
      "Deneyimli personel", 
      "Hızlı ve güvenli hizmet",
      "7/24 destek",
      "Bölge uzmanı ekibimiz",
      "Modern teknoloji"
    ],
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }

  const breadcrumbItems = [
    { name: "Ana Sayfa", url: "/" },
    { name: "Bölgelerimiz", url: "/bolgelerimiz" },
    { name: region.name, url: `/bolgelerimiz/${region.slug}` },
    { name: serviceName, url: `/bolgelerimiz/${regionSlug}/${serviceSlug}` },
  ]

  return (
    <>
      <SingleServiceJsonLd service={service} />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <div className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <section className="relative h-[400px] sm:h-[500px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <Image
            src={service.image_url || "/placeholder.svg?height=500&width=1200"}
            alt={service.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
            <Link
              href={`/bolgelerimiz/${region.slug}`}
              className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {region.name} Bölgesine Geri Dön
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">{service.title}</h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl">{service.short_description}</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center text-white/90">
                <MapPin className="h-5 w-5 text-amber-400 mr-2" />
                <span>{region.location}</span>
              </div>
              {region.contact_phone && (
                <div className="flex items-center text-white/90">
                  <Phone className="h-5 w-5 text-amber-400 mr-2" />
                  <span>{region.contact_phone}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Service Details */}
        <section className="py-12 md:py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-start">
                <div>
                  <FadeIn>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 dark:text-white">{service.title}</h2>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                        {service.description}
                      </p>
                    </div>
                  </FadeIn>

                  {service.features && service.features.length > 0 && (
                    <FadeIn delay={0.2}>
                      <div className="mt-8">
                        <h3 className="text-xl sm:text-2xl font-bold mb-6 dark:text-white">Hizmet Özellikleri</h3>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {service.features.map((feature: string, index: number) => (
                            <div key={index} className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </FadeIn>
                  )}
                </div>

                <div className="space-y-6">
                  <FadeIn delay={0.4}>
                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                      <h3 className="text-xl font-bold mb-4 dark:text-white">İletişim Bilgileri</h3>
                      <div className="space-y-4">
                        {region.contact_phone && (
                          <div className="flex items-center">
                            <Phone className="h-5 w-5 text-amber-500 mr-3" />
                            <div>
                              <div className="font-medium dark:text-white">{region.contact_phone}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Telefon</div>
                            </div>
                          </div>
                        )}
                        {region.contact_email && (
                          <div className="flex items-center">
                            <Mail className="h-5 w-5 text-amber-500 mr-3" />
                            <div>
                              <div className="font-medium dark:text-white">{region.contact_email}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">E-posta</div>
                            </div>
                          </div>
                        )}
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 text-amber-500 mr-3" />
                          <div>
                            <div className="font-medium dark:text-white">{region.location}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Konum</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FadeIn>

                  <FadeIn delay={0.6}>
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl">
                      <h3 className="text-xl font-bold mb-4 text-amber-800 dark:text-amber-300">Neden Bizi Seçmelisiniz?</h3>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-amber-800 dark:text-amber-300 text-sm">Bölgede uzman ekibimiz</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-amber-800 dark:text-amber-300 text-sm">Modern ekipmanlar</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-amber-800 dark:text-amber-300 text-sm">Hızlı ve güvenli hizmet</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-amber-800 dark:text-amber-300 text-sm">Rekabetçi fiyatlar</span>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          title={`${region.name} Bölgesinde ${serviceName} Hizmeti Almak İster misiniz?`}
          description={`${region.name} bölgesinde ${serviceName.toLowerCase()} hizmeti için ücretsiz keşif ve detaylı teklif almak için hemen bizimle iletişime geçin.`}
          variant="primary"
        />
      </div>
    </>
  )
}
