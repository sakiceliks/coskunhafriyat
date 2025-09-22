import { neon } from "@neondatabase/serverless"

let sql: ReturnType<typeof neon> | null = null
let isDatabaseAvailable = false

// Check if database is available at module load time
function checkDatabaseAvailability() {
  const databaseUrl = process.env.DATABASE_URL
  isDatabaseAvailable = !!databaseUrl
  console.log("[v0] DATABASE_URL exists:", isDatabaseAvailable)
  return isDatabaseAvailable
}

// Initialize database availability check
checkDatabaseAvailability()

function getDatabase() {
  if (!isDatabaseAvailable) {
    // Return mock database that always returns empty arrays
    return {
      async template(strings: TemplateStringsArray, ...values: any[]) {
        console.log("[v0] Mock database query executed (no DATABASE_URL)")
        return []
      }
    } as any
  }

  if (!sql) {
    const databaseUrl = process.env.DATABASE_URL
    if (!databaseUrl) {
      throw new Error("DATABASE_URL is not set")
    }
    sql = neon(databaseUrl)
    console.log("[v0] Database connection initialized")
  }
  return sql
}

// Services
export async function getServices(featured?: boolean) {
  // Early return if no database URL
  if (!process.env.DATABASE_URL) {
    console.log("[v0] No DATABASE_URL, returning empty services array")
    return []
  }

  try {
    const sql = getDatabase()
    if (featured) {
      return await sql`SELECT * FROM services WHERE is_active = true AND is_featured = true ORDER BY id ASC`
    } else {
      return await sql`SELECT * FROM services WHERE is_active = true ORDER BY id ASC`
    }
  } catch (error) {
    console.error("Error fetching services:", error)
    return []
  }
}

export async function getServiceById(id: number) {
  try {
    const sql = getDatabase()
    const result = await sql`SELECT * FROM services WHERE id = ${id} AND is_active = true`
    return result[0] || null
  } catch (error) {
    console.error("Error fetching service by id:", error)
    return null
  }
}

export async function getServiceBySlug(slug: string) {
  try {
    const sql = getDatabase()
    const result = await sql`SELECT * FROM services WHERE slug = ${slug} AND is_active = true`
    return result[0] || null
  } catch (error) {
    console.error("Error fetching service by slug:", error)
    return null
  }
}

export async function getServicesByRegion(regionName: string) {
  // Early return if no database URL
  if (!process.env.DATABASE_URL) {
    console.log("[v0] No DATABASE_URL, returning empty services array for region")
    return []
  }

  try {
    const sql = getDatabase()
    // Get all active services and filter by region name in title or description
    const result = await sql`SELECT * FROM services WHERE is_active = true ORDER BY id ASC`
    
    // Filter services that might be relevant to the region
    // This is a simple implementation - in a real app you might have a proper region-service relationship table
    const regionServices = result.filter((service: any) => {
      const title = service.title?.toLowerCase() || ''
      const description = service.description?.toLowerCase() || ''
      const shortDescription = service.short_description?.toLowerCase() || ''
      const regionNameLower = regionName.toLowerCase()
      
      return title.includes(regionNameLower) || 
             description.includes(regionNameLower) || 
             shortDescription.includes(regionNameLower) ||
             title.includes('hafriyat') ||
             title.includes('kazı') ||
             title.includes('yıkım')
    })
    
    return regionServices.slice(0, 6) // Limit to 6 services
  } catch (error) {
    console.error("Error fetching services by region:", error)
    return []
  }
}

// Hero Carousel
export async function getHeroCarousel() {
  // Early return if no database URL
  if (!process.env.DATABASE_URL) {
    console.log("[v0] No DATABASE_URL, returning empty hero carousel array")
    return []
  }

  try {
    const sql = getDatabase()
    return await sql`SELECT * FROM hero_carousel WHERE is_active = true ORDER BY display_order ASC, created_at ASC`
  } catch (error) {
    console.error("Error fetching hero carousel:", error)
    return []
  }
}

export async function getHeroSlideById(id: number) {
  // Early return if no database URL
  if (!process.env.DATABASE_URL) {
    console.log("[v0] No DATABASE_URL, returning null for hero slide by id")
    return null
  }

  try {
    const sql = getDatabase()
    const result = await sql`SELECT * FROM hero_carousel WHERE id = ${id} LIMIT 1`
    return result[0] || null
  } catch (error) {
    console.error("Error fetching hero slide by id:", error)
    return null
  }
}

