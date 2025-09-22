import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, Calendar, User, Ruler, CheckCircle, Phone, Mail } from "lucide-react"
import { notFound } from "next/navigation"
import { ProjectJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld"

import { Button } from "@/components/ui/button"
import { getProjectById, getProjectBySlug } from "@/lib/database"
import { CTASection } from "@/components/cta-section"

interface ProjectPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ProjectPageProps) {
  let project = await getProjectBySlug(params.id)

  // If not found and the slug is numeric, try getting by ID
  if (!project && /^\d+$/.test(params.id)) {
    project = await getProjectById(Number.parseInt(params.id))
  }

  if (!project) {
    return {
      title: "Proje Bulunamadı | Coşkun Hafriyat",
    }
  }

  return {
    title: `${project.title} | Coşkun Hafriyat - ${project.project_type} Hafriyat Projesi`,
    description: project.description || project.short_description,
    keywords: `${project.title}, ${project.project_type}, hafriyat projesi, kazı projesi, ${project.location || "İstanbul"}`,
    openGraph: {
      title: `${project.title} | Coşkun Hafriyat`,
      description: project.description || project.short_description,
      url: `https://coskunhafriyat.com/projeler/${project.slug || project.id}`,
      siteName: "Coşkun Hafriyat",
      images: [
        {
          url: project.image_url || "https://coskunhafriyat.com/project-default-og.jpg",
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      locale: "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Coşkun Hafriyat`,
      description: project.description || project.short_description,
      images: [project.image_url || "https://coskunhafriyat.com/project-default-og.jpg"],
    },
    alternates: {
      canonical: `https://coskunhafriyat.com/projeler/${project.slug || project.id}`,
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  let project = await getProjectBySlug(params.id)

  // If not found and the slug is numeric, try getting by ID
  if (!project && /^\d+$/.test(params.id)) {
    project = await getProjectById(Number.parseInt(params.id))
  }

  if (!project) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const breadcrumbItems = [
    { name: "Ana Sayfa", url: "/" },
    { name: "Projelerimiz", url: "/projeler" },
    { name: project.title, url: `/projeler/${project.slug || project.id}` },
  ]

  return (
    <>
      <ProjectJsonLd project={project} />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <div className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <section className="relative h-[300px] sm:h-[400px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <Image
            src={project.image_url || "/placeholder.svg?height=400&width=800"}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4">{project.title}</h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-xl sm:max-w-2xl">
              {project.short_description}
            </p>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-12 md:py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Back Button */}
              <Link href="/projeler" className="inline-flex items-center text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 mb-8">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Tüm Projelere Dön
              </Link>

              <div className="grid md:grid-cols-3 gap-10 md:gap-16">
                {/* Main Content */}
                <div className="md:col-span-2">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-6 dark:text-white">Proje Detayları</h2>
                  <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg mb-8 leading-relaxed">{project.description}</p>

                  {/* Project Gallery */}
                  {project.gallery_images && project.gallery_images.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 dark:text-white">Proje Galerisi</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {project.gallery_images.map((image: string, index: number) => (
                          <div key={index} className="relative h-48 sm:h-56 rounded-lg overflow-hidden">
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`${project.title} - Görsel ${index + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, 50vw"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Project Info Card */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                    <h3 className="text-xl font-semibold mb-4 dark:text-white">Proje Bilgileri</h3>
                    <div className="space-y-4">
                      {project.project_type && (
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                          <div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">Proje Türü:</span>
                            <p className="font-medium dark:text-white">{project.project_type}</p>
                          </div>
                        </div>
                      )}

                      {project.location && (
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                          <div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">Konum:</span>
                            <p className="font-medium dark:text-white">{project.location}</p>
                          </div>
                        </div>
                      )}

                      {project.completion_date && (
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                          <div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">Tamamlanma Tarihi:</span>
                            <p className="font-medium dark:text-white">{formatDate(project.completion_date)}</p>
                          </div>
                        </div>
                      )}

                      {project.project_size && (
                        <div className="flex items-center">
                          <Ruler className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                          <div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">Proje Büyüklüğü:</span>
                            <p className="font-medium dark:text-white">{project.project_size}</p>
                          </div>
                        </div>
                      )}

                      {project.client_name && (
                        <div className="flex items-center">
                          <User className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                          <div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">Müşteri:</span>
                            <p className="font-medium dark:text-white">{project.client_name}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contact Card */}
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6">
                    <h3 className="text-xl font-semibold mb-4 dark:text-white">Benzer Bir Proje Mi İstiyorsunuz?</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      Bu projeye benzer bir çalışma için detaylı bilgi almak ve ücretsiz teklif için bizimle iletişime
                      geçin.
                    </p>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-amber-500 mr-3" />
                        <span className="text-gray-700 dark:text-gray-300">0533 323 93 71</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-amber-500 mr-3" />
                        <span className="text-gray-700 dark:text-gray-300">info@coskunhafriyat.com</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Link href="/iletisim">
                        <Button className="bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-black dark:text-white w-full">Teklif Formu</Button>
                      </Link>
                      <Link href="tel:05333239371">
                        <Button
                          variant="outline"
                          className="w-full bg-transparent border-amber-500 text-amber-700 hover:bg-amber-500 hover:text-black dark:border-amber-400 dark:text-amber-400 dark:hover:bg-amber-400 dark:hover:text-black"
                        >
                          Hemen Ara
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          title="Benzer Bir Proje Mi Planlıyorsunuz?"
          description="Uzman ekibimizle projelerinizi güvenle hayata geçirin. Ücretsiz keşif ve detaylı teklif için hemen iletişime geçin."
          variant="primary"
        />
      </div>
    </>
  )
}
