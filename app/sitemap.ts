import type { MetadataRoute } from "next"
import { getServices, getProjects, getBlogPosts, getRegions } from "@/lib/database"
import { createSlug } from "@/lib/slug-utils"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://coskunhafriyat.com"

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/hizmetler`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projeler`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bolgelerimiz`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/hizmetler/residential`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ]

  try {
    // Dynamic service pages
    const services = await getServices()
    const servicePages = services.map((service: any) => ({
      url: `${baseUrl}/hizmetler/${service.slug}`,
      lastModified: new Date(service.updated_at || service.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))

    // Dynamic project pages
    const projects = await getProjects()
    const projectPages = projects.map((project: any) => ({
      url: `${baseUrl}/projeler/${project.id}`,
      lastModified: new Date(project.updated_at || project.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))

    // Dynamic region pages
    const regions = await getRegions()
    const regionPages = regions.map((region: any) => ({
      url: `${baseUrl}/bolgelerimiz/${region.slug}`,
      lastModified: new Date(region.updated_at || region.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))

    // Dynamic region-service pages (hizmetler/bolge/[region]/[service])
    const regionServicePages: any[] = []
    regions.forEach((region: any) => {
      if (region.services_offered && Array.isArray(region.services_offered)) {
        region.services_offered.forEach((serviceName: string) => {
          const serviceSlug = createSlug(serviceName)
          
          regionServicePages.push({
            url: `${baseUrl}/hizmetler/bolge/${region.slug}/${serviceSlug}`,
            lastModified: new Date(region.updated_at || region.created_at),
            changeFrequency: "monthly" as const,
            priority: 0.7,
          })
        })
      }
    })

    // Dynamic blog pages
    const blogPosts = await getBlogPosts()
    const blogPages = blogPosts
      .filter((post: any) => post.is_published)
      .map((post: any) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at || post.published_date),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }))

    return [...staticPages, ...servicePages, ...projectPages, ...regionPages, ...regionServicePages, ...blogPages]
  } catch (error) {
    console.error("Error generating sitemap:", error)
    // Return static pages only if database fails
    return staticPages
  }
}
