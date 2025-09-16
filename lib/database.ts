import { neon } from "@neondatabase/serverless"

let sql: ReturnType<typeof neon> | null = null

function getDatabase() {
  if (!sql) {
    const databaseUrl = process.env.DATABASE_URL
    console.log("[v0] DATABASE_URL exists:", !!databaseUrl)

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
  const sql = getDatabase()
  if (featured) {
    return await sql`SELECT * FROM services WHERE is_active = true AND is_featured = true ORDER BY created_at DESC`
  } else {
    return await sql`SELECT * FROM services WHERE is_active = true ORDER BY created_at DESC`
  }
}

export async function getServiceById(id: number) {
  const sql = getDatabase()
  const result = await sql`SELECT * FROM services WHERE id = ${id} AND is_active = true`
  return result[0] || null
}

export async function getServiceBySlug(slug: string) {
  const sql = getDatabase()
  const result = await sql`SELECT * FROM services WHERE slug = ${slug} AND is_active = true`
  return result[0] || null
}

// Projects
export async function getProjects(featured?: boolean) {
  const sql = getDatabase()
  if (featured) {
    return await sql`SELECT * FROM projects WHERE is_active = true AND is_featured = true ORDER BY completion_date DESC`
  } else {
    return await sql`SELECT * FROM projects WHERE is_active = true ORDER BY completion_date DESC`
  }
}

export async function getProjectById(id: number) {
  const sql = getDatabase()
  const result = await sql`SELECT * FROM projects WHERE id = ${id} AND is_active = true`
  return result[0] || null
}

// Blog Posts - Updated to match actual schema
export async function getBlogPosts(featured?: boolean) {
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
    author: post.author_id || "HafriyatMaster",
    updated_at: post.updated_at,
  }))
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
    author: post.author_id || "HafriyatMaster", // Default author if author_id is null
    updated_at: post.updated_at,
  }
}

export async function getBlogPostsByCategory(category: string) {
  const sql = getDatabase()
  return await sql`SELECT * FROM blog_posts WHERE category = ${category} AND is_published = true ORDER BY published_at DESC`
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

  const result = await sql`
    INSERT INTO projects (title, description, short_description, image_url, gallery_images, location, completion_date, project_type, client_name, project_size)
    VALUES (${title}, ${description}, ${short_description}, ${image_url}, ${gallery_images}, ${location}, ${completion_date}, ${project_type}, ${client_name}, ${project_size})
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

  const result = await sql`
    UPDATE projects 
    SET title = ${title}, description = ${description}, short_description = ${short_description}, image_url = ${image_url}, 
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
