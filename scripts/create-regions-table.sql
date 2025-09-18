-- Bölgelerimiz tablosu oluştur
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

-- Index'ler oluştur
CREATE INDEX IF NOT EXISTS idx_regions_slug ON regions(slug);
CREATE INDEX IF NOT EXISTS idx_regions_active ON regions(is_active);
CREATE INDEX IF NOT EXISTS idx_regions_featured ON regions(is_featured);
CREATE INDEX IF NOT EXISTS idx_regions_display_order ON regions(display_order);

-- Örnek veri ekle
INSERT INTO regions (name, slug, description, short_description, image_url, location, services_offered, contact_phone, contact_email, is_featured, display_order) VALUES
('Kadıköy', 'kadikoy', 'Kadıköy bölgesinde profesyonel hafriyat, kazı ve yıkım hizmetleri sunuyoruz. Modern ekipmanlarımız ve deneyimli ekibimizle bölgenin en güvenilir hafriyat firmasıyız.', 'Kadıköy bölgesinde hafriyat ve kazı hizmetleri', '/images/regions/kadikoy.jpg', 'Kadıköy, İstanbul', ARRAY['Hafriyat', 'Kazı', 'Yıkım', 'Nakliye'], '+90 531 281 29 58', 'kadikoy@coskunhafriyat.com.tr', true, 1),
('Beşiktaş', 'besiktas', 'Beşiktaş bölgesinde kapsamlı hafriyat çözümleri sunuyoruz. Ticari ve konut projeleri için özel hizmetlerimizle yanınızdayız.', 'Beşiktaş bölgesinde kapsamlı hafriyat hizmetleri', '/images/regions/besiktas.jpg', 'Beşiktaş, İstanbul', ARRAY['Hafriyat', 'Kazı', 'Yıkım', 'Nakliye', 'Temizlik'], '+90 531 281 29 58', 'besiktas@coskunhafriyat.com.tr', true, 2),
('Şişli', 'sisli', 'Şişli bölgesinde modern hafriyat teknolojileri kullanarak hızlı ve güvenli hizmet sunuyoruz. Ticari merkezler için özel çözümlerimiz mevcuttur.', 'Şişli bölgesinde modern hafriyat teknolojileri', '/images/regions/sisli.jpg', 'Şişli, İstanbul', ARRAY['Hafriyat', 'Kazı', 'Yıkım', 'Nakliye'], '+90 531 281 29 58', 'sisli@coskunhafriyat.com.tr', true, 3),
('Beyoğlu', 'beyoglu', 'Beyoğlu bölgesinde tarihi dokuyu koruyarak modern hafriyat hizmetleri sunuyoruz. Uzman ekibimizle hassas çalışmalar yürütüyoruz.', 'Beyoğlu bölgesinde hassas hafriyat hizmetleri', '/images/regions/beyoglu.jpg', 'Beyoğlu, İstanbul', ARRAY['Hafriyat', 'Kazı', 'Yıkım', 'Nakliye', 'Restorasyon'], '+90 531 281 29 58', 'beyoglu@coskunhafriyat.com.tr', false, 4),
('Fatih', 'fatih', 'Fatih bölgesinde tarihi ve kültürel mirası koruyarak hafriyat hizmetleri sunuyoruz. Özel izinler ve hassas çalışma gerektiren projelerde uzmanız.', 'Fatih bölgesinde tarihi dokuyu koruyan hafriyat', '/images/regions/fatih.jpg', 'Fatih, İstanbul', ARRAY['Hafriyat', 'Kazı', 'Yıkım', 'Nakliye', 'Restorasyon', 'Arkeolojik Kazı'], '+90 531 281 29 58', 'fatih@coskunhafriyat.com.tr', false, 5),
('Üsküdar', 'uskudar', 'Üsküdar bölgesinde Anadolu yakasının en güvenilir hafriyat firmasıyız. Modern ekipmanlarımızla hızlı ve kaliteli hizmet sunuyoruz.', 'Üsküdar bölgesinde Anadolu yakası hafriyat hizmetleri', '/images/regions/uskudar.jpg', 'Üsküdar, İstanbul', ARRAY['Hafriyat', 'Kazı', 'Yıkım', 'Nakliye'], '+90 531 281 29 58', 'uskudar@coskunhafriyat.com.tr', false, 6);
