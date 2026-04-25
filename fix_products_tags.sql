-- =====================================================
-- 修复产品数据中的 tags 和 features 字段格式
-- =====================================================
-- 此文件将把逗号分隔的字符串格式转换为 JSON 数组格式
-- 例如："AI,写作,效率" -> ["AI", "写作", "效率"]

-- 修复 tags 字段
UPDATE products 
SET tags = CONCAT('[', tags, ']')
WHERE tags IS NOT NULL 
  AND tags != '' 
  AND tags NOT LIKE '[%';

-- 修复 features 字段
UPDATE products 
SET features = CONCAT('[', features, ']')
WHERE features IS NOT NULL 
  AND features != '' 
  AND features NOT LIKE '[%';

-- 查看修复后的数据
SELECT id, name, tags, features FROM products ORDER BY id;

-- 如果上面的修复方法不起作用，可以使用以下方法：

-- 方法2：使用 REPLACE 函数修复逗号分隔的字符串
UPDATE products 
SET tags = REPLACE(tags, ',', '","')
WHERE tags IS NOT NULL 
  AND tags != '' 
  AND tags NOT LIKE '[%';

UPDATE products 
SET tags = CONCAT('["', tags, '"]')
WHERE tags IS NOT NULL 
  AND tags != '' 
  AND tags NOT LIKE '[%';

UPDATE products 
SET features = REPLACE(features, ',', '","')
WHERE features IS NOT NULL 
  AND features != '' 
  AND features NOT LIKE '[%';

UPDATE products 
SET features = CONCAT('["', features, '"]')
WHERE features IS NOT NULL 
  AND features != '' 
  AND features NOT LIKE '[%';

-- 验证修复结果
SELECT id, name, tags, features FROM products ORDER BY id;