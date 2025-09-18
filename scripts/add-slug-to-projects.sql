-- Projeler tablosuna slug sütunu ekle
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

-- Slug için unique index oluştur
CREATE UNIQUE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);

-- Slug için not null constraint ekle
ALTER TABLE projects ALTER COLUMN slug SET NOT NULL;
