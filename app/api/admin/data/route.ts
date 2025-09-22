import { NextResponse } from 'next/server'
import {
  getServices,
  getProjects,
  getAllBlogPosts,
  getPageContent,
  getTeamMembers,
  getCompanyStats,
  getFaqs,
  getRegions,
  getHeroCarousel,
} from '@/lib/database'

export async function GET() {
  try {
    const [services, projects, blogPosts, teamMembers, companyStats, faqs, regions, heroCarousel] = await Promise.all([
      getServices(),
      getProjects(),
      getAllBlogPosts(), // Admin için tüm blog post'ları (draft dahil)
      getTeamMembers(),
      getCompanyStats(),
      getFaqs(),
      getRegions().catch(() => []), // Regions tablosu yoksa boş array döndür
      getHeroCarousel().catch(() => []), // Hero carousel tablosu yoksa boş array döndür
    ])

    const allPageContent = await Promise.all([
      getPageContent("homepage"),
      getPageContent("about"),
      getPageContent("contact"),
    ]).then((results) => results.flat())

    return NextResponse.json({
      services,
      projects,
      blogPosts,
      pageContent: allPageContent,
      teamMembers,
      companyStats,
      faqs,
      regions,
      heroCarousel,
    })
  } catch (error) {
    console.error('Admin data API error:', error)
    return NextResponse.json(
      { error: 'Veritabanı bağlantı hatası' },
      { status: 500 }
    )
  }
}
