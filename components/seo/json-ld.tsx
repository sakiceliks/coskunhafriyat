interface JsonLdProps {
  data: Record<string, any>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 2),
      }}
    />
  )
}

// Organization Schema
export function OrganizationJsonLd() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Coşkun Hafriyat",
    description: "İstanbul'da profesyonel hafriyat, kazı, yıkım ve nakliye hizmetleri",
    url: "https://coskunhafriyat.com",
    telephone: "+90-536-216-09-92",
    email: "info@coskunhafriyat.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Örnek Mahallesi, Örnek Sokak No:1",
      addressLocality: "İstanbul",
      addressRegion: "İstanbul",
      postalCode: "34000",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "41.0082",
      longitude: "28.9784",
    },
    openingHours: "Mo-Fr 08:00-18:00, Sa 08:00-16:00",
    priceRange: "$$",
    servesCuisine: [],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "41.0082",
        longitude: "28.9784",
      },
      geoRadius: "50000",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Hafriyat Hizmetleri",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Hafriyat İşleri",
            description: "Profesyonel hafriyat ve kazı hizmetleri",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Yıkım İşleri",
            description: "Güvenli ve çevreci yıkım hizmetleri",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Nakliye Hizmetleri",
            description: "Hafriyat malzemesi nakliye ve taşıma",
          },
        },
      ],
    },
    sameAs: [
      "https://www.facebook.com/hafriyatmaster",
      "https://www.instagram.com/hafriyatmaster",
      "https://www.linkedin.com/company/hafriyatmaster",
    ],
  }

  return <JsonLd data={organizationData} />
}

// Service Schema
export function ServiceJsonLd({ service }: { service: any }) {
  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description || service.short_description,
    provider: {
      "@type": "LocalBusiness",
      name: "Coşkun Hafriyat",
      url: "https://coskunhafriyat.com",
    },
    serviceType: service.title,
    areaServed: {
      "@type": "City",
      name: "İstanbul",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.title,
      itemListElement:
        service.features?.map((feature: string, index: number) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: feature,
          },
        })) || [],
    },
    ...(service.price_range && {
      offers: {
        "@type": "Offer",
        priceRange: service.price_range,
        priceCurrency: "TRY",
      },
    }),
    ...(service.image_url && {
      image: service.image_url,
    }),
  }

  return <JsonLd data={serviceData} />
}

// Article Schema
export function ArticleJsonLd({ article }: { article: any }) {
  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.featured_image || "https://coskunhafriyat.com/og-default.jpg",
    author: {
      "@type": "Person",
      name: article.author || "Coşkun Hafriyat",
    },
    publisher: {
      "@type": "Organization",
      name: "Coşkun Hafriyat",
      logo: {
        "@type": "ImageObject",
        url: "https://coskunhafriyat.com/logo.png",
      },
    },
    datePublished: article.published_date,
    dateModified: article.updated_at || article.published_date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://coskunhafriyat.com/blog/${article.slug}`,
    },
    ...(article.tags && {
      keywords: article.tags.join(", "),
    }),
  }

  return <JsonLd data={articleData} />
}

// Project Schema
export function ProjectJsonLd({ project }: { project: any }) {
  const projectData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description || project.short_description,
    creator: {
      "@type": "Organization",
      name: "Coşkun Hafriyat",
    },
    dateCreated: project.start_date,
    datePublished: project.completion_date,
    ...(project.image_url && {
      image: project.image_url,
    }),
    ...(project.location && {
      locationCreated: {
        "@type": "Place",
        name: project.location,
      },
    }),
    ...(project.client_name && {
      sponsor: {
        "@type": "Organization",
        name: project.client_name,
      },
    }),
    genre: project.project_type,
    inLanguage: "tr-TR",
  }

  return <JsonLd data={projectData} />
}

// Breadcrumb Schema
export function BreadcrumbJsonLd({ items }: { items: Array<{ name: string; url: string }> }) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://coskunhafriyat.com${item.url}`,
    })),
  }

  return <JsonLd data={breadcrumbData} />
}
