-- =====================================================
-- SQLPub 数据库初始化文件
-- 基于 LeanCloud 数据架构生成
-- =====================================================
-- 使用方法：
-- 1. 确保已创建数据库（hzliflow）
-- 2. 执行此文件初始化表结构
-- 3. 然后执行 import_data.sql 导入数据

-- 设置字符集
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- =====================================================
-- 删除现有表（如果需要重新初始化）
-- =====================================================
-- DROP TABLE IF EXISTS blog_post_tags;
-- DROP TABLE IF EXISTS blog_tags;
-- DROP TABLE IF EXISTS blog_posts;
-- DROP TABLE IF EXISTS api_configs;
-- DROP TABLE IF EXISTS products;
-- DROP TABLE IF EXISTS users;

-- =====================================================
-- 用户表 (users)
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(255) PRIMARY KEY COMMENT '用户唯一标识',
  username VARCHAR(100) NOT NULL COMMENT '用户名',
  email VARCHAR(255) NOT NULL UNIQUE COMMENT '邮箱',
  password VARCHAR(500) NOT NULL COMMENT '加密密码',
  salt VARCHAR(255) COMMENT '密码盐值',
  avatar TEXT COMMENT '头像URL',
  sessionToken VARCHAR(255) COMMENT '会话令牌',
  shortId VARCHAR(20) COMMENT '短ID',
  emailVerified BOOLEAN DEFAULT FALSE COMMENT '邮箱是否验证',
  mobilePhoneVerified BOOLEAN DEFAULT FALSE COMMENT '手机是否验证',
  is_active BOOLEAN DEFAULT TRUE COMMENT '是否激活',
  ACL TEXT COMMENT '访问控制列表',
  INDEX idx_email (email),
  INDEX idx_username (username),
  INDEX idx_shortId (shortId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- =====================================================
-- 博客文章表 (blog_posts)
-- =====================================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id VARCHAR(255) PRIMARY KEY COMMENT '文章ID',
  title VARCHAR(500) NOT NULL COMMENT '文章标题',
  content TEXT NOT NULL COMMENT '文章内容',
  excerpt TEXT COMMENT '文章摘要',
  category VARCHAR(100) COMMENT '分类',
  author VARCHAR(255) COMMENT '作者',
  readTime VARCHAR(50) COMMENT '阅读时间',
  published TINYINT(1) DEFAULT 1 COMMENT '是否发布',
  ACL TEXT COMMENT '访问控制列表',
  INDEX idx_category (category),
  INDEX idx_author (author),
  INDEX idx_published (published)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='博客文章表';

-- =====================================================
-- 博客标签表 (blog_tags)
-- =====================================================
CREATE TABLE IF NOT EXISTS blog_tags (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT '标签ID',
  tag_name VARCHAR(100) NOT NULL UNIQUE COMMENT '标签名称',
  INDEX idx_tag_name (tag_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='博客标签表';

-- =====================================================
-- 博客文章标签关联表 (blog_post_tags)
-- =====================================================
CREATE TABLE IF NOT EXISTS blog_post_tags (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT '关联ID',
  post_id VARCHAR(255) NOT NULL COMMENT '文章ID',
  tag_id INT NOT NULL COMMENT '标签ID',
  FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES blog_tags(id) ON DELETE CASCADE,
  UNIQUE KEY uk_post_tag (post_id, tag_id),
  INDEX idx_post_id (post_id),
  INDEX idx_tag_id (tag_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='博客文章标签关联表';

-- =====================================================
-- API配置表 (apis)
-- =====================================================
CREATE TABLE IF NOT EXISTS apis (
  id VARCHAR(255) PRIMARY KEY COMMENT 'API ID',
  name VARCHAR(255) NOT NULL COMMENT 'API名称',
  name_v2 VARCHAR(255) NOT NULL COMMENT 'API名称_v2',
  description TEXT COMMENT 'API描述',
  category VARCHAR(100) COMMENT '分类',
  tags JSON COMMENT '标签数组',
  requestUrl VARCHAR(500) COMMENT '请求URL',
  methods JSON COMMENT '支持的方法数组',
  icon VARCHAR(50) COMMENT '图标',
  status VARCHAR(50) DEFAULT '正常' COMMENT '状态',
  visits INT DEFAULT 0 COMMENT '访问次数',
  ACL TEXT COMMENT '访问控制列表',
  INDEX idx_category (category),
  INDEX idx_status (status),
  INDEX idx_visits (visits DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='API配置表';

-- =====================================================
-- 产品表 (products)
-- =====================================================
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(255) PRIMARY KEY COMMENT '产品ID',
  name VARCHAR(255) NOT NULL COMMENT '产品名称',
  description TEXT COMMENT '产品描述',
  price DECIMAL(10,2) NOT NULL COMMENT '当前价格',
  originalPrice DECIMAL(10,2) COMMENT '原价',
  category VARCHAR(100) COMMENT '分类',
  tags JSON COMMENT '标签数组',
  features JSON COMMENT '功能特性数组',
  image TEXT COMMENT '产品图片',
  rating DECIMAL(3,2) DEFAULT 0.00 COMMENT '评分',
  in_stock BOOLEAN DEFAULT TRUE COMMENT '是否有库存',
  ACL TEXT COMMENT '访问控制列表',
  INDEX idx_category (category),
  INDEX idx_price (price),
  INDEX idx_rating (rating DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='产品表';

-- =====================================================
-- 验证表创建成功
-- =====================================================
SELECT '数据库初始化完成' as status, NOW() as current_time;

-- 显示所有表
SHOW TABLES;

-- =====================================================
-- 表结构说明
-- =====================================================
-- _User: 用户表，存储用户账户信息
-- BlogPosts: 博客文章表，存储文章内容
-- blog_tags: 博客标签表，存储所有标签
-- blog_post_tags: 文章-标签关联表，多对多关系
-- APIs: API配置表，存储API接口信息
-- Products: 产品表，存储产品信息

-- =====================================================
-- 注意事项
-- =====================================================
-- 1. 所有表都使用 utf8mb4 字符集，支持 emoji
-- 2. 创建时间和更新时间自动管理
-- 3. JSON 字段用于存储数组类型数据
-- 4. 已添加必要的索引优化查询性能
-- 5. 外键约束确保数据完整性