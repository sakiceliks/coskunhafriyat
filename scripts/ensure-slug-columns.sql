-- Tüm tablolarda slug sütunlarını kontrol et ve ekle

-- Services tablosu için slug kontrolü
ALTER TABLE services ADD COLUMN IF NOT EXISTS slug VARCHAR(255);

-- Mevcut hizmetler için slug oluştur
UPDATE services 
SET slug = LOWER(
  REGEXP_REPLACE(
    REGEXP_REPLACE(title, '[^a-zA-Z0-9\s-]', '', 'g'),
    '\s+', '-', 'g'
  )
)
WHERE slug IS NULL;

-- Projects tablosu için slug kontrolü
ALTER TABLE projects ADD COLUMN IF NOT EXISTS slug VARCHAR(255);

-- Mevcut projeler için slug oluştur
UPDATE projects 
SET slug = LOWER(
  REGEXP_REPLACE(
    REGEXP_REPLACE(title, '[^a-zA-Z0-9\s-]', '', 'g'),
    '\s+', '-', 'g'
  )
)
WHERE slug IS NULL;

-- Blog posts tablosu için slug kontrolü (zaten var olabilir)
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS slug VARCHAR(255);

-- Mevcut blog yazıları için slug oluştur
UPDATE blog_posts 
SET slug = LOWER(
  REGEXP_REPLACE(
    REGEXP_REPLACE(title, '[^a-zA-Z0-9\s-]', '', 'g'),
    '\s+', '-', 'g'
  )
)
WHERE slug IS NULL;

-- Regions tablosu için slug kontrolü (zaten var olabilir)
ALTER TABLE regions ADD COLUMN IF NOT EXISTS slug VARCHAR(255);

-- Mevcut bölgeler için slug oluştur
UPDATE regions 
SET slug = LOWER(
  REGEXP_REPLACE(
    REGEXP_REPLACE(name, '[^a-zA-Z0-9\s-]', '', 'g'),
    '\s+', '-', 'g'
  )
)
WHERE slug IS NULL;

-- Unique index'ler oluştur
CREATE UNIQUE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE UNIQUE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE UNIQUE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE UNIQUE INDEX IF NOT EXISTS idx_regions_slug ON regions(slug);

-- Slug sütunlarını NOT NULL yap
ALTER TABLE services ALTER COLUMN slug SET NOT NULL;
ALTER TABLE projects ALTER COLUMN slug SET NOT NULL;
ALTER TABLE blog_posts ALTER COLUMN slug SET NOT NULL;
ALTER TABLE regions ALTER COLUMN slug SET NOT NULL;
