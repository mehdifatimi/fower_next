# Guide: Importer les Données dans Supabase

## Étape 1: Exécuter le Script SQL

1. Ouvrez votre dashboard Supabase: https://gifvsjsfgswmwnlsunme.supabase.co
2. Allez dans **SQL Editor** (dans le menu de gauche)
3. Cliquez sur **New Query**
4. Copiez tout le contenu du fichier `supabase/seed_data.sql`
5. Collez-le dans l'éditeur SQL
6. Cliquez sur **Run** pour exécuter le script

✅ Cela va insérer:
- 2 catégories (Bouquets de fleurs, Fleurs & Chocolats)
- 12 produits avec descriptions en français et arabe

## Étape 2: Uploader les Images (Important!)

Les chemins d'images dans la base de données pointent vers des fichiers locaux. Vous devez:

### Option A: Utiliser Supabase Storage

1. Allez dans **Storage** dans votre dashboard Supabase
2. Créez un nouveau bucket appelé `flowers` (public)
3. Uploadez vos images de produits
4. Copiez les URLs publiques des images
5. Mettez à jour la base de données:

```sql
-- Exemple pour mettre à jour les images d'un produit
UPDATE flowers 
SET images = '{
  "s": "https://gifvsjsfgswmwnlsunme.supabase.co/storage/v1/object/public/flowers/product1_s.jpg",
  "m": "https://gifvsjsfgswmwnlsunme.supabase.co/storage/v1/object/public/flowers/product1_m.jpg",
  "xl": "https://gifvsjsfgswmwnlsunme.supabase.co/storage/v1/object/public/flowers/product1_xl.jpg"
}'::jsonb
WHERE name_fr = 'Coffret de roses et chocolats';
```

### Option B: Utiliser des URLs Unsplash (Temporaire)

Si vous n'avez pas encore les images, vous pouvez utiliser des URLs Unsplash temporaires:

```sql
UPDATE flowers 
SET images = '{
  "m": "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=800"
}'::jsonb;
```

## Étape 3: Vérifier les Données

Exécutez cette requête pour voir vos produits:

```sql
SELECT 
  f.name_fr,
  f.price,
  c.name_fr as category,
  f.stock,
  f.featured
FROM flowers f
LEFT JOIN categories c ON f.category_id = c.id
ORDER BY f.created_at DESC;
```

## Étape 4: Tester sur le Site

1. Allez sur http://localhost:3000/fr
2. Vous devriez voir les produits "featured" sur la page d'accueil
3. Allez sur http://localhost:3000/fr/shop pour voir tous les produits
4. Testez les filtres par catégorie

## Notes Importantes

- ⚠️ Les images doivent être uploadées manuellement
- 📸 Format recommandé: JPEG ou PNG
- 📏 Tailles suggérées:
  - S (Small): 400x400px
  - M (Medium): 800x800px
  - XL (Extra Large): 1200x1200px
- 🔒 Assurez-vous que le bucket Supabase est **public** pour que les images soient accessibles

## Dépannage

**Problème**: Les produits n'apparaissent pas
- Vérifiez que `featured = true` pour les produits de la page d'accueil
- Vérifiez que `category_id` correspond bien à une catégorie existante

**Problème**: Les images ne s'affichent pas
- Vérifiez que les URLs dans le champ `images` sont correctes
- Vérifiez que le bucket Supabase est public
- Vérifiez que `next.config.mjs` autorise votre domaine Supabase
