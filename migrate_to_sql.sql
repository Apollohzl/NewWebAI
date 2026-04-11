-- =====================================================
-- NewWebAI 数据库迁移到 SQLPub 的 SQL 命令文件
-- 创建日期: 2026-04-11
-- 说明: 本文件包含所有必要的表创建命令和索引设置
-- =====================================================

-- 1. 用户表 (users)
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- 加密后的密码
    avatar TEXT,
    role ENUM('user', 'admin') DEFAULT 'user',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. 博客文章表 (blog_posts)
CREATE TABLE IF NOT EXISTS blog_posts (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    category VARCHAR(100) DEFAULT '技术',
    author VARCHAR(255) NOT NULL,
    read_time VARCHAR(50),
    published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FULLTEXT INDEX ft_title_content (title, content),
    INDEX idx_category (category),
    INDEX idx_author (author),
    INDEX idx_created_at (created_at DESC),
    INDEX idx_published (published)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. 博客标签表 (blog_tags)
CREATE TABLE IF NOT EXISTS blog_tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. 博客文章标签关联表 (blog_post_tags)
CREATE TABLE IF NOT EXISTS blog_post_tags (
    post_id VARCHAR(255) NOT NULL,
    tag_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (post_id, tag_id),
    FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES blog_tags(id) ON DELETE CASCADE,
    INDEX idx_post_id (post_id),
    INDEX idx_tag_id (tag_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. 聊天消息表 (chat_messages)
CREATE TABLE IF NOT EXISTS chat_messages (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255),
    role ENUM('user', 'assistant', 'system') NOT NULL,
    content TEXT NOT NULL,
    thinking_content TEXT,
    model VARCHAR(100),
    session_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_session_id (session_id),
    INDEX idx_created_at (created_at DESC),
    INDEX idx_role (role),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. 产品表 (products)
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    image TEXT,
    category VARCHAR(100),
    rating DECIMAL(3, 2) DEFAULT 0.00,
    tags JSON, -- 存储标签数组
    features JSON, -- 存储特性数组
    in_stock BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_price (price),
    INDEX idx_rating (rating),
    INDEX idx_in_stock (in_stock)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. 购物车表 (cart_items)
CREATE TABLE IF NOT EXISTS cart_items (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_product_id (product_id),
    UNIQUE KEY unique_user_product (user_id, product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. API配置表 (api_configs)
CREATE TABLE IF NOT EXISTS api_configs (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    endpoint VARCHAR(500) NOT NULL,
    method ENUM('GET', 'POST', 'PUT', 'DELETE', 'PATCH') DEFAULT 'GET',
    category VARCHAR(100) DEFAULT 'general',
    status VARCHAR(50) DEFAULT '正常',
    tags JSON, -- 存储标签数组
    visits BIGINT DEFAULT 0,
    icon VARCHAR(50),
    request_url VARCHAR(500),
    methods JSON, -- 存储允许的方法数组
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_status (status),
    INDEX idx_visits (visits DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. API分类表 (api_categories)
CREATE TABLE IF NOT EXISTS api_categories (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. 广告表 (ads)
CREATE TABLE IF NOT EXISTS ads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    cover_image TEXT,
    description TEXT,
    position INT DEFAULT 0, -- 显示位置/顺序
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_position (position),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. 视频模型配置表 (video_models)
CREATE TABLE IF NOT EXISTS video_models (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    provider VARCHAR(100),
    description TEXT,
    max_duration INT DEFAULT 10,
    supported_ratios JSON, -- 支持的宽高比数组
    has_audio BOOLEAN DEFAULT FALSE,
    supports_reference_images BOOLEAN DEFAULT FALSE,
    max_reference_images INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_provider (provider),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. AI图像生成记录表 (ai_image_generations)
CREATE TABLE IF NOT EXISTS ai_image_generations (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255),
    prompt TEXT NOT NULL,
    negative_prompt TEXT,
    model VARCHAR(100),
    width INT,
    height INT,
    image_url TEXT,
    is_video BOOLEAN DEFAULT FALSE,
    enhanced BOOLEAN DEFAULT FALSE,
    safe BOOLEAN DEFAULT TRUE,
    quality VARCHAR(20) DEFAULT 'medium',
    transparent BOOLEAN DEFAULT FALSE,
    seed INT,
    duration INT, -- 视频持续时间（秒）
    audio BOOLEAN DEFAULT FALSE,
    first_frame_image TEXT,
    last_frame_image TEXT,
    translated_prompt TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_model (model),
    INDEX idx_created_at (created_at DESC),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. 用户会话表 (user_sessions)
CREATE TABLE IF NOT EXISTS user_sessions (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    session_token VARCHAR(500) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_session_token (session_token),
    INDEX idx_expires_at (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 14. 系统配置表 (system_configs)
CREATE TABLE IF NOT EXISTS system_configs (
    id VARCHAR(100) PRIMARY KEY,
    config_key VARCHAR(255) NOT NULL UNIQUE,
    config_value TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 初始化基础数据
-- =====================================================

-- 插入默认API分类
INSERT INTO api_categories (id, name, description) VALUES
('basic', '基础服务', '基础API服务'),
('management', '管理工具', '数据管理相关API'),
('content', '内容管理', '内容创建和管理API'),
('utility', '实用工具', '实用工具类API'),
('ecommerce', '电商服务', '电子商务相关API'),
('ai', 'AI服务', '人工智能相关API'),
('media', '媒体服务', '媒体处理相关API'),
('video', '视频服务', '视频生成和处理相关API')
ON DUPLICATE KEY UPDATE name=VALUES(name), description=VALUES(description);

-- 插入默认系统配置
INSERT INTO system_configs (id, config_key, config_value, description) VALUES
('app_name', 'app_name', 'NewWebAI', '应用名称'),
('ai_default_model', 'ai_default_model', 'openai', '默认AI模型'),
('max_tokens', 'max_tokens', '1000', 'AI回复最大token数'),
('temperature', 'temperature', '0.7', 'AI默认创造性参数'),
('pagination_limit', 'pagination_limit', '10', '分页默认数量'),
('enable_blog_comments', 'enable_blog_comments', 'false', '是否启用博客评论')
ON DUPLICATE KEY UPDATE config_value=VALUES(config_value), description=VALUES(description);

-- 插入默认视频模型配置
INSERT INTO video_models (id, name, provider, description, max_duration, supported_ratios, has_audio, supports_reference_images, max_reference_images, is_active) VALUES
('veo', 'Veo', 'Google', 'Google的先进视频生成模型', 4, '["16:9", "9:16"]', true, false, 0, true),
('seedance', 'Seedance', 'Seedance', 'Seedance视频生成模型', 4, '["16:9", "9:16"]', false, true, 2, true),
('seedance-pro', 'Seedance Pro', 'Seedance', 'Seedance专业版视频生成模型', 8, '["16:9", "9:16"]', false, true, 2, true),
('grok-video', 'Grok Video', 'xAI', 'Grok AI视频生成模型', 4, '["16:9", "9:16"]', true, false, 0, true),
('ltx-video', 'LTX Video', 'Lightricks', 'Lightricks视频生成模型', 4, '["16:9", "9:16"]', true, false, 0, true),
('minimax-video', 'MiniMax Video', 'MiniMax', 'MiniMax视频生成模型', 4, '["16:9", "9:16"]', false, false, 0, true)
ON DUPLICATE KEY UPDATE name=VALUES(name), description=VALUES(description), is_active=VALUES(is_active);

-- =====================================================
-- 数据迁移说明
-- =====================================================

/*
迁移步骤说明：

1. 备份现有数据
   - 备份MongoDB中的users、blog_posts、chat_messages等集合
   - 备份LeanCloud中的所有数据
   - 备份JSON配置文件

2. 用户数据迁移 (users)
   - 将MongoDB users集合中的数据迁移到users表
   - 保持ID不变或重新生成
   - 转换日期格式为MySQL TIMESTAMP格式
   - 确保密码字段正确迁移

3. 博客文章迁移 (blog_posts)
   - 迁移MongoDB和LeanCloud中的博客文章
   - 处理tags数组，插入到blog_tags和blog_post_tags表
   - 转换objectId为id
   - 保持文章分类和发布状态

4. API配置迁移 (api_configs)
   - 从apis.json和LeanCloud API类中迁移配置
   - 处理tags数组为JSON格式
   - 处理methods数组为JSON格式

5. 产品数据迁移 (products)
   - 从products.json和LeanCloud迁移产品数据
   - 处理tags和features数组为JSON格式
   - 设置正确的价格和库存状态

6. 聊天记录迁移 (chat_messages)
   - 从MongoDB chat_messages集合迁移
   - 保留用户ID和会话信息
   - 分离思考内容和主要内容

7. 广告数据迁移 (ads)
   - 从ads.json迁移广告配置
   - 设置显示位置和状态

8. 数据验证
   - 检查所有外键约束
   - 验证数据完整性
   - 测试查询性能

9. 应用代码修改
   - 更新数据库连接配置
   - 修改所有数据库查询语句
   - 更新数据访问层代码
   - 测试所有API端点

注意事项：
- MongoDB的_id字段需要转换为字符串或VARCHAR
- 数组类型需要转换为JSON格式存储
- 日期格式需要统一转换
- 文本搜索功能需要使用FULLTEXT索引
- 考虑使用ORM库（如Prisma）简化数据库操作
*/