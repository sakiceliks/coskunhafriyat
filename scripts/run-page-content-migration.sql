-- Create page_content table for storing editable page sections
CREATE TABLE IF NOT EXISTS page_content (
  id SERIAL PRIMARY KEY,
  page_name VARCHAR(100) NOT NULL, -- 'homepage', 'about', 'contact'
  section_name VARCHAR(100) NOT NULL, -- 'hero', 'mission', 'stats', etc.
  content_type VARCHAR(50) NOT NULL, -- 'text', 'image', 'json'
  content_key VARCHAR(100) NOT NULL, -- specific field name
  content_value TEXT, -- the actual content
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(page_name, section_name, content_key)
);

-- Create team_members table for about page team section
CREATE TABLE IF NOT EXISTS team_members (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  bio TEXT,
  image_url VARCHAR(500),
  linkedin_url VARCHAR(500),
  twitter_url VARCHAR(500),
  facebook_url VARCHAR(500),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create company_stats table for statistics sections
CREATE TABLE IF NOT EXISTS company_stats (
  id SERIAL PRIMARY KEY,
  stat_key VARCHAR(100) NOT NULL UNIQUE, -- 'projects_completed', 'years_experience', etc.
  stat_value VARCHAR(50) NOT NULL,
  stat_label VARCHAR(255) NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create faqs table for contact page FAQ section
CREATE TABLE IF NOT EXISTS faqs (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default homepage content
INSERT INTO page_content (page_name, section_name, content_type, content_key, content_value) VALUES
('homepage', 'hero', 'text', 'title', 'İstanbul''un Güvenilir Hafriyat Çözümü'),
('homepage', 'hero', 'text', 'subtitle', 'JCB, kepçe, loader ve buldozer kiralama hizmetleri ile İstanbul genelinde hafriyat, kazı, yıkım ve nakliye işlerinizde yanınızdayız.'),
('homepage', 'hero', 'text', 'badge_text', 'Profesyonel Hafriyat ve İş Makinesi Kiralama'),
('homepage', 'hero', 'image', 'background_image', '/images/hero-1.png'),
('homepage', 'mission', 'text', 'title', 'Misyon & Vizyon'),
('homepage', 'mission', 'text', 'description', 'Temel değerlerimizle yönlendirilen firmamız, hafriyat sektöründe dönüşüm yaratmaya ve müşterilerimiz için kalıcı değer oluşturmaya çalışır.'),
('homepage', 'cta', 'text', 'title', 'Hafriyat Projenizi Başlatmaya Hazır mısınız?'),
('homepage', 'cta', 'text', 'description', 'Bugün ücretsiz danışmanlık ve fiyat teklifi için bizimle iletişime geçin. Ekibimiz vizyonunuzu hassasiyet ve mükemmellikle hayata geçirmeye hazır.')
ON CONFLICT (page_name, section_name, content_key) DO NOTHING;

-- Insert default about page content
INSERT INTO page_content (page_name, section_name, content_type, content_key, content_value) VALUES
('about', 'hero', 'text', 'title', 'Hakkımızda'),
('about', 'hero', 'text', 'subtitle', 'Mükemmellik, kaliteli işçilik ve müşterilerimize olan sarsılmaz bağlılığımızla inşaat sektöründe öncülük ediyoruz.'),
('about', 'hero', 'image', 'background_image', '/images/about-team.png'),
('about', 'story', 'text', 'title', 'Mükemmellik Mirası İnşa Ediyoruz'),
('about', 'story', 'text', 'description', '2000 yılında kurulan firmamız, sektörde yenilik ve kaliteli işçilik anlayışıyla dönüşüm yaratma vizyonuyla küçük bir aile şirketi olarak başladı.'),
('about', 'story', 'image', 'story_image', '/images/about-story.png')
ON CONFLICT (page_name, section_name, content_key) DO NOTHING;

-- Insert default contact page content
INSERT INTO page_content (page_name, section_name, content_type, content_key, content_value) VALUES
('contact', 'hero', 'text', 'title', 'İletişim'),
('contact', 'hero', 'text', 'subtitle', 'Proje ihtiyaçlarınızı görüşmek veya fiyat teklifi almak için ekibimizle iletişime geçin.'),
('contact', 'hero', 'image', 'background_image', '/images/contact-hero.png'),
('contact', 'info', 'text', 'address', 'İstanbul, Türkiye'),
('contact', 'info', 'text', 'phone', '(0212) 123-4567'),
('contact', 'info', 'text', 'email', 'info@hafriyatci.com'),
('contact', 'info', 'text', 'hours_weekday', 'Pazartesi - Cuma: 08:00 - 17:00'),
('contact', 'info', 'text', 'hours_weekend', 'Cumartesi: 09:00 - 14:00')
ON CONFLICT (page_name, section_name, content_key) DO NOTHING;

-- Insert default team members
INSERT INTO team_members (name, position, bio, image_url, linkedin_url, twitter_url, facebook_url, display_order) VALUES
('Mehmet Yılmaz', 'Genel Müdür & Kurucu', '30 yıllık inşaat deneyimi ile sektörde yenilik ve kalite anlayışını benimseyen bir vizyon sahibidir.', '/images/team-1.png', '#', '#', '#', 1),
('Ayşe Kaya', 'Operasyon Müdürü', 'Tüm operasyonları denetleyerek projelerin zamanında, bütçe dahilinde ve en yüksek kalite standartlarında teslim edilmesini sağlar.', '/images/team-2.png', '#', '#', '', 2),
('Ali Demir', 'Baş Mimar', 'Her projeye yaratıcı vizyon ve teknik uzmanlık getirerek sürdürülebilir ve yenilikçi tasarım çözümlerinde uzmanlaşmıştır.', '/images/team-3.png', '#', '', '#', 3)
ON CONFLICT (name, position) DO NOTHING;

-- Insert default company stats
INSERT INTO company_stats (stat_key, stat_value, stat_label, display_order) VALUES
('projects_completed', '500+', 'Tamamlanan Proje', 1),
('years_experience', '15+', 'Yıllık Deneyim', 2),
('team_members', '50+', 'Uzman Ekip Üyesi', 3),
('client_satisfaction', '98%', 'Müşteri Memnuniyeti', 4)
ON CONFLICT (stat_key) DO NOTHING;

-- Insert default FAQs
INSERT INTO faqs (question, answer, display_order) VALUES
('Hangi tür projeleri üstleniyorsunuz?', 'Konut, ticari binalar, endüstriyel tesisler, renovasyonlar ve mimari tasarım hizmetleri dahil olmak üzere geniş bir yelpazede inşaat projelerini üstleniyoruz. Hiçbir proje ekibimiz için çok büyük veya çok küçük değildir.', 1),
('Projem için nasıl fiyat teklifi alabilirim?', 'İletişim formumuzu doldurarak, ofisimizi arayarak veya e-posta göndererek fiyat teklifi talep edebilirsiniz. Proje ihtiyaçlarınızı görüşmek ve detaylı bir tahmin sunmak için bir danışma toplantısı planlayacağız.', 2),
('Tipik bir inşaat projesi ne kadar sürer?', 'Proje süreleri kapsam ve karmaşıklığa bağlı olarak değişir. Küçük bir renovasyon birkaç hafta sürebilirken, büyük bir ticari bina birkaç ay alabilir. İlk danışmanlığımız sırasında, özel projeniz için tahmini bir zaman çizelgesi sunacağız.', 3),
('İzinler ve onayları siz mi hallediyorsunuz?', 'Evet, kapsamlı hizmetimizin bir parçası olarak gerekli tüm izinleri ve düzenleyici onayları biz hallederiz. Ekibimiz yerel yapı kodları ve düzenlemelerine aşina olduğu için sorunsuz bir onay süreci sağlarız.', 4),
('Firmamızı diğer inşaat şirketlerinden ayıran nedir?', 'Kaliteye olan bağlılığımız, şeffaf iletişim, yenilikçi çözümler ve zamanında teslimat konularında öne çıkarız. Geleneksel işçiliği modern teknolojilerle birleştirerek müşteri beklentilerini aşan olağanüstü sonuçlar sunarız.', 5)
ON CONFLICT (question) DO NOTHING;
