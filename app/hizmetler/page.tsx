import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"
import { OrganizationJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld"

import { Button } from "@/components/ui/button"
import { getServices } from "@/lib/database"

export const metadata = {
  title: "Hizmetlerimiz | Coşkun Hafriyat - Profesyonel Hafriyat, Kazı ve Yıkım Hizmetleri",
  description:
    "İstanbul'da profesyonel hafriyat, kazı, yıkım ve nakliye hizmetleri. ✓ Deneyimli ekip ✓ Modern ekipman ✓ Uygun fiyat ✓ 7/24 hizmet. Ücretsiz keşif için hemen arayın!",
  keywords: "hafriyat, kazı, yıkım, nakliye, İstanbul, profesyonel, uygun fiyat",
  openGraph: {
    title: "Hizmetlerimiz | Coşkun Hafriyat",
    description: "İstanbul'da profesyonel hafriyat, kazı, yıkım ve nakliye hizmetleri",
    url: "https://coskunhafriyat.com/hizmetler",
    siteName: "Coşkun Hafriyat",
    images: [
      {
        url: "https://coskunhafriyat.com/hizmetler-og.jpg",
        width: 1200,
        height: 630,
        alt: "Coşkun Hafriyat Hizmetleri",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hizmetlerimiz | Coşkun Hafriyat",
    description: "İstanbul'da profesyonel hafriyat, kazı, yıkım ve nakliye hizmetleri",
    images: ["https://coskunhafriyat.com/hizmetler-og.jpg"],
  },
  alternates: {
    canonical: "https://coskunhafriyat.com/hizmetler",
  },
}

export default async function ServicesPage() {
  let services = []
  
  try {
    // API endpoint'ini kullan
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/admin/services`, {
      cache: 'no-store' // Her zaman fresh data al
    })
    if (response.ok) {
      services = await response.json()
    } else {
      // Fallback olarak getServices kullan
      services = await getServices()
    }
  } catch (error) {
    console.error("Hizmetler yüklenirken hata:", error)
    try {
      // Son çare olarak getServices kullan
      services = await getServices()
    } catch (fallbackError) {
      console.error("Fallback hizmetler yüklenirken hata:", fallbackError)
      services = []
    }
  }

  const breadcrumbItems = [
    { name: "Ana Sayfa", url: "/" },
    { name: "Hizmetlerimiz", url: "/hizmetler" },
  ]

  return (
    <>
      <OrganizationJsonLd />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <div className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <section className="relative h-[300px] sm:h-[400px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <Image
            src="/placeholder-g3gfp.png"
            alt="Hafriyat hizmetleri"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4">Hizmetlerimiz</h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-xl sm:max-w-2xl">
              İhtiyacınıza özel hafriyat, kazı, yıkım ve nakliye çözümleri ile projelerinizi güvenle tamamlayın.
            </p>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-12 md:py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
              <div className="inline-block px-4 py-2 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-full text-sm font-medium mb-3 md:mb-4">
                Sunduğumuz Hizmetler
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-6 text-gray-900 dark:text-white">Kapsamlı Hafriyat Çözümleri</h2>
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300">
                Konseptten tamamlanmaya kadar, vizyonunuzu hassasiyet ve mükemmellikle hayata geçirmek için uçtan uca
                hizmetler sunuyoruz.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 max-w-6xl mx-auto">
              {services.map((service: any, index: number) => (
                <div
                  key={service.id}
                  className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-200 dark:border-gray-700"
                >
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <Image
                      src={service.image_url || "/placeholder.svg?height=400&width=600"}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white">{service.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm sm:text-base">{service.short_description}</p>

                    {service.price_range && (
                      <div className="mb-4">
                       {/*  <span className="inline-block bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 px-3 py-1 rounded-full text-sm font-medium">
                          {service.price_range}
                        </span> */}
                      </div>
                    )}

                    {service.features && service.features.length > 0 && (
                      <div className="mb-5 md:mb-6">
                        <ul className="space-y-1">
                          {service.features.slice(0, 3).map((feature: string, idx: number) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <CheckCircle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Link href={`/hizmetler/${service.slug}`}>
                      <Button className="bg-amber-500 hover:bg-amber-600 text-black dark:text-black w-full">
                        Detayları Görün
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-12 md:py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
              <div className="inline-block px-4 py-2 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-full text-sm font-medium mb-3 md:mb-4">
                Çalışma Sürecimiz
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-6 text-white">Nasıl Çalışıyoruz</h2>
              <p className="text-base md:text-lg text-gray-300">
                Akıcı sürecimiz, ilk görüşmeden proje tamamlanmasına kadar sorunsuz bir deneyim sağlar.
              </p>
            </div>
            <div className="max-w-5xl mx-auto">
              <div className="relative">
                {/* Vertical line - hidden on mobile, visible on larger screens */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-amber-200 hidden md:block"></div>

                {/* Process steps - mobile optimized */}
                <div className="space-y-8 md:space-y-12 relative">
                  {processSteps.map((step, index) => (
                    <div
                      key={index}
                      className={`flex flex-col md:flex-row items-center gap-4 md:gap-8 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                    >
                      <div className="md:w-1/2 relative w-full">
                        <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-md relative z-10 border border-gray-200 dark:border-gray-700">
                          <div className="bg-amber-100 dark:bg-amber-900 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-3 md:mb-4">
                            <span className="text-amber-700 dark:text-amber-300 font-bold text-lg md:text-xl">{index + 1}</span>
                          </div>
                          <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-4 text-gray-900 dark:text-white">{step.title}</h3>
                          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{step.description}</p>
                        </div>
                        {/* Circle on the timeline - hidden on mobile */}
                        <div className="absolute top-1/2 left-0 md:left-auto md:right-0 transform translate-y-[-50%] translate-x-[-50%] md:translate-x-[50%] w-6 h-6 bg-amber-500 rounded-full border-4 border-white dark:border-gray-800 z-20 hidden md:block"></div>
                      </div>
                      <div className="md:w-1/2 hidden md:block">
                        {/* This div is just for spacing in the timeline */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 md:py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-6xl mx-auto">
              <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl order-2 md:order-1">
                <Image
                  src="/construction-quality-excavation-work.jpg"
                  alt="İnşaat kalitesi"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-block px-4 py-2 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-full text-sm font-medium mb-3 md:mb-4">
                  Neden Bizi Seçmelisiniz
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-6 text-gray-900 dark:text-white">Coşkun Hafriyat Farkı</h2>
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-5 md:mb-8">
                  Coşkun Hafriyat'ı seçtiğinizde, mükemmellik, yenilik ve tam memnuniyetinize odaklanan bir ortak
                  seçiyorsunuz.
                </p>
                <div className="space-y-4 md:space-y-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-amber-500 mr-2 md:mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-base md:text-lg text-gray-900 dark:text-white">{benefit.title}</h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
              Projenizi Başlatmaya Hazır mısınız?
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xl md:max-w-2xl mx-auto mb-6 md:mb-10">
              Ücretsiz danışmanlık için bugün bizimle iletişime geçin ve Coşkun Hafriyat'ın vizyonunuzu nasıl hayata
              geçirebileceğini keşfedin.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/iletisim">
                <Button
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-black font-medium px-6 md:px-8 w-full sm:w-auto"
                >
                  Ücretsiz Teklif Alın
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

const processSteps = [
  {
    title: "İlk Görüşme",
    description:
      "Vizyonunuzu, gereksinimlerinizi ve bütçe kısıtlarınızı anlamak için kapsamlı bir görüşme ile başlıyoruz.",
  },
  {
    title: "Keşif ve Planlama",
    description: "Saha keşfi yaparak detaylı planlar oluşturuyor, her aşamada geri bildirimlerinizi dahil ediyoruz.",
  },
  {
    title: "İzin ve Onaylar",
    description: "Projenizin sorunsuz ilerlemesi için gerekli tüm izinleri ve yasal onayları biz hallederiz.",
  },
  {
    title: "Hafriyat İşleri",
    description: "Deneyimli ekibimiz, kaliteli malzemeler ve detaylara özen göstererek projenizi hayata geçirir.",
  },
  {
    title: "Kalite Güvencesi",
    description:
      "İnşaat süreci boyunca titiz kalite kontrolleri yaparak her şeyin yüksek standartlarımızı karşıladığından emin oluruz.",
  },
  {
    title: "Proje Teslimi",
    description: "Tamamlanan projenizi zamanında teslim ediyor ve teslim sonrası da kapsamlı destek sağlıyoruz.",
  },
]

const benefits = [
  {
    title: "Deneyimli Ekip",
    description: "Ekibimiz hafriyat ve kazı işlerinin tüm alanlarında onlarca yıllık birleşik deneyim getiriyor.",
  },
  {
    title: "Kaliteli İş Gücü",
    description: "Dayanıklılık ve estetik görünüm sağlamak için sadece en iyi malzemeleri ve teknikleri kullanıyoruz.",
  },
  {
    title: "Şeffaf İletişim",
    description: "Düzenli güncellemeler ve açık iletişim ile proje boyunca sizi bilgilendiriyoruz.",
  },
  {
    title: "Zamanında Teslimat",
    description: "Son teslim tarihlerini karşılamak ve projeleri söz verdiğimiz gibi teslim etmekten gurur duyuyoruz.",
  },
  {
    title: "Rekabetçi Fiyatlar",
    description: "Gizli maliyet veya beklenmedik sürprizler olmayan adil, şeffaf fiyatlandırma.",
  },
]
