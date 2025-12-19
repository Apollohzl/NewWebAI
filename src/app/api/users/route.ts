import { NextRequest } from 'next/server';

// 模拟用户数据
const mockUsers = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: 'admin', createdAt: '2023-01-15' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: 'user', createdAt: '2023-02-20' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: 'user', createdAt: '2023-03-10' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: 'moderator', createdAt: '2023-04-05' },
  { id: 5, name: '钱七', email: 'qianqi@example.com', role: 'user', createdAt: '2023-05-12' },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const role = searchParams.get('role') || '';
  const search = searchParams.get('search') || '';
  
  // 过滤用户
  let filteredUsers = [...mockUsers];
  
  if (role) {
    filteredUsers = filteredUsers.filter(user => user.role === role);
  }
  
  if (search) {
    filteredUsers = filteredUsers.filter(user => 
      user.name.toLowerCase().includes(search.toLowerCase()) || 
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  // 分页
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
  
  return Response.json({
    users: paginatedUsers,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(filteredUsers.length / limit),
      totalUsers: filteredUsers.length,
      hasNextPage: endIndex < filteredUsers.length,
      hasPrevPage: startIndex > 0
    },
    filters: {
      role,
      search
    },
    api: 'users',
    version: '1.0.0'
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 验证必需字段
    if (!body.name || !body.email) {
      return Response.json({
        error: 'Missing required fields',
        message: '姓名和邮箱是必需的'
      }, { status: 400 });
    }
    
    // 创建新用户
    const newUser = {
      id: mockUsers.length + 1,
      name: body.name,
      email: body.email,
      role: body.role || 'user',
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    // 在实际应用中，这里会保存到数据库
    // 模拟添加到数组
    console.log('Adding new user:', newUser);
    
    return Response.json({
      message: '用户创建成功',
      user: newUser,
      api: 'users',
      version: '1.0.0'
    });
  } catch (error) {
    return Response.json({
      error: 'Invalid JSON',
      message: '请求体格式不正确'
    }, { status: 400 });
  }
}

// 获取特定用户
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const id = body.id;
    
    if (!id) {
      return Response.json({
        error: 'User ID is required',
        message: '用户ID是必需的'
      }, { status: 400 });
    }
    
    const userIndex = mockUsers.findIndex(user => user.id === parseInt(id));
    
    if (userIndex === -1) {
      return Response.json({
        error: 'User not found',
        message: '未找到指定用户'
      }, { status: 404 });
    }
    
    // 更新用户信息
    const updatedUser = {
      ...mockUsers[userIndex],
      ...body,
      id: parseInt(id) // 确保ID不变
    };
    
    console.log('Updating user:', updatedUser);
    
    return Response.json({
      message: '用户更新成功',
      user: updatedUser,
      api: 'users',
      version: '1.0.0'
    });
  } catch (error) {
    return Response.json({
      error: 'Invalid JSON',
      message: '请求体格式不正确'
    }, { status: 400 });
  }
}