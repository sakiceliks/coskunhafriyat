-- Update all regions with the new comprehensive service list
-- This script updates the services_offered array for all regions

-- Define the new services array
-- You can modify this list as needed
WITH new_services AS (
  SELECT ARRAY[
    'Yol Yardım ve Tır Kurtarma',
    'Tır Yükleme ve İndirme',
    'Bahçe Düzenleme ve Peyzaj',
    'JCB Beko Loder Kiralama',
    'Hafriyat ve Kazı İşleri',
    'Beton Kırma Hizmeti',
    'İş Makinesi Kiralama',
    'Yıkım Hizmetleri',
    'Nakliye ve Taşıma',
    'Kiralik Kepçe'
  ] AS services
)

-- Update all regions with the new services
UPDATE regions 
SET services_offered = new_services.services,
    updated_at = NOW()
FROM new_services
WHERE regions.is_active = true;

-- Alternative: Update specific regions only
-- Uncomment and modify the WHERE clause below to update specific regions

-- UPDATE regions 
-- SET services_offered = ARRAY[
--   'Yol Yardım ve Tır Kurtarma',
--   'Tır Yükleme ve İndirme',
--   'Bahçe Düzenleme ve Peyzaj',
--   'JCB Beko Loder Kiralama',
--   'Hafriyat ve Kazı İşleri',
--   'Beton Kırma Hizmeti',
--   'İş Makinesi Kiralama',
--   'Yıkım Hizmetleri',
--   'Nakliye ve Taşıma',
--   'Kiralik Kepçe'
-- ],
-- updated_at = NOW()
-- WHERE name IN ('Ballıca', 'Orhanlı', 'Kadıköy', 'Beşiktaş', 'Şişli', 'Beyoğlu', 'Fatih', 'Üsküdar');

-- Verify the updates
SELECT name, slug, services_offered, updated_at 
FROM regions 
WHERE is_active = true 
ORDER BY display_order, name;
