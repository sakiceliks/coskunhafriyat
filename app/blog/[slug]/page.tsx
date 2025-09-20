import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, User, ArrowLeft, ArrowRight, Tag } from "lucide-react"
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getBlogPostBySlug, getBlogPosts } from "@/lib/database"
import { CTASection } from "@/components/cta-section"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Blog Yazısı Bulunamadı | Coşkun Hafriyat",
    }
  }

  return {
    title: `${post.title} | Coşkun Hafriyat Blog - Hafriyat ve İnşaat Uzman Görüşleri`,
    description: post.excerpt,
    keywords: post.tags?.join(", ") || "hafriyat, kazı, yıkım, inşaat, blog",
    authors: [{ name: post.author || "Coşkun Hafriyat" }],
    openGraph: {
      title: `${post.title} | Coşkun Hafriyat Blog`,
      description: post.excerpt,
      url: `https://coskunhafriyat.com/blog/${post.slug}`,
      siteName: "Coşkun Hafriyat",
      images: [
        {
          url: post.featured_image || "https://coskunhafriyat.com/blog-default-og.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "tr_TR",
      type: "article",
      publishedTime: post.published_date,
      modifiedTime: post.updated_at || post.published_date,
      authors: [post.author || "Coşkun Hafriyat"],
      tags: post.tags || [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Coşkun Hafriyat Blog`,
      description: post.excerpt,
      images: [post.featured_image || "https://coskunhafriyat.com/blog-default-og.jpg"],
      creator: "@hafriyatmaster",
    },
    alternates: {
      canonical: `https://coskunhafriyat.com/blog/${post.slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // Get related posts (same tags, excluding current post)
  const allPosts = await getBlogPosts()
  const relatedPosts = allPosts
    .filter((p: any) => p.id !== post.id && p.tags?.some((tag: string) => post.tags?.includes(tag)))
    .slice(0, 3)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const breadcrumbItems = [
    { name: "Ana Sayfa", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ]

  return (
    <>
      <ArticleJsonLd article={post} />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <div className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <section className="relative h-[400px] sm:h-[500px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <Image
            src={post.featured_image || "/placeholder.svg?height=500&width=1200"}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
            <div className="max-w-4xl">
              <Link href="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Blog'a Dön
              </Link>

              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags?.map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary" className="bg-white/20 text-white border-white/30">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{post.title}</h1>

              <div className="flex items-center text-white/90 text-sm sm:text-base">
                <User className="h-4 w-4 mr-2" />
                <span className="mr-6">{post.author}</span>
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formatDate(post.published_date)}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-12 md:py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Excerpt */}
              <div className="text-xl text-gray-700 dark:text-gray-300 mb-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-amber-500">
                {post.excerpt}
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                {post.content.split("\n").map((paragraph: string, index: number) => (
                  <p key={index} className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center flex-wrap gap-2">
                  <Tag className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                  <span className="text-gray-600 dark:text-gray-400 font-medium mr-3">Etiketler:</span>
                  {post.tags?.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-amber-600 border-amber-200 dark:text-amber-400 dark:border-amber-600">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center dark:text-white">İlgili Yazılar</h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {relatedPosts.map((relatedPost: any) => (
                    <RelatedPostCard key={relatedPost.id} post={relatedPost} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <CTASection
          title="Hafriyat İhtiyaçlarınız İçin Bizimle İletişime Geçin"
          description="Profesyonel hafriyat, kazı ve iş makinesi kiralama hizmetlerimiz hakkında detaylı bilgi alın."
          variant="primary"
        />

        {/* Additional CTA Section */}
        <section className="py-12 md:py-16 bg-gray-900 dark:bg-black text-white">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 dark:text-white">
              Uzman Görüşlerimizi Takip Edin
            </h2>
            <p className="text-gray-300 dark:text-gray-400 text-sm sm:text-base md:text-lg max-w-xl md:max-w-2xl mx-auto mb-6 md:mb-8">
              Hafriyat ve inşaat sektöründeki son gelişmeleri ve uzman tavsiyelerini blog sayfamızdan takip edin.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/blog">
                <Button
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-black dark:text-white font-semibold px-6 md:px-8 w-full sm:w-auto"
                >
                  Tüm Yazıları Gör
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/hizmetler">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black dark:border-gray-300 dark:text-gray-300 dark:hover:bg-gray-300/10 w-full sm:w-auto bg-transparent"
                >
                  Hizmetlerimizi İnceleyin
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

function RelatedPostCard({ post }: { post: any }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card className="overflow-hidden group h-full dark:bg-gray-800 dark:border-gray-700">
      <div className="relative h-48 w-full">
        <Image
          src={post.featured_image || "/placeholder.svg?height=300&width=400"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-lg line-clamp-2 dark:text-white">{post.title}</CardTitle>
        <CardDescription className="line-clamp-2 dark:text-gray-300">{post.excerpt}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-4">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{formatDate(post.published_date)}</span>
        </div>
        <Link href={`/blog/${post.slug}`}>
          <Button
            variant="outline"
            className="w-full border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white dark:border-amber-400 dark:text-amber-400 dark:hover:bg-amber-400 dark:hover:text-black bg-transparent"
          >
            Oku
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
