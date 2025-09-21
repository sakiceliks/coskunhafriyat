-- Create hero carousel table
CREATE TABLE IF NOT EXISTS hero_carousel (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(500),
  description TEXT,
  image_url VARCHAR(500) NOT NULL,
  button_text VARCHAR(100),
  button_link VARCHAR(255),
  button_text_2 VARCHAR(100),
  button_link_2 VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample hero slides
INSERT INTO hero_carousel (title, subtitle, description, image_url, button_text, button_link, button_text_2, button_link_2, display_order) VALUES
(
  'İstanbul''un Güvenilir Hafriyat Çözümü',
  'Profesyonel Hafriyat ve İş Makinesi Kiralama',
  'JCB, kepçe, loader ve buldozer kiralama hizmetleri ile İstanbul genelinde hafriyat, kazı, yıkım ve nakliye işlerinizde yanınızdayız.',
  'https://cm8xsbawnj19nezd.public.blob.vercel-storage.com/1758398870346-Yeni%20Proje.jpg',
  'Hizmetlerimizi Keşfedin',
  '/hizmetler',
  'Projelerimizi İnceleyin',
  '/projeler',
  1
),
(
  'Profesyonel Kazı ve Yıkım Hizmetleri',
  'Modern Ekipmanlarla Güvenilir Hizmet',
  'Deneyimli ekibimiz ve son teknoloji iş makinelerimizle her türlü kazı, yıkım ve hafriyat işlerinizi güvenle tamamlıyoruz.',
  'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=800&fit=crop',
  'Hemen Teklif Alın',
  '/iletisim',
  'Bölgelerimizi Görün',
  '/bolgelerimiz',
  2
),
(
  'İş Makinesi Kiralama Hizmetleri',
  '7/24 Hizmet, Rekabetçi Fiyatlar',
  'JCB, kepçe, loader, buldozer ve diğer iş makinelerini kısa ve uzun vadeli olarak kiralayabilir, projelerinizi zamanında tamamlayabilirsiniz.',
  'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=800&fit=crop',
  'Kiralama Bilgileri',
  '/hizmetler/is-makinesi-kiralama',
  'İletişime Geçin',
  '/iletisim',
  3
);
