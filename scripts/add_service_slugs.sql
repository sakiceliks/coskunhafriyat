-- Add slug column to services table and populate with slugs based on titles
ALTER TABLE services ADD COLUMN IF NOT EXISTS slug VARCHAR(255) UNIQUE;

-- Update existing services with slugs based on their titles
UPDATE services SET slug = 
  CASE 
    WHEN title ILIKE '%hafriyat%' THEN 'hafriyat'
    WHEN title ILIKE '%nakliye%' OR title ILIKE '%transport%' THEN 'transport'
    WHEN title ILIKE '%yıkım%' OR title ILIKE '%demolition%' THEN 'demolition'
    WHEN title ILIKE '%kazı%' OR title ILIKE '%excavation%' THEN 'excavation'
    WHEN title ILIKE '%dolgu%' OR title ILIKE '%fill%' THEN 'fill'
    WHEN title ILIKE '%temizlik%' OR title ILIKE '%cleaning%' THEN 'cleaning'
    ELSE LOWER(REPLACE(REPLACE(title, ' ', '-'), 'ı', 'i'))
  END
WHERE slug IS NULL;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
