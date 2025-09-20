import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowRight } from "lucide-react"
import { OrganizationJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CTASection } from "@/components/cta-section"
import { getBlogPosts } from "@/lib/database"

export const metadata = {
  title: "Blog | Coşkun Hafriyat - Hafriyat ve İnşaat Sektörü Uzman Görüşleri",
  description:
    "Hafriyat, kazı, yıkım ve iş makinesi kiralama konularında uzman görüşleri, ipuçları ve sektör haberleri. ✓ Güncel içerik ✓ Uzman tavsiyeleri ✓ Sektör analizi",
  keywords: "hafriyat blog, kazı ipuçları, yıkım teknikleri, iş makinesi, inşaat sektörü, uzman görüşleri",
  openGraph: {
    title: "Blog | Coşkun Hafriyat",
    description: "Hafriyat, kazı, yıkım ve iş makinesi kiralama konularında uzman görüşleri ve sektör haberleri",
    url: "https://coskunhafriyat.com/blog",
    siteName: "Coşkun Hafriyat",
    images: [
      {
        url: "https://coskunhafriyat.com/blog-og.jpg",
        width: 1200,
        height: 630,
        alt: "Coşkun Hafriyat Blog",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Coşkun Hafriyat",
    description: "Hafriyat, kazı, yıkım ve iş makinesi kiralama konularında uzman görüşleri",
    images: ["https://coskunhafriyat.com/blog-og.jpg"],
  },
  alternates: {
    canonical: "https://coskunhafriyat.com/blog",
  },
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()

  const featuredPosts = blogPosts.filter((post: any) => post.is_featured).slice(0, 2)
  const regularPosts = blogPosts.filter((post: any) => !post.is_featured)

  const breadcrumbItems = [
    { name: "Ana Sayfa", url: "/" },
    { name: "Blog", url: "/blog" },
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
            src="/blog-hero-construction.jpg"
            alt="İnşaat ve hafriyat blog"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4">Blog</h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-xl sm:max-w-2xl">
              Hafriyat, kazı ve iş makinesi kiralama konularında uzman görüşleri ve sektör haberleri
            </p>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="py-12 md:py-16 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8 md:mb-12">
                <div className="inline-block px-4 py-2 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-full text-sm font-medium mb-3 md:mb-4">
                  Öne Çıkan Yazılar
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white">En Popüler İçerikler</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
                {featuredPosts.map((post: any) => (
                  <FeaturedBlogCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section 1 */}
        <CTASection
          title="Uzman Görüşlerimizi Takip Edin"
          description="Hafriyat ve inşaat sektöründeki en güncel gelişmeleri, uzman tavsiyelerini ve sektör analizlerini kaçırmayın."
          variant="secondary"
        />

        {/* All Posts */}
        <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white">Tüm Yazılar</h2>
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                Sektördeki en güncel gelişmeler ve uzman tavsiyeleri
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              {regularPosts.map((post: any) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {regularPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">Henüz blog yazısı bulunmamaktadır.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section 2 */}
        <CTASection
          title="Projeniz İçin Uzman Desteği Alın"
          description="Blog yazılarımızda paylaştığımız uzman görüşlerini projelerinizde uygulamak için bizimle iletişime geçin."
          variant="primary"
        />

        {/* Newsletter Section */}
        <section className="py-12 md:py-16 bg-gray-900 dark:bg-black text-white">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">Güncel Kalın</h2>
            <p className="text-gray-300 dark:text-gray-400 text-sm sm:text-base md:text-lg max-w-xl md:max-w-2xl mx-auto mb-6 md:mb-8">
              Hafriyat ve inşaat sektöründeki en son gelişmeleri kaçırmayın. Blog yazılarımızı takip edin.
            </p>
            <Link href="/iletisim">
              <Button size="lg" className="bg-amber-500 dark:bg-amber-600 hover:bg-amber-600 dark:hover:bg-amber-700 text-black dark:text-white font-semibold px-6 md:px-8">
                İletişime Geçin
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}

function FeaturedBlogCard({ post }: { post: any }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card className="overflow-hidden group h-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <div className="relative h-64 sm:h-72 md:h-80 w-full">
        <Image
          src={post.featured_image || "/placeholder.svg?height=400&width=600"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags?.slice(0, 2).map((tag: string, index: number) => (
              <Badge key={index} variant="secondary" className="bg-white/20 text-white border-white/30">
                {tag}
              </Badge>
            ))}
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{post.title}</h3>
          <div className="flex items-center text-white/80 text-sm">
            <User className="h-4 w-4 mr-2" />
            <span className="mr-4">{post.author}</span>
            <Calendar className="h-4 w-4 mr-2" />
            <span>{formatDate(post.published_date)}</span>
          </div>
        </div>
      </div>
      <CardHeader>
        <CardDescription className="text-base text-gray-700 dark:text-gray-300">{post.excerpt}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Link href={`/blog/${post.slug}`}>
          <Button className="w-full bg-amber-500 dark:bg-amber-600 hover:bg-amber-600 dark:hover:bg-amber-700 text-white">
            Devamını Oku
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

function BlogCard({ post }: { post: any }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card className="overflow-hidden group h-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <div className="relative h-48 sm:h-56 w-full">
        <Image
          src={post.featured_image || "/placeholder.svg?height=300&width=400"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <CardHeader>
        <div className="flex flex-wrap gap-1 mb-2">
          {post.tags?.slice(0, 2).map((tag: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
              {tag}
            </Badge>
          ))}
        </div>
        <CardTitle className="text-lg md:text-xl line-clamp-2 text-gray-900 dark:text-white">{post.title}</CardTitle>
        <CardDescription className="line-clamp-3 text-gray-700 dark:text-gray-300">{post.excerpt}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-4">
          <User className="h-4 w-4 mr-2" />
          <span className="mr-4">{post.author}</span>
          <Calendar className="h-4 w-4 mr-2" />
          <span>{formatDate(post.published_date)}</span>
        </div>
        <Link href={`/blog/${post.slug}`}>
          <Button
            variant="outline"
            className="w-full border-amber-500 dark:border-amber-400 text-amber-500 dark:text-amber-400 hover:bg-amber-500 dark:hover:bg-amber-500 hover:text-white dark:hover:text-white bg-transparent dark:bg-transparent"
          >
            Devamını Oku
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
