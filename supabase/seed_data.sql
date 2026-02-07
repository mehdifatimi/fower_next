-- ============================================
-- FLORAL ZAHRAE - Data Migration Script
-- From MySQL to Supabase PostgreSQL
-- ============================================

-- First, insert categories
INSERT INTO categories (name_fr, name_ar, description_fr, description_ar, slug) VALUES
('Bouquets de fleurs', 'باقات الزهور', 'Bouquets de fleurs', 'باقات الزهور', 'bouquets-de-fleurs'),
('Fleurs & Chocolats', 'زهور وشوكولاتة', 'Fleurs & Chocolats', 'زهور وشوكولاتة', 'fleurs-chocolats');

-- Now insert flowers
-- Note: You'll need to upload images to Supabase Storage and update the image URLs

INSERT INTO flowers (
  name_fr, 
  name_ar, 
  description_fr, 
  description_ar, 
  price, 
  category_id, 
  images, 
  stock, 
  featured
) VALUES

-- Product 1: Coffret de roses et chocolats
(
  'Coffret de roses et chocolats',
  'صندوق الورود والشوكولاتة',
  'Un cadeau qui allie amour et raffinement. Un bouquet de roses soigneusement composé et de délicieux chocolats pour rendre chaque instant précieux encore plus romantique.',
  'هدية تجمع بين الحب والرقي. باقة ورود مرتبة بعناية وشوكولاتة لذيذة لجعل كل لحظة ثمينة أكثر رومانسية.',
  600.00,
  (SELECT id FROM categories WHERE slug = 'fleurs-chocolats' LIMIT 1),
  '{"s": "uploads/flowers/flower_s_1766923153_3741.jpeg", "m": "uploads/flowers/flower_m_1766923153_8378.jpeg", "xl": "uploads/flowers/flower_xl_1766923153_2502.jpeg"}',
  50,
  true
),

-- Product 2: Coffret Prestige Royal
(
  'Coffret Prestige Royal',
  'صندوق بريستيج الملكي',
  'Une sélection raffinée de roses assorties, soigneusement choisies et élégamment arrangées pour refléter le luxe et le raffinement. Le coffret idéal pour des cadeaux sophistiqués, des occasions spéciales et des moments inoubliables.',
  'مجموعة راقية من الورود المختارة بعناية والمرتبة بأناقة لتعكس الفخامة والرقي. الصندوق المثالي للهدايا الفاخرة والمناسبات الخاصة واللحظات التي لا تُنسى.',
  1000.00,
  (SELECT id FROM categories WHERE slug = 'bouquets-de-fleurs' LIMIT 1),
  '{"xl": "uploads/flowers/flower_xl_1766923317_3160.jpeg"}',
  50,
  true
),

-- Product 3: Le Bouquet Couronne d'Éminence
(
  'Le Bouquet Couronne d''Éminence',
  'باقة تاج السمو',
  'Une collection luxueuse de roses soigneusement sélectionnées, harmonieuses dans leurs formes et équilibrées dans leurs détails, reflétant un goût raffiné et une élégance royale. Une création élégante, idéale pour les occasions les plus prestigieuses et un cadeau qui laisse une impression durable.',
  'مجموعة فاخرة من الورود المختارة بعناية، متناسقة في أشكالها ومتوازنة في تفاصيلها، تعكس ذوقاً راقياً وأناقة ملكية. إبداع أنيق، مثالي للمناسبات الأكثر هيبة وهدية تترك انطباعاً دائماً.',
  1500.00,
  (SELECT id FROM categories WHERE slug = 'bouquets-de-fleurs' LIMIT 1),
  '{"xl": "uploads/flowers/flower_xl_1766923679_3790.jpeg"}',
  50,
  true
),

-- Product 4: Bouquet de roses et chocolats
(
  'Bouquet de roses et chocolats',
  'باقة الورود والشوكولاتة',
  'Un bouquet de roses soigneusement sélectionnées accompagné de chocolats raffinés ; la couleur des roses est à votre choix.',
  'باقة من الورود المختارة بعناية مع شوكولاتة راقية؛ لون الورود حسب اختيارك.',
  1000.00,
  (SELECT id FROM categories WHERE slug = 'fleurs-chocolats' LIMIT 1),
  '{"s": "uploads/flowers/flower_s_1766923847_8692.jpeg", "m": "uploads/flowers/flower_m_1766923847_7015.jpeg", "xl": "uploads/flowers/flower_xl_1766923847_4233.jpeg"}',
  50,
  true
),

-- Product 5: Coffret de Roses
(
  'Coffret de Roses',
  'صندوق الورود',
  'Une Déclaration D''Amour dans Chaque Rose. Un bouquet soigneusement composé, une composition élégante et des moments inoubliables.',
  'إعلان حب في كل وردة. باقة مرتبة بعناية، تركيبة أنيقة ولحظات لا تُنسى.',
  500.00,
  (SELECT id FROM categories WHERE slug = 'bouquets-de-fleurs' LIMIT 1),
  '{"s": "uploads/flowers/flower_s_1766924048_2871.jpeg", "m": "uploads/flowers/flower_m_1766924048_9627.jpeg", "xl": "uploads/flowers/flower_xl_1766924048_1120.jpeg"}',
  50,
  true
),