export async function createHeroSlide(data: {
  title: string
  subtitle?: string
  description?: string
  image_url: string
  button_text?: string
  button_link?: string
  button_text_2?: string
  button_link_2?: string
  display_order?: number
}) {
  // Early return if no database URL
  if (!process.env.DATABASE_URL) {
    console.log("[v0] No DATABASE_URL, cannot create hero slide")
    return null
  }

  try {
    const sql = getDatabase()
    console.log("Attempting to create hero slide with data:", data)
    
    const result = await sql`
      INSERT INTO hero_carousel (title, subtitle, description, image_url, button_text, button_link, button_text_2, button_link_2, display_order)
      VALUES (${data.title}, ${data.subtitle || null}, ${data.description || null}, ${data.image_url}, ${data.button_text || null}, ${data.button_link || null}, ${data.button_text_2 || null}, ${data.button_link_2 || null}, ${data.display_order || 0})
      RETURNING *
    `
    
    console.log("Database insert result:", result)
    return result[0] || null
  } catch (error) {
    console.error("Error creating hero slide:", error)
    console.error("Error details:", error instanceof Error ? error.message : "Unknown error")
    return null
  }
}

export async function updateHeroSlide(id: number, data: {
  title?: string
  subtitle?: string
  description?: string
  image_url?: string
  button_text?: string
  button_link?: string
  button_text_2?: string
  button_link_2?: string
  display_order?: number
  is_active?: boolean
}) {
  // Early return if no database URL
  if (!process.env.DATABASE_URL) {
    console.log("[v0] No DATABASE_URL, cannot update hero slide")
    return null
  }

  try {
    const sql = getDatabase()
    const result = await sql`
      UPDATE hero_carousel 
      SET title = COALESCE(${data.title}, title),
          subtitle = COALESCE(${data.subtitle}, subtitle),
          description = COALESCE(${data.description}, description),
          image_url = COALESCE(${data.image_url}, image_url),
          button_text = COALESCE(${data.button_text}, button_text),
          button_link = COALESCE(${data.button_link}, button_link),
          button_text_2 = COALESCE(${data.button_text_2}, button_text_2),
          button_link_2 = COALESCE(${data.button_link_2}, button_link_2),
          display_order = COALESCE(${data.display_order}, display_order),
          is_active = COALESCE(${data.is_active}, is_active),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `
    return result[0] || null
  } catch (error) {
    console.error("Error updating hero slide:", error)
    return null
  }
}

export async function deleteHeroSlide(id: number) {
  // Early return if no database URL
  if (!process.env.DATABASE_URL) {
    console.log("[v0] No DATABASE_URL, cannot delete hero slide")
    return false
  }

  try {
    const sql = getDatabase()
    await sql`DELETE FROM hero_carousel WHERE id = ${id}`
    return true
  } catch (error) {
    console.error("Error deleting hero slide:", error)
    return false
  }
}

// Projects
export async function getProjects(featured?: boolean) {
  // Early return if no database URL
  if (!process.env.DATABASE_URL) {
    console.log("[v0] No DATABASE_URL, returning empty projects array")
    return []
  }

  try {
    const sql = getDatabase()
    if (featured) {
      return await sql`SELECT * FROM projects WHERE is_active = true AND is_featured = true ORDER BY completion_date DESC`
    } else {
      return await sql`SELECT * FROM projects WHERE is_active = true ORDER BY completion_date DESC`
    }
  } catch (error) {
    console.error("Error fetching projects:", error)
    return []
  }
}

export async function getProjectById(id: number) {
  const sql = getDatabase()
  const result = await sql`SELECT * FROM projects WHERE id = ${id} AND is_active = true`
  return result[0] || null
}

export async function getProjectBySlug(slug: string) {
  const sql = getDatabase()
  const result = await sql`SELECT * FROM projects WHERE slug = ${slug} AND is_active = true`
  return result[0] || null
}

