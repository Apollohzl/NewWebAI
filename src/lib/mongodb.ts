// =====================================================
// SQLPub 数据库连接 (替换 MongoDB)
// 保持文件名以保持向后兼容性
// =====================================================

import { getConnection, query, testConnection } from './sql';

// 为了保持向后兼容性，导出相同的功能
export async function connectToDatabase() {
  try {
    // 返回连接对象，保持与 MongoDB 类似的接口
    const connection = await getConnection();
    
    // 创建一个兼容的对象，使其具有类似 MongoDB 的接口
    return {
      collection: (collectionName: string) => ({
        find: (query: any = {}) => ({
          sort: (sortObj: any) => ({
            skip: (num: number) => ({
              limit: (limit: number) => ({
                toArray: async () => {
                  // 将 MongoDB 查询转换为 SQL 查询
                  let sql = `SELECT * FROM ${collectionName}`;
                  const params: any[] = [];
                  
                  // 添加条件
                  if (Object.keys(query).length > 0) {
                    const conditions = Object.entries(query).map(([key, value]) => {
                      params.push(value);
                      return `${key} = ?`;
                    });
                    sql += ' WHERE ' + conditions.join(' AND ');
                  }
                  
                  // 添加排序
                  if (Object.keys(sortObj).length > 0) {
                    const orderBy = Object.entries(sortObj).map(([key, order]) => {
                      return `${key} ${order === -1 ? 'DESC' : 'ASC'}`;
                    });
                    sql += ' ORDER BY ' + orderBy.join(', ');
                  }
                  
                  // 添加分页
                  sql += ' LIMIT ?';
                  params.push(limit);
                  
                  const results = await query(sql, params);
                  return results;
                }
              })
            })
          })
        }),
        findOne: async (query: any) => {
          let sql = `SELECT * FROM ${collectionName}`;
          const params: any[] = [];
          
          if (Object.keys(query).length > 0) {
            const conditions = Object.entries(query).map(([key, value]) => {
              if (typeof value === 'object' && value !== null) {
                // 处理复杂查询
                return `${key} = ?`;
              }
              params.push(value);
              return `${key} = ?`;
            });
            sql += ' WHERE ' + conditions.join(' AND ');
          }
          
          sql += ' LIMIT 1';
          
          const results = await query(sql, params);
          return results.length > 0 ? results[0] : null;
        },
        insertOne: async (doc: any) => {
          const now = new Date();
          const fields = Object.keys(doc).filter(k => k !== '_id');
          const values = fields.map(f => doc[f]);
          const placeholders = fields.map(() => '?');
          
          const sql = `INSERT INTO ${collectionName} (${fields.join(', ')}) VALUES (${placeholders.join(', ')})`;
          await query(sql, values);
          
          return {
            insertedId: doc.id || Date.now().toString(),
            acknowledged: true
          };
        },
        updateOne: async (query: any, update: any) => {
          const now = new Date();
          let sql = `UPDATE ${collectionName} SET`;
          const params: any[] = [];
          
          if (update.$set) {
            const sets = Object.entries(update.$set).map(([key, value]) => {
              params.push(value);
              return `${key} = ?`;
            });
            sql += ' ' + sets.join(', ');
          }
          
          sql += ' WHERE ';
          const conditions = Object.entries(query).map(([key, value]) => {
            params.push(value);
            return `${key} = ?`;
          });
          sql += conditions.join(' AND ');
          
          await query(sql, params);
          return { acknowledged: true, modifiedCount: 1 };
        },
        deleteOne: async (query: any) => {
          let sql = `DELETE FROM ${collectionName} WHERE`;
          const params: any[] = [];
          
          const conditions = Object.entries(query).map(([key, value]) => {
            if (Array.isArray(value)) {
              // 处理 $or 查询
              params.push(...value);
              return `${key} IN (${value.map(() => '?').join(', ')})`;
            }
            params.push(value);
            return `${key} = ?`;
          });
          sql += ' ' + conditions.join(' OR ');
          
          const results = await query(sql, params) as any;
          return { acknowledged: true, deletedCount: results.affectedCount };
        },
        countDocuments: async (query: any = {}) => {
          let sql = `SELECT COUNT(*) as count FROM ${collectionName}`;
          const params: any[] = [];
          
          if (Object.keys(query).length > 0) {
            const conditions = Object.entries(query).map(([key, value]) => {
              if (typeof value === 'object' && value !== null) {
                // 处理复杂查询
                if (value.$gte || value.$lt) {
                  params.push(value.$gte?.iso || value.$gte);
                  return `${key} >= ?`;
                }
                return `${key} = ?`;
              }
              params.push(value);
              return `${key} = ?`;
            });
            sql += ' WHERE ' + conditions.join(' AND ');
          }
          
          const results = await query(sql, params);
          return results[0]?.count || 0;
        }
      })
    };
  } catch (error) {
    console.error('数据库连接失败:', error);
    throw new Error(`数据库连接需要SQL_HOST环境变量。请在.env.local文件中设置此变量。`);
  }
}

// 导出连接和查询函数
export { getConnection, query, testConnection };