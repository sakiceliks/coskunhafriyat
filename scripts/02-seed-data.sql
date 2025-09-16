-- Adding sample data for services, projects, and blog posts
INSERT INTO services (title, description, short_description, icon, image_url, price_range, features, is_featured, is_active) VALUES
('Hafriyat ve Kazı İşleri', 'Profesyonel hafriyat ve kazı hizmetleri ile projelerinizi güvenle tamamlayın. Modern ekipmanlarımız ve deneyimli ekibimizle her türlü hafriyat işini üstleniyoruz.', 'Profesyonel hafriyat ve kazı hizmetleri', 'Excavator', '/placeholder.svg?height=400&width=600', '₺500-2000/gün', ARRAY['JCB Kiralama', 'Toprak Kazısı', 'Temel Kazısı', 'Drenaj Kazısı'], true, true),

('İş Makinesi Kiralama', 'Ekskavator, kepçe, loader, buldozer ve skreyper gibi tüm iş makinelerini saatlik veya günlük olarak kiralayabilirsiniz. Modern ve bakımlı makinelerimizle işlerinizi kolaylaştırın.', 'Her türlü iş makinesi kiralama hizmeti', 'Truck', '/placeholder.svg?height=400&width=600', '₺300-1500/gün', ARRAY['Ekskavator Kiralama', 'Kepçe Kiralama', 'Loader Kiralama', 'Buldozer Kiralama'], true, true),

('Yıkım Hizmetleri', 'Güvenli ve çevre dostu yıkım hizmetleri. Uzman ekibimiz ve özel ekipmanlarımızla her türlü yapının yıkımını gerçekleştiriyoruz.', 'Profesyonel ve güvenli yıkım hizmetleri', 'Hammer', '/placeholder.svg?height=400&width=600', '₺1000-5000/proje', ARRAY['Bina Yıkımı', 'Duvar Yıkımı', 'Moloz Temizliği', 'Çevre Düzenlemesi'], false, true),

('Nakliye ve Taşıma', 'Hafriyat toprağı, inşaat malzemesi ve moloz nakliye hizmetleri. Güvenilir araç filomuzla zamanında teslimat garantisi.', 'Hafriyat ve inşaat malzemesi nakliyesi', 'Truck', '/placeholder.svg?height=400&width=600', '₺200-800/sefer', ARRAY['Toprak Nakliyesi', 'Moloz Taşıma', 'Malzeme Nakliyesi', 'Hızlı Teslimat'], false, true);

INSERT INTO projects (title, description, short_description, image_url, gallery_images, location, completion_date, project_type, client_name, project_size, is_featured, is_active) VALUES
('Pendik Konut Projesi Hafriyat', 'Pendik bölgesinde gerçekleştirilen 500 daireli konut projesinin hafriyat ve kazı işleri. 15.000 m³ toprak kazısı ve temel hazırlık çalışmaları tamamlandı.', 'Büyük ölçekli konut projesi hafriyat işleri', '/placeholder.svg?height=400&width=600', ARRAY['/placeholder.svg?height=300&width=400', '/placeholder.svg?height=300&width=400'], 'Pendik, İstanbul', '2024-03-15', 'Konut', 'ABC İnşaat', '15.000 m³', true, true),

('Tuzla Sanayi Sitesi Kazı', 'Tuzla Organize Sanayi Bölgesi''nde fabrika inşaatı için gerçekleştirilen kazı ve hafriyat çalışmaları. Drenaj sistemi kurulumu dahil.', 'Sanayi tesisi kazı ve hafriyat işleri', '/placeholder.svg?height=400&width=600', ARRAY['/placeholder.svg?height=300&width=400', '/placeholder.svg?height=300&width=400'], 'Tuzla, İstanbul', '2024-02-28', 'Sanayi', 'XYZ Fabrika', '8.500 m³', true, true),

('Tepeören Villa Projesi', 'Tepeören''de lüks villa inşaatı için hafriyat, peyzaj düzenlemesi ve havuz kazısı işleri. Özel tasarım bahçe düzenlemesi dahil.', 'Lüks villa hafriyat ve peyzaj işleri', '/placeholder.svg?height=400&width=600', ARRAY['/placeholder.svg?height=300&width=400', '/placeholder.svg?height=300&width=400'], 'Tepeören, İstanbul', '2024-01-20', 'Villa', 'Özel Müşteri', '2.500 m³', false, true),

('Kurtköy Alışveriş Merkezi', 'Kurtköy''de inşa edilen alışveriş merkezi için kapsamlı hafriyat ve temel kazısı işleri. Otopark alanı kazısı dahil.', 'Alışveriş merkezi hafriyat projesi', '/placeholder.svg?height=400&width=600', ARRAY['/placeholder.svg?height=300&width=400', '/placeholder.svg?height=300&width=400'], 'Kurtköy, İstanbul', '2023-12-10', 'Ticari', 'DEF Yatırım', '12.000 m³', false, true);

INSERT INTO blog_posts (title, slug, content, excerpt, featured_image, category, tags, is_published, is_featured, published_at) VALUES
('İstanbul''da Hafriyat İşleri İçin En İyi Dönem', 'istanbul-hafriyat-en-iyi-donem', 'İstanbul''da hafriyat işleri için en uygun dönemleri ve dikkat edilmesi gereken faktörleri detaylı olarak inceliyoruz...', 'İstanbul''da hafriyat işleri için en uygun dönemler ve önemli faktörler', '/placeholder.svg?height=400&width=600', 'İpuçları', ARRAY['hafriyat', 'istanbul', 'mevsim', 'inşaat'], true, true, '2024-03-01 10:00:00+03'),

('JCB Kiralama vs Satın Alma: Hangisi Daha Avantajlı?', 'jcb-kiralama-vs-satin-alma', 'İş makinesi ihtiyacınız için JCB kiralama mı yoksa satın alma mı daha avantajlı? Maliyet analizi ve karşılaştırma...', 'JCB kiralama ve satın alma seçeneklerinin detaylı karşılaştırması', '/placeholder.svg?height=400&width=600', 'Rehber', ARRAY['jcb', 'kiralama', 'maliyet', 'karşılaştırma'], true, false, '2024-02-15 14:30:00+03'),

('Hafriyat İşlerinde Güvenlik Önlemleri', 'hafriyat-guvenlik-onlemleri', 'Hafriyat ve kazı işlerinde alınması gereken güvenlik önlemleri ve iş güvenliği standartları hakkında bilmeniz gerekenler...', 'Hafriyat işlerinde güvenlik ve iş güvenliği standartları', '/placeholder.svg?height=400&width=600', 'Güvenlik', ARRAY['güvenlik', 'hafriyat', 'iş güvenliği', 'standartlar'], true, false, '2024-01-28 09:15:00+03');
