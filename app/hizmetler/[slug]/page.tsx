import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Phone, Mail } from "lucide-react"
import { SingleServiceJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld"

import { Button } from "@/components/ui/button"
import { getServiceBySlug, getServiceById } from "@/lib/database"
import { createSlug, convertTurkishToEnglish } from "@/lib/slug-utils"
import { notFound } from "next/navigation"
import { CTASection } from "@/components/cta-section"

interface ServicePageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ServicePageProps) {
  let service = await getServiceBySlug(params.slug)

  // If service not found in database, check if it's a region service
  if (!service) {
    // Check if slug matches pattern: region-name-service-name
    const slugParts = params.slug.split('-')
    if (slugParts.length >= 2) {
      // Try to find matching region and service
      const regionName = slugParts[0].charAt(0).toUpperCase() + slugParts[0].slice(1)
      
      // Get all regions to find matching one
      const { getRegions } = await import('@/lib/database')
      const regions = await getRegions()
      const matchingRegion = regions.find(region => 
        createSlug(region.name) === slugParts[0]
      )
      
      if (matchingRegion && matchingRegion.services_offered) {
        const matchingService = matchingRegion.services_offered.find(s => 
          createSlug(s) === slugParts.slice(1).join('-')
        )
        
        if (matchingService) {
          // Create dynamic service object for metadata
          service = {
            title: `${regionName} ${matchingService}`,
            short_description: `${regionName} bölgesinde ${matchingService.toLowerCase()} hizmetleri`,
            slug: params.slug,
            image_url: `/images/services/${createSlug(matchingService)}.jpg`
          }
        }
      }
    }
  }

  if (!service) {
    return {
      title: "Hizmet Bulunamadı | Coşkun Hafriyat",
    }
  }

  return {
    title: `${service.title} | Coşkun Hafriyat - Profesyonel Hafriyat Hizmetleri`,
    description: service.description || service.short_description,
    keywords: `${service.title}, hafriyat, kazı, yıkım, İstanbul, profesyonel hizmet`,
    openGraph: {
      title: `${service.title} | Coşkun Hafriyat`,
      description: service.description || service.short_description,
      url: `https://coskunhafriyat.com/hizmetler/${service.slug}`,
      siteName: "Coşkun Hafriyat",
      images: [
        {
          url: service.image_url || "https://coskunhafriyat.com/service-default-og.jpg",
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
      locale: "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | Coşkun Hafriyat`,
      description: service.description || service.short_description,
      images: [service.image_url || "https://coskunhafriyat.com/service-default-og.jpg"],
    },
    alternates: {
      canonical: `https://coskunhafriyat.com/hizmetler/${service.slug}`,
    },
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  let service = await getServiceBySlug(params.slug)

  // If service not found in database, check if it's a region service
  if (!service) {
    // Check if slug matches pattern: region-name-service-name
    const slugParts = params.slug.split('-')
    if (slugParts.length >= 2) {
      // Try to find matching region and service
      const regionName = slugParts[0].charAt(0).toUpperCase() + slugParts[0].slice(1)
      const serviceName = slugParts.slice(1).join(' ').replace(/\b\w/g, l => l.toUpperCase())
      
      // Get all regions to find matching one
      const { getRegions } = await import('@/lib/database')
      const regions = await getRegions()
      const matchingRegion = regions.find(region => 
        createSlug(region.name) === slugParts[0]
      )
      
      if (matchingRegion && matchingRegion.services_offered) {
        const matchingService = matchingRegion.services_offered.find(s => 
          createSlug(s) === slugParts.slice(1).join('-')
        )
        
        if (matchingService) {
          // Create dynamic service object
          service = {
            id: `region-${matchingRegion.id}-${slugParts.slice(1).join('-')}`,
            title: `${regionName} ${matchingService}`,
            slug: params.slug,
            short_description: `${regionName} bölgesinde ${matchingService.toLowerCase()} hizmetleri`,
            description: `${regionName} bölgesinde profesyonel ${matchingService.toLowerCase()} hizmetleri sunuyoruz. Modern ekipmanlarımız ve deneyimli ekibimizle güvenilir hizmet alabilirsiniz.`,
            image_url: `/images/services/${createSlug(matchingService)}.jpg`,
            price_range: "Fiyat için iletişime geçin",
            features: [
              "Profesyonel ekipman",
              "Deneyimli personel", 
              "Hızlı ve güvenli hizmet",
              "7/24 destek"
            ],
            is_featured: false,
            is_active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        }
      }
    }
  }

  if (!service) {
    notFound()
  }

  const breadcrumbItems = [
    { name: "Ana Sayfa", url: "/" },
    { name: "Hizmetlerimiz", url: "/hizmetler" },
    { name: service.title, url: `/hizmetler/${service.slug}` },
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
              href="/hizmetler"
              className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Hizmetlere Geri Dön
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">{service.title}</h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl">{service.short_description}</p>
            {service.price_range && (
              <div className="mt-6">
               {/*  <span className="inline-block bg-amber-500 text-black px-4 py-2 rounded-full font-semibold">
                  {service.price_range}
                </span> */}
              </div>
            )}
          </div>
        </section>

        {/* Service Details */}
        <section className="py-12 md:py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-6 dark:text-white">Hizmet Detayları</h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{service.description || service.short_description}</p>
                  </div>
                </div>

                {service.features && Array.isArray(service.features) && service.features.length > 0 && (
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-6 dark:text-white">Hizmet Özellikleri</h3>
                    <ul className="space-y-3">
                      {service.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          title={`${service.title} Hizmeti İçin Teklif Alın`}
          description="Uzman ekibimizden ücretsiz keşif ve detaylı teklif almak için hemen iletişime geçin."
          variant="minimal"
        />

        {/* Additional CTA Section */}
        <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 dark:text-white">
                Profesyonel Hizmet Garantisi
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Kaliteli hizmet ve müşteri memnuniyeti odaklı yaklaşımımızla projelerinizi güvenle tamamlayın.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/iletisim">
                  <Button size="lg" className="bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-black dark:text-white font-semibold px-8">
                    <Phone className="mr-2 h-5 w-5" />
                    Hemen Ara
                  </Button>
                </Link>
                <Link href="/iletisim">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white dark:border-amber-400 dark:text-amber-400 dark:hover:bg-amber-400 dark:hover:text-black bg-transparent"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Teklif İste
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