// Blog Posts - Updated to match actual schema
export async function getBlogPosts(featured?: boolean) {
  // Early return if no database URL
  if (!process.env.DATABASE_URL) {
    console.log("[v0] No DATABASE_URL, returning empty blog posts array")
    return []
  }

  try {
    const sql = getDatabase()
    let result

    if (featured) {
      result =
        await sql`SELECT * FROM blog_posts WHERE is_published = true AND is_featured = true ORDER BY published_at DESC`
    } else {
      result = await sql`SELECT * FROM blog_posts WHERE is_published = true ORDER BY published_at DESC`
    }

    // Map database columns to expected property names for all posts
    return result.map((post: any) => ({
      ...post,
      published_date: post.published_at,
      author: post.author_id || "Coşkun Hafriyat",
      updated_at: post.updated_at,
    }))
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string) {
  const sql = getDatabase()
  const result = await sql`SELECT * FROM blog_posts WHERE slug = ${slug} AND is_published = true`

  if (!result[0]) {
    return null
  }

  const post = result[0]

  // Map database columns to expected property names
  return {
    ...post,
    published_date: post.published_at,
    author: post.author_id || "Coşkun Hafriyat", // Default author if author_id is null
    updated_at: post.updated_at,
  }
}

export async function getBlogPostsByCategory(category: string) {
  const sql = getDatabase()
  return await sql`SELECT * FROM blog_posts WHERE category = ${category} AND is_published = true ORDER BY published_at DESC`
}

// Admin function - get all blog posts (including drafts)
export async function getAllBlogPosts() {
  // Early return if no database URL
  if (!process.env.DATABASE_URL) {
    console.log("[v0] No DATABASE_URL, returning empty blog posts array")
    return []
  }

  try {
    const sql = getDatabase()
    const result = await sql`SELECT * FROM blog_posts ORDER BY created_at DESC`

    // Map database columns to expected property names for all posts
    return result.map((post: any) => ({
      ...post,
      published_date: post.published_at,
      author: post.author_id || "Coşkun Hafriyat",
      updated_at: post.updated_at,
      status: post.is_published ? "published" : "draft",
    }))
  } catch (error) {
    console.error("Error fetching all blog posts:", error)
    return []
  }
}

// Admin functions
export async function createService(data: any) {
  const sql = getDatabase()
  const { title, description, short_description, icon, image_url, price_range, features } = data

  // Generate slug from title
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()

  const result = await sql`
    INSERT INTO services (title, slug, description, short_description, icon, image_url, price_range, features)
    VALUES (${title}, ${slug}, ${description}, ${short_description}, ${icon}, ${image_url}, ${price_range}, ${features})
    RETURNING *
  `

  return result[0]
}

export async function updateService(id: number, data: any) {
  const sql = getDatabase()
  const { title, description, short_description, icon, image_url, price_range, features } = data

  // Generate slug from title
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()

  const result = await sql`
    UPDATE services 
    SET title = ${title}, slug = ${slug}, description = ${description}, short_description = ${short_description}, icon = ${icon}, 
        image_url = ${image_url}, price_range = ${price_range}, features = ${features}, updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `

  return result[0]
}

export async function deleteService(id: number) {
  const sql = getDatabase()
  await sql`UPDATE services SET is_active = false WHERE id = ${id}`
}

export async function createProject(data: any) {
  const sql = getDatabase()
  const {
    title,
    description,
    short_description,
    image_url,
    gallery_images,
    location,
    completion_date,
    project_type,
    client_name,
    project_size,
  } = data

  // Generate slug from title
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()

  const result = await sql`
    INSERT INTO projects (title, slug, description, short_description, image_url, gallery_images, location, completion_date, project_type, client_name, project_size)
    VALUES (${title}, ${slug}, ${description}, ${short_description}, ${image_url}, ${gallery_images}, ${location}, ${completion_date}, ${project_type}, ${client_name}, ${project_size})
    RETURNING *
  `

  return result[0]
}

export async function updateProject(id: number, data: any) {
  const sql = getDatabase()
  const {
    title,
    description,
    short_description,
    image_url,
    gallery_images,
    location,
    completion_date,
    project_type,
    client_name,
    project_size,
  } = data

  // Generate slug from title
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()

  const result = await sql`
    UPDATE projects 
    SET title = ${title}, slug = ${slug}, description = ${description}, short_description = ${short_description}, image_url = ${image_url}, 
        gallery_images = ${gallery_images}, location = ${location}, completion_date = ${completion_date}, project_type = ${project_type},
        client_name = ${client_name}, project_size = ${project_size}, updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `

  return result[0]
}

export async function deleteProject(id: number) {
  const sql = getDatabase()
  await sql`UPDATE projects SET is_active = false WHERE id = ${id}`
}

export async function createBlogPost(data: any) {
  const sql = getDatabase()
  const { title, slug, content, excerpt, featured_image, author_id, tags, category, is_published } = data

  const result = await sql`
    INSERT INTO blog_posts (title, slug, content, excerpt, featured_image, author_id, tags, category, is_published, published_at)
    VALUES (${title}, ${slug}, ${content}, ${excerpt}, ${featured_image}, ${author_id}, ${tags}, ${category}, ${is_published}, ${is_published ? new Date().toISOString() : null})
    RETURNING *
  `

  return result[0]
}

export async function updateBlogPost(id: number, data: any) {
  const sql = getDatabase()
  const { title, slug, content, excerpt, featured_image, author_id, tags, category, is_published } = data

  const result = await sql`
    UPDATE blog_posts 
    SET title = ${title}, slug = ${slug}, content = ${content}, excerpt = ${excerpt}, featured_image = ${featured_image},
        author_id = ${author_id}, tags = ${tags}, category = ${category}, is_published = ${is_published}, 
        published_at = ${is_published ? new Date().toISOString() : null}, updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `

  return result[0]
}

export async function deleteBlogPost(id: number) {
  const sql = getDatabase()
  await sql`DELETE FROM blog_posts WHERE id = ${id}`
}

// Page Content Management
export async function getPageContent(pageName: string, sectionName?: string) {
  const sql = getDatabase()
  if (sectionName) {
    return await sql`SELECT * FROM page_content WHERE page_name = ${pageName} AND section_name = ${sectionName} ORDER BY content_key`
  } else {
    return await sql`SELECT * FROM page_content WHERE page_name = ${pageName} ORDER BY section_name, content_key`
  }
}

export async function updatePageContent(
  pageName: string,
  sectionName: string,
  contentKey: string,
  contentValue: string,
) {
  const sql = getDatabase()
  const result = await sql`
    INSERT INTO page_content (page_name, section_name, content_type, content_key, content_value, updated_at)
    VALUES (${pageName}, ${sectionName}, 'text', ${contentKey}, ${contentValue}, NOW())
    ON CONFLICT (page_name, section_name, content_key)
    DO UPDATE SET content_value = ${contentValue}, updated_at = NOW()
    RETURNING *
  `
  return result[0]
}

// Team Members Management
export async function getTeamMembers() {
  const sql = getDatabase()
  return await sql`SELECT * FROM team_members WHERE is_active = true ORDER BY display_order, created_at`
}

export async function createTeamMember(data: any) {
  const sql = getDatabase()
  const { name, position, bio, image_url, linkedin_url, twitter_url, facebook_url, display_order } = data

  const result = await sql`
    INSERT INTO team_members (name, position, bio, image_url, linkedin_url, twitter_url, facebook_url, display_order)
    VALUES (${name}, ${position}, ${bio}, ${image_url}, ${linkedin_url}, ${twitter_url}, ${facebook_url}, ${display_order})
    RETURNING *
  `
  return result[0]
}

export async function updateTeamMember(id: number, data: any) {
  const sql = getDatabase()
  const { name, position, bio, image_url, linkedin_url, twitter_url, facebook_url, display_order } = data

  const result = await sql`
    UPDATE team_members 
    SET name = ${name}, position = ${position}, bio = ${bio}, image_url = ${image_url},
        linkedin_url = ${linkedin_url}, twitter_url = ${twitter_url}, facebook_url = ${facebook_url},
        display_order = ${display_order}, updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `
  return result[0]
}

export async function deleteTeamMember(id: number) {
  const sql = getDatabase()
  await sql`UPDATE team_members SET is_active = false WHERE id = ${id}`
}

// Company Stats Management
export async function getCompanyStats() {
  const sql = getDatabase()
  return await sql`SELECT * FROM company_stats WHERE is_active = true ORDER BY display_order`
}

export async function updateCompanyStat(statKey: string, statValue: string, statLabel: string) {
  const sql = getDatabase()
  const result = await sql`
    INSERT INTO company_stats (stat_key, stat_value, stat_label, updated_at)
    VALUES (${statKey}, ${statValue}, ${statLabel}, NOW())
    ON CONFLICT (stat_key)
    DO UPDATE SET stat_value = ${statValue}, stat_label = ${statLabel}, updated_at = NOW()
    RETURNING *
  `
  return result[0]
}

// FAQs Management
export async function getFaqs() {
  const sql = getDatabase()
  return await sql`SELECT * FROM faqs WHERE is_active = true ORDER BY display_order`
}

export async function createFaq(data: any) {
  const sql = getDatabase()
  const { question, answer, display_order } = data

  const result = await sql`
    INSERT INTO faqs (question, answer, display_order)
    VALUES (${question}, ${answer}, ${display_order})
    RETURNING *
  `
  return result[0]
}

export async function updateFaq(id: number, data: any) {
  const sql = getDatabase()
  const { question, answer, display_order } = data

  const result = await sql`
    UPDATE faqs 
    SET question = ${question}, answer = ${answer}, display_order = ${display_order}, updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `
  return result[0]
}

export async function deleteFaq(id: number) {
  const sql = getDatabase()
  await sql`UPDATE faqs SET is_active = false WHERE id = ${id}`
}

// Regions Management
export async function getRegions(featured?: boolean) {
  // Early return if no database URL
  if (!process.env.DATABASE_URL) {
    console.log("[v0] No DATABASE_URL, returning empty regions array")
    return []
  }

  try {
    const sql = getDatabase()
    if (featured) {
      return await sql`SELECT * FROM regions WHERE is_active = true AND is_featured = true ORDER BY display_order, created_at DESC`
    } else {
      return await sql`SELECT * FROM regions WHERE is_active = true ORDER BY display_order, created_at DESC`
    }
  } catch (error) {
    console.error("Error fetching regions:", error)
    // Eğer regions tablosu yoksa boş array döndür
    if (error instanceof Error && error.message.includes('relation "regions" does not exist')) {
      return []
    }
    return []
  }
}

export async function getRegionById(id: number) {
  try {
    const sql = getDatabase()
    const result = await sql`SELECT * FROM regions WHERE id = ${id} AND is_active = true`
    return result[0] || null
  } catch (error) {
    console.error("Error fetching region by id:", error)
    if (error instanceof Error && error.message.includes('relation "regions" does not exist')) {
      return null
    }
    throw error
  }
}

export async function getRegionBySlug(slug: string) {
  try {
    const sql = getDatabase()
    const result = await sql`SELECT * FROM regions WHERE slug = ${slug} AND is_active = true`
    return result[0] || null
  } catch (error) {
    console.error("Error fetching region by slug:", error)
    if (error instanceof Error && error.message.includes('relation "regions" does not exist')) {
      return null
    }
    throw error
  }
}

export async function createRegion(data: any) {
  const sql = getDatabase()
  const { 
    name, 
    description, 
    short_description, 
    image_url, 
    gallery_images, 
    location, 
    services_offered, 
    contact_phone, 
    contact_email, 
    is_featured, 
    display_order 
  } = data

  // Generate slug from name
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()

  const result = await sql`
    INSERT INTO regions (name, slug, description, short_description, image_url, gallery_images, location, services_offered, contact_phone, contact_email, is_featured, display_order)
    VALUES (${name}, ${slug}, ${description}, ${short_description}, ${image_url}, ${gallery_images}, ${location}, ${services_offered}, ${contact_phone}, ${contact_email}, ${is_featured}, ${display_order})
    RETURNING *
  `

  return result[0]
}

export async function updateRegion(id: number, data: any) {
  const sql = getDatabase()
  const { 
    name, 
    description, 
    short_description, 
    image_url, 
    gallery_images, 
    location, 
    services_offered, 
    contact_phone, 
    contact_email, 
    is_featured, 
    display_order 
  } = data

  // Generate slug from name
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()

  const result = await sql`
    UPDATE regions 
    SET name = ${name}, slug = ${slug}, description = ${description}, short_description = ${short_description}, 
        image_url = ${image_url}, gallery_images = ${gallery_images}, location = ${location}, 
        services_offered = ${services_offered}, contact_phone = ${contact_phone}, contact_email = ${contact_email},
        is_featured = ${is_featured}, display_order = ${display_order}, updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `

  return result[0]
}

export async function deleteRegion(id: number) {
  const sql = getDatabase()
  await sql`UPDATE regions SET is_active = false WHERE id = ${id}`
}
