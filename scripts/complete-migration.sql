-- Coşkun Hafriyat - Tam Migration Script
-- Bu script tüm gerekli tabloları oluşturur ve veri ekler

-- 1. Regions tablosu oluştur
CREATE TABLE IF NOT EXISTS regions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  image_url VARCHAR(500),
  gallery_images TEXT[], -- JSON array of image URLs
  location VARCHAR(255),
  services_offered TEXT[], -- JSON array of services offered in this region
  contact_phone VARCHAR(20),
  contact_email VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Slug sütunlarını tüm tablolara ekle
ALTER TABLE services ADD COLUMN IF NOT EXISTS slug VARCHAR(255);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS slug VARCHAR(255);
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS slug VARCHAR(255);

-- 3. Mevcut veriler için slug oluştur
UPDATE services 
SET slug = LOWER(
  REGEXP_REPLACE(
    REGEXP_REPLACE(title, '[^a-zA-Z0-9\s-]', '', 'g'),
    '\s+', '-', 'g'
  )
)
WHERE slug IS NULL OR slug = '';

UPDATE projects 
SET slug = LOWER(
  REGEXP_REPLACE(
    REGEXP_REPLACE(title, '[^a-zA-Z0-9\s-]', '', 'g'),
    '\s+', '-', 'g'
  )
)
WHERE slug IS NULL OR slug = '';

UPDATE blog_posts 
SET slug = LOWER(
  REGEXP_REPLACE(
    REGEXP_REPLACE(title, '[^a-zA-Z0-9\s-]', '', 'g'),
    '\s+', '-', 'g'
  )
)
WHERE slug IS NULL OR slug = '';

-- 4. Regions için slug oluştur
UPDATE regions 
SET slug = LOWER(
  REGEXP_REPLACE(
    REGEXP_REPLACE(name, '[^a-zA-Z0-9\s-]', '', 'g'),
    '\s+', '-', 'g'
  )
)
WHERE slug IS NULL OR slug = '';

-- 5. Unique index'ler oluştur
CREATE UNIQUE INDEX IF NOT EXISTS idx_regions_slug ON regions(slug);
CREATE UNIQUE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE UNIQUE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE UNIQUE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);

-- 6. Slug sütunlarını NOT NULL yap
ALTER TABLE services ALTER COLUMN slug SET NOT NULL;
ALTER TABLE projects ALTER COLUMN slug SET NOT NULL;
ALTER TABLE blog_posts ALTER COLUMN slug SET NOT NULL;
ALTER TABLE regions ALTER COLUMN slug SET NOT NULL;

-- 7. Regions tablosuna örnek veri ekle
INSERT INTO regions (name, slug, description, short_description, image_url, location, services_offered, contact_phone, contact_email, is_featured, display_order) VALUES
('Kadıköy', 'kadikoy', 'Kadıköy bölgesinde profesyonel hafriyat, kazı ve yıkım hizmetleri sunuyoruz. Modern ekipmanlarımız ve deneyimli ekibimizle bölgenin en güvenilir hafriyat firmasıyız.', 'Kadıköy bölgesinde hafriyat ve kazı hizmetleri', '/images/regions/kadikoy.jpg', 'Kadıköy, İstanbul', ARRAY['Hafriyat', 'Kazı', 'Yıkım', 'Nakliye'], '+90 531 281 29 58', 'kadikoy@coskunhafriyat.com.tr', true, 1),
('Beşiktaş', 'besiktas', 'Beşiktaş bölgesinde kapsamlı hafriyat çözümleri sunuyoruz. Ticari ve konut projeleri için özel hizmetlerimizle yanınızdayız.', 'Beşiktaş bölgesinde kapsamlı hafriyat hizmetleri', '/images/regions/besiktas.jpg', 'Beşiktaş, İstanbul', ARRAY['Hafriyat', 'Kazı', 'Yıkım', 'Nakliye', 'Temizlik'], '+90 531 281 29 58', 'besiktas@coskunhafriyat.com.tr', true, 2),
('Şişli', 'sisli', 'Şişli bölgesinde modern hafriyat teknolojileri kullanarak hızlı ve güvenli hizmet sunuyoruz. Ticari merkezler için özel çözümlerimiz mevcuttur.', 'Şişli bölgesinde modern hafriyat teknolojileri', '/images/regions/sisli.jpg', 'Şişli, İstanbul', ARRAY['Hafriyat', 'Kazı', 'Yıkım', 'Nakliye'], '+90 531 281 29 58', 'sisli@coskunhafriyat.com.tr', true, 3),
('Beyoğlu', 'beyoglu', 'Beyoğlu bölgesinde tarihi dokuyu koruyarak modern hafriyat hizmetleri sunuyoruz. Uzman ekibimizle hassas çalışmalar yürütüyoruz.', 'Beyoğlu bölgesinde hassas hafriyat hizmetleri', '/images/regions/beyoglu.jpg', 'Beyoğlu, İstanbul', ARRAY['Hafriyat', 'Kazı', 'Yıkım', 'Nakliye', 'Restorasyon'], '+90 531 281 29 58', 'beyoglu@coskunhafriyat.com.tr', false, 4),
('Fatih', 'fatih', 'Fatih bölgesinde tarihi ve kültürel mirası koruyarak hafriyat hizmetleri sunuyoruz. Özel izinler ve hassas çalışma gerektiren projelerde uzmanız.', 'Fatih bölgesinde tarihi dokuyu koruyan hafriyat', '/images/regions/fatih.jpg', 'Fatih, İstanbul', ARRAY['Hafriyat', 'Kazı', 'Yıkım', 'Nakliye', 'Restorasyon', 'Arkeolojik Kazı'], '+90 531 281 29 58', 'fatih@coskunhafriyat.com.tr', false, 5),
('Üsküdar', 'uskudar', 'Üsküdar bölgesinde Anadolu yakasının en güvenilir hafriyat firmasıyız. Modern ekipmanlarımızla hızlı ve kaliteli hizmet sunuyoruz.', 'Üsküdar bölgesinde Anadolu yakası hafriyat hizmetleri', '/images/regions/uskudar.jpg', 'Üsküdar, İstanbul', ARRAY['Hafriyat', 'Kazı', 'Yıkım', 'Nakliye'], '+90 531 281 29 58', 'uskudar@coskunhafriyat.com.tr', false, 6)
ON CONFLICT (slug) DO NOTHING;

-- 8. Diğer gerekli index'ler
CREATE INDEX IF NOT EXISTS idx_regions_active ON regions(is_active);
CREATE INDEX IF NOT EXISTS idx_regions_featured ON regions(is_featured);
CREATE INDEX IF NOT EXISTS idx_regions_display_order ON regions(display_order);

-- Migration tamamlandı
SELECT 'Migration completed successfully!' as status;
