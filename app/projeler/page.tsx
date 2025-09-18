import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin, Calendar, User, Ruler } from "lucide-react"
import { OrganizationJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getProjects } from "@/lib/database"

export const metadata = {
  title: "Projelerimiz | Coşkun Hafriyat - Başarılı Hafriyat ve Kazı Projeleri",
  description:
    "Coşkun Hafriyat'ın tamamladığı hafriyat, kazı ve yıkım projelerini keşfedin. ✓ Konut ✓ Ticari ✓ Sanayi ✓ Villa projeleri. İstanbul genelinde başarılı proje portföyümüz.",
  keywords:
    "hafriyat projeleri, kazı projeleri, yıkım projeleri, konut hafriyat, ticari kazı, sanayi hafriyat, villa kazı",
  openGraph: {
    title: "Projelerimiz | Coşkun Hafriyat",
    description: "Coşkun Hafriyat'ın tamamladığı hafriyat, kazı ve yıkım projelerini keşfedin",
    url: "https://coskunhafriyat.com/projeler",
    siteName: "Coşkun Hafriyat",
    images: [
      {
        url: "https://coskunhafriyat.com/projeler-og.jpg",
        width: 1200,
        height: 630,
        alt: "Coşkun Hafriyat Projeleri",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projelerimiz | Coşkun Hafriyat",
    description: "Coşkun Hafriyat'ın tamamladığı hafriyat, kazı ve yıkım projelerini keşfedin",
    images: ["https://coskunhafriyat.com/projeler-og.jpg"],
  },
  alternates: {
    canonical: "https://coskunhafriyat.com/projeler",
  },
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  const projectsByType = {
    all: projects,
    konut: projects.filter((p: any) => p.project_type?.toLowerCase() === "konut"),
    ticari: projects.filter((p: any) => p.project_type?.toLowerCase() === "ticari"),
    sanayi: projects.filter((p: any) => p.project_type?.toLowerCase() === "sanayi"),
    villa: projects.filter((p: any) => p.project_type?.toLowerCase() === "villa"),
  }

  const breadcrumbItems = [
    { name: "Ana Sayfa", url: "/" },
    { name: "Projelerimiz", url: "/projeler" },
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
            src="/excavation-projects-hero.jpg"
            alt="Hafriyat projeleri"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4">Projelerimiz</h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-xl sm:max-w-2xl">
              Uzmanlığımızı ve mükemmellik taahhüdümüzü sergileyen başarılı projelerimizi keşfedin.
            </p>
          </div>
        </section>

        {/* Projects Gallery */}
        <section className="py-12 md:py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
              <div className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-3 md:mb-4">
                Proje Portföyümüz
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-6">Öne Çıkan Projeler</h2>
              <p className="text-base md:text-lg text-gray-700">
                Çeşitli sektörlerde tamamladığımız projelerimizden oluşan geniş portföyümüze göz atın.
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <Tabs defaultValue="all" className="mb-8 md:mb-12">
                <div className="flex justify-center overflow-x-auto pb-2 -mx-4 px-4">
                  <TabsList className="flex space-x-2 p-1 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <TabsTrigger value="all" className="px-4 py-2 text-sm rounded-md">
                      Tümü
                    </TabsTrigger>
                    <TabsTrigger value="konut" className="px-4 py-2 text-sm rounded-md">
                      Konut
                    </TabsTrigger>
                    <TabsTrigger value="ticari" className="px-4 py-2 text-sm rounded-md">
                      Ticari
                    </TabsTrigger>
                    <TabsTrigger value="sanayi" className="px-4 py-2 text-sm rounded-md">
                      Sanayi
                    </TabsTrigger>
                    <TabsTrigger value="villa" className="px-4 py-2 text-sm rounded-md">
                      Villa
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="all" className="mt-6 md:mt-8">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {projectsByType.all.map((project: any) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="konut" className="mt-6 md:mt-8">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {projectsByType.konut.map((project: any) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="ticari" className="mt-6 md:mt-8">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {projectsByType.ticari.map((project: any) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="sanayi" className="mt-6 md:mt-8">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {projectsByType.sanayi.map((project: any) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="villa" className="mt-6 md:mt-8">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {projectsByType.villa.map((project: any) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-12 md:py-20 bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-6xl mx-auto">
              <div>
                <div className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-3 md:mb-4">
                  Yaklaşımımız
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
                  Mükemmelliği Nasıl Sunuyoruz
                </h2>
                <p className="text-base md:text-lg text-gray-700 mb-6">
                  Üstlendiğimiz her proje, kalite, zamanında teslimat ve müşteri memnuniyetini sağlamak için titiz bir
                  süreci takip eder.
                </p>
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-start">
                    <div className="bg-amber-100 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                      <span className="text-amber-700 font-bold text-sm md:text-base">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-base md:text-lg">Kapsamlı Planlama</h3>
                      <p className="text-gray-700 text-sm md:text-base">
                        Net hedefler, zaman çizelgeleri ve bütçeler oluşturmak için kapsamlı planlama ile başlıyoruz.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-amber-100 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                      <span className="text-amber-700 font-bold text-sm md:text-base">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-base md:text-lg">Kaliteli Ekipman</h3>
                      <p className="text-gray-700 text-sm md:text-base">
                        Dayanıklılık ve uzun ömür sağlamak için sadece en kaliteli ekipmanları kullanıyoruz.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-amber-100 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                      <span className="text-amber-700 font-bold text-sm md:text-base">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-base md:text-lg">Uzman Uygulama</h3>
                      <p className="text-gray-700 text-sm md:text-base">
                        Deneyimli ekibimiz her aşamayı hassasiyet ve detaylara özen göstererek gerçekleştirir.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-amber-100 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                      <span className="text-amber-700 font-bold text-sm md:text-base">4</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-base md:text-lg">Titiz Kalite Kontrolü</h3>
                      <p className="text-gray-700 text-sm md:text-base">
                        Yüksek standartlarımızı korumak için her aşamada kapsamlı denetimler yapıyoruz.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl mt-8 md:mt-0">
                <Image
                  src="/excavation-process-quality.jpg"
                  alt="Hafriyat süreci"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
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
              Portföyümüzde sergilediğimiz mükemmellikle vizyonunuzu nasıl hayata geçirebileceğimizi konuşmak için bugün
              bizimle iletişime geçin.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/iletisim">
                <Button
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 md:px-8 w-full sm:w-auto"
                >
                  İletişime Geçin
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

function ProjectCard({ project }: { project: any }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card className="overflow-hidden group h-full">
      <div className="relative h-48 sm:h-56 md:h-64 w-full">
        <Image
          src={project.image_url || "/placeholder.svg?height=400&width=600"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 md:p-6 w-full">
            <h3 className="text-lg md:text-xl font-bold text-white">{project.title}</h3>
            <p className="text-amber-300 mb-4">{project.project_type}</p>
            <Link href={`/projeler/${project.slug || project.id}`}>
              <Button variant="outline" className="text-white border-white hover:bg-white/20 bg-transparent">
                Detayları Görün
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-lg md:text-xl">{project.title}</CardTitle>
        <CardDescription className="text-amber-600">{project.project_type}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
        <p className="text-gray-700 text-sm sm:text-base mb-4">{project.short_description}</p>

        <div className="space-y-2 text-sm text-gray-600">
          {project.location && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
              <span>{project.location}</span>
            </div>
          )}
          {project.completion_date && (
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
              <span>{formatDate(project.completion_date)}</span>
            </div>
          )}
          {project.project_size && (
            <div className="flex items-center">
              <Ruler className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
              <span>{project.project_size}</span>
            </div>
          )}
          {project.client_name && (
            <div className="flex items-center">
              <User className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
              <span>{project.client_name}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 md:p-6 pt-0">
        <Link href={`/projeler/${project.slug || project.id}`}>
          <Button
            variant="outline"
            className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white text-sm sm:text-base w-full bg-transparent"
          >
            Detayları Görün
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
