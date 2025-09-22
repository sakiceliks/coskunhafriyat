-- Update region services with new service list
-- This script updates the services_offered array for regions

-- Update Ballıca region services (assuming it exists, if not, you can change the region name)
UPDATE regions 
SET services_offered = ARRAY[
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
],
updated_at = NOW()
WHERE name = 'Ballıca' OR slug = 'ballica';

-- If you want to update a different region, replace 'Ballıca' with the region name
-- For example, to update Orhanlı region:
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
-- WHERE name = 'Orhanlı' OR slug = 'orhanli';

-- Verify the update
SELECT name, slug, services_offered FROM regions WHERE name = 'Ballıca' OR slug = 'ballica';
