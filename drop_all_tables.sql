-- =====================================================
-- 删除数据库中的所有表
-- =====================================================
-- 警告：此操作不可逆，请先备份数据！
-- =====================================================

-- 删除关联表（先删除有外键的表）
DROP TABLE IF EXISTS blog_post_tags;
DROP TABLE IF EXISTS blog_tags;

-- 删除主表
DROP TABLE IF EXISTS blog_posts;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS api_configs;
DROP TABLE IF EXISTS api_categories;
DROP TABLE IF EXISTS ads;
DROP TABLE IF EXISTS ai_image_generations;
DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS chat_messages;
DROP TABLE IF EXISTS system_configs;
DROP TABLE IF EXISTS user_sessions;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS video_models;

-- =====================================================
-- 验证删除结果
-- =====================================================
SHOW TABLES;

-- =====================================================
-- 删除完成提示
-- =====================================================
SELECT '所有表已删除' as status, NOW() as current_time;