-- Product 6: Bouquet « Cœur Étoile »
(
  'Bouquet « Cœur Étoile »',
  'باقة «قلب النجمة»',
  'Tandis que tous les autres sont éphémères, tu es le cœur pur et fidèle. Une composition luxueuse qui allie l''élégance des roses rouges à une touche de pureté unique.',
  'بينما الجميع زائلون، أنتِ القلب النقي والوفي. تركيبة فاخرة تجمع بين أناقة الورود الحمراء ولمسة نقاء فريدة.',
  1111.00,
  (SELECT id FROM categories WHERE slug = 'bouquets-de-fleurs' LIMIT 1),
  '{"xl": "uploads/flowers/flower_xl_1766924323_6302.jpeg"}',
  11,
  false
),

-- Product 7: Rose Élite
(
  'Rose Élite',
  'روز إيليت',
  'L''élégance qui en dit long. Le bouquet Rose Élite… une somptueuse composition circulaire de roses naturelles d''exception, conçue pour exprimer vos sentiments avec élégance. Une beauté qui captive le regard.',
  'الأناقة التي تتحدث عن نفسها. باقة روز إيليت... تركيبة دائرية فاخرة من الورود الطبيعية الاستثنائية، مصممة للتعبير عن مشاعرك بأناقة. جمال يأسر النظر.',
  1111.00,
  (SELECT id FROM categories WHERE slug = 'bouquets-de-fleurs' LIMIT 1),
  '{"xl": "uploads/flowers/flower_xl_1766924400_2408.jpeg"}',
  11,
  false
),

-- Product 8: Duo Éternel
(
  'Duo Éternel',
  'ثنائي أبدي',
  'Un harmonieux mélange de roses rouges et blanches somptueuses. Une expression silencieuse d''amour et de pureté dans une composition circulaire majestueuse.',
  'مزيج متناغم من الورود الحمراء والبيضاء الفاخرة. تعبير صامت عن الحب والنقاء في تركيبة دائرية مهيبة.',
  1111.00,
  (SELECT id FROM categories WHERE slug = 'bouquets-de-fleurs' LIMIT 1),
  '{"xl": "uploads/flowers/flower_xl_1766924471_2301.jpeg"}',
  11,
  false
),

-- Product 9: Un bouquet d'émotions
(
  'Un bouquet d''émotions',
  'باقة من المشاعر',
  'Des couleurs harmonieuses et une touche d''élégance à offrir à un être cher.',
  'ألوان متناسقة ولمسة أناقة لتقديمها لشخص عزيز.',
  700.00,
  (SELECT id FROM categories WHERE slug = 'bouquets-de-fleurs' LIMIT 1),
  '{"s": "uploads/flowers/flower_s_1766925456_7510.jpeg", "m": "uploads/flowers/flower_m_1766925456_6964.jpeg", "xl": "uploads/flowers/flower_xl_1766925456_2662.jpeg"}',
  50,
  true
),

-- Product 10: Love Heb
(
  'Love Heb',
  'حب هيب',
  'Un luxueux bouquet de roses rouges naturelles, exprimant un amour profond et des sentiments sincères dans une composition élégante.',
  'باقة فاخرة من الورود الحمراء الطبيعية، تعبر عن حب عميق ومشاعر صادقة في تركيبة أنيقة.',
  800.00,
  (SELECT id FROM categories WHERE slug = 'bouquets-de-fleurs' LIMIT 1),
  '{"s": "uploads/flowers/flower_s_1766925544_1408.jpeg", "m": "uploads/flowers/flower_m_1766925544_9544.jpeg", "xl": "uploads/flowers/flower_xl_1766925544_6618.jpeg"}',
  50,
  true
),

-- Product 11: La blancheur de l'amour
(
  'La blancheur de l''amour',
  'بياض الحب',
  'Un élégant bouquet de roses blanches naturelles, symbolisant l''amour véritable et la pureté, avec une composition raffinée et une touche luxueuse.',
  'باقة أنيقة من الورود البيضاء الطبيعية، ترمز للحب الحقيقي والنقاء، مع تركيبة راقية ولمسة فاخرة.',
  700.00,
  (SELECT id FROM categories WHERE slug = 'bouquets-de-fleurs' LIMIT 1),
  '{"s": "uploads/flowers/flower_s_1766925794_1874.jpeg", "m": "uploads/flowers/flower_m_1766925794_8348.jpeg", "xl": "uploads/flowers/flower_xl_1766925794_1077.jpeg"}',
  50,
  true
),

-- Product 12: Le Bouquet Élégance
(
  'Le Bouquet Élégance',
  'باقة الأناقة',
  'Une composition raffinée de lys blancs soigneusement sélectionnés, une touche de luxe et de simplicité à la fois.',
  'تركيبة راقية من الزنابق البيضاء المختارة بعناية، لمسة من الفخامة والبساطة في آن واحد.',
  1300.00,
  (SELECT id FROM categories WHERE slug = 'bouquets-de-fleurs' LIMIT 1),
  '{"s": "uploads/flowers/flower_s_1766925892_1428.jpeg", "m": "uploads/flowers/flower_m_1766925892_6321.jpeg", "xl": "uploads/flowers/flower_xl_1766925892_1393.jpeg"}',
  50,
  true
);

-- ============================================
-- IMPORTANT NOTES:
-- ============================================
-- 1. The image paths reference local uploads. You need to:
--    - Upload these images to Supabase Storage
--    - Update the JSON image paths with the Supabase Storage URLs
--
-- 2. To update image URLs after upload, use:
--    UPDATE flowers SET images = '{"s": "https://your-supabase-url/storage/...", ...}' WHERE id = X;
--
-- 3. All products are marked as 'featured' to appear on the homepage
--
-- 4. Stock is set to 50 for most items (11 for premium items)
-- ============================================
