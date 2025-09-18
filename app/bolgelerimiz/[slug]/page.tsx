import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Phone, Mail, MapPin, Star, Clock, Users } from "lucide-react"
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld"

import { Button } from "@/components/ui/button"
import { getRegionBySlug, getRegionById } from "@/lib/database"
import { notFound } from "next/navigation"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerIn } from "@/components/animations/stagger-in"

interface RegionPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: RegionPageProps) {
  const region = await getRegionBySlug(params.slug)

  if (!region) {
    return {
      title: "Bölge Bulunamadı | Coşkun Hafriyat",
    }
  }

  return {
    title: `${region.name} Hafriyat Hizmetleri | Coşkun Hafriyat`,
    description: region.description || region.short_description,
    keywords: `${region.name}, hafriyat, kazı, yıkım, İstanbul, ${region.location}, profesyonel hizmet`,
    openGraph: {
      title: `${region.name} Hafriyat Hizmetleri | Coşkun Hafriyat`,
      description: region.description || region.short_description,
      url: `https://coskunhafriyat.com/bolgelerimiz/${region.slug}`,
      siteName: "Coşkun Hafriyat",
      images: [
        {
          url: region.image_url || "https://coskunhafriyat.com/region-default-og.jpg",
          width: 1200,
          height: 630,
          alt: `${region.name} hafriyat hizmetleri`,
        },
      ],
      locale: "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${region.name} Hafriyat Hizmetleri | Coşkun Hafriyat`,
      description: region.description || region.short_description,
      images: [region.image_url || "https://coskunhafriyat.com/region-default-og.jpg"],
    },
    alternates: {
      canonical: `https://coskunhafriyat.com/bolgelerimiz/${region.slug}`,
    },
  }
}

export default async function RegionPage({ params }: RegionPageProps) {
  const region = await getRegionBySlug(params.slug)

  if (!region) {
    notFound()
  }

  const breadcrumbItems = [
    { name: "Ana Sayfa", url: "/" },
    { name: "Bölgelerimiz", url: "/bolgelerimiz" },
    { name: region.name, url: `/bolgelerimiz/${region.slug}` },
  ]

  return (
    <>
      <ServiceJsonLd service={region} />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <div className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <section className="relative h-[400px] sm:h-[500px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <Image
            src={region.image_url || "/images/hero-3.png"}
            alt={`${region.name} hafriyat hizmetleri`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
            <Link
              href="/bolgelerimiz"
              className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Bölgelere Geri Dön
            </Link>
            <div className="flex items-center mb-4">
              <MapPin className="h-6 w-6 text-amber-400 mr-3" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{region.name}</h1>
              {region.is_featured && (
                <div className="ml-4 bg-amber-500 text-black px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  Öne Çıkan
                </div>
              )}
            </div>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl">{region.short_description}</p>
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

        {/* Region Details */}
        <section className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-start">
                <div>
                  <FadeIn>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6">{region.name} Bölgesi Hizmetlerimiz</h2>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-gray-700 leading-relaxed mb-6">
                        {region.description || region.short_description}
                      </p>
                    </div>
                  </FadeIn>

                  {region.services_offered && region.services_offered.length > 0 && (
                    <FadeIn delay={0.2}>
                      <div className="mt-8">
                        <h3 className="text-xl sm:text-2xl font-bold mb-6">Sunduğumuz Hizmetler</h3>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {region.services_offered.map((service: string, index: number) => (
                            <div key={index} className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                              <span className="text-gray-700">{service}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </FadeIn>
                  )}
                </div>

                <div className="space-y-6">
                  <FadeIn delay={0.4}>
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-xl font-bold mb-4">İletişim Bilgileri</h3>
                      <div className="space-y-4">
                        {region.contact_phone && (
                          <div className="flex items-center">
                            <Phone className="h-5 w-5 text-amber-500 mr-3" />
                            <div>
                              <div className="font-medium">{region.contact_phone}</div>
                              <div className="text-sm text-gray-600">Telefon</div>
                            </div>
                          </div>
                        )}
                        {region.contact_email && (
                          <div className="flex items-center">
                            <Mail className="h-5 w-5 text-amber-500 mr-3" />
                            <div>
                              <div className="font-medium">{region.contact_email}</div>
                              <div className="text-sm text-gray-600">E-posta</div>
                            </div>
                          </div>
                        )}
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 text-amber-500 mr-3" />
                          <div>
                            <div className="font-medium">{region.location}</div>
                            <div className="text-sm text-gray-600">Konum</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FadeIn>

                  <FadeIn delay={0.6}>
                    <div className="bg-amber-50 p-6 rounded-xl">
                      <h3 className="text-xl font-bold mb-4 text-amber-800">Neden Bizi Seçmelisiniz?</h3>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-amber-800 text-sm">Bölgede uzman ekibimiz</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-amber-800 text-sm">Modern ekipmanlar</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-amber-800 text-sm">Hızlı ve güvenli hizmet</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-amber-800 text-sm">Rekabetçi fiyatlar</span>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        {region.gallery_images && region.gallery_images.length > 0 && (
          <section className="py-12 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <FadeIn>
                <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-6">
                    {region.name} Bölgesi Çalışmalarımız
                  </h2>
                  <p className="text-base md:text-lg text-gray-700">
                    Bu bölgede gerçekleştirdiğimiz projelerden örnekler
                  </p>
                </div>
              </FadeIn>

              <StaggerIn direction="up" staggerDelay={0.1}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {region.gallery_images.slice(0, 6).map((image: string, index: number) => (
                    <div key={index} className="relative h-48 rounded-xl overflow-hidden group">
                      <Image
                        src={image}
                        alt={`${region.name} proje ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              </StaggerIn>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <FadeIn>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                  {region.name} Bölgesinde Hafriyat Hizmeti Almak İster misiniz?
                </h2>
                <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                  {region.name} bölgesinde ücretsiz keşif ve detaylı teklif almak için hemen bizimle iletişime geçin.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/iletisim">
                    <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8">
                      <Phone className="mr-2 h-5 w-5" />
                      Hemen Ara
                    </Button>
                  </Link>
                  <Link href="/iletisim">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white/10 hover:text-white bg-transparent"
                    >
                      <Mail className="mr-2 h-5 w-5" />
                      Teklif İste
                    </Button>
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
