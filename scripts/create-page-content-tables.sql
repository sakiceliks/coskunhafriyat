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
('homepage', 'cta', 'text', 'description', 'Bugün ücretsiz danışmanlık ve fiyat teklifi için bizimle iletişime geçin. Ekibimiz vizyonunuzu hassasiyet ve mükemmellikle hayata geçirmeye hazır.');

-- Insert default about page content
INSERT INTO page_content (page_name, section_name, content_type, content_key, content_value) VALUES
('about', 'hero', 'text', 'title', 'About BuildMaster'),
('about', 'hero', 'text', 'subtitle', 'Building excellence through innovation, quality craftsmanship, and unwavering commitment to our clients.'),
('about', 'hero', 'image', 'background_image', '/images/about-team.png'),
('about', 'story', 'text', 'title', 'Building a Legacy of Excellence'),
('about', 'story', 'text', 'description', 'Founded in 2000, BuildMaster began as a small family-owned construction company with a vision to transform the industry through innovation and quality craftsmanship.'),
('about', 'story', 'image', 'story_image', '/images/about-story.png');

-- Insert default contact page content
INSERT INTO page_content (page_name, section_name, content_type, content_key, content_value) VALUES
('contact', 'hero', 'text', 'title', 'Contact Us'),
('contact', 'hero', 'text', 'subtitle', 'Get in touch with our team to discuss your project needs or request a quote.'),
('contact', 'hero', 'image', 'background_image', '/images/contact-hero.png'),
('contact', 'info', 'text', 'address', '123 BuildMaster Ave, Construction City, BC 12345'),
('contact', 'info', 'text', 'phone', '0533 323 93 71'),
('contact', 'info', 'text', 'email', 'emin@buildmaster.com'),
('contact', 'info', 'text', 'hours_weekday', 'Monday - Friday: 8:00 AM - 5:00 PM'),
('contact', 'info', 'text', 'hours_weekend', 'Saturday: 9:00 AM - 2:00 PM');

-- Insert default team members
INSERT INTO team_members (name, position, bio, image_url, linkedin_url, twitter_url, facebook_url, display_order) VALUES
('Michael Reynolds', 'CEO & Founder', 'With over 30 years in construction, Michael founded BuildMaster with a vision to transform the industry through innovation and quality.', '/images/team-1.png', '#', '#', '#', 1),
('Sarah Johnson', 'Chief Operations Officer', 'Sarah oversees all operations, ensuring projects are delivered on time, within budget, and to the highest standards of quality.', '/images/team-2.png', '#', '#', '', 2),
('David Chen', 'Lead Architect', 'David brings creative vision and technical expertise to every project, specializing in sustainable and innovative design solutions.', '/images/team-3.png', '#', '', '#', 3);

-- Insert default company stats
INSERT INTO company_stats (stat_key, stat_value, stat_label, display_order) VALUES
('projects_completed', '500+', 'Tamamlanan Proje', 1),
('years_experience', '15+', 'Yıllık Deneyim', 2),
('team_members', '50+', 'Uzman Ekip Üyesi', 3),
('client_satisfaction', '98%', 'Müşteri Memnuniyeti', 4);

-- Insert default FAQs
INSERT INTO faqs (question, answer, display_order) VALUES
('What types of projects do you handle?', 'We handle a wide range of construction projects including residential homes, commercial buildings, industrial facilities, renovations, and architectural design services. No project is too big or too small for our team.', 1),
('How do I get a quote for my project?', 'You can request a quote by filling out our contact form, calling our office, or sending us an email. We''ll schedule a consultation to discuss your project needs and provide a detailed estimate.', 2),
('How long does a typical construction project take?', 'Project timelines vary depending on the scope and complexity. A small renovation might take a few weeks, while a large commercial building could take several months. During our initial consultation, we''ll provide an estimated timeline for your specific project.', 3),
('Do you handle permits and approvals?', 'Yes, we handle all necessary permits and regulatory approvals as part of our comprehensive service. Our team is familiar with local building codes and regulations to ensure a smooth approval process.', 4),
('What sets BuildMaster apart from other construction companies?', 'BuildMaster stands out for our commitment to quality, transparent communication, innovative solutions, and on-time delivery. We combine traditional craftsmanship with modern technologies to deliver exceptional results that exceed client expectations.', 5);
