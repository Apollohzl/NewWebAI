import { NextRequest } from 'next/server';
import { products } from '../../../lib/products'; // 引入产品数据

// 模拟购物车数据结构
interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

// 使用Map来模拟用户购物车存储（在实际应用中，这会存储在数据库中）
const userCarts = new Map<string, CartItem[]>();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId') || 'default';
  
  // 获取用户购物车
  let cartItems = userCarts.get(userId) || [];
  
  // 如果没有商品，返回空购物车
  if (cartItems.length === 0) {
    return Response.json({
      items: [],
      totalItems: 0,
      totalAmount: 0,
      userId,
      api: 'cart',
      version: '1.0.0'
    });
  }
  
  // 计算总数和总金额
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return Response.json({
    items: cartItems,
    totalItems,
    totalAmount,
    userId,
    api: 'cart',
    version: '1.0.0'
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userId = body.userId || 'default';
    const productId = body.productId;
    const quantity = body.quantity || 1;
    
    if (!productId) {
      return Response.json({
        error: 'Product ID is required',
        message: '产品ID是必需的'
      }, { status: 400 });
    }
    
    // 查找产品
    const product = products.find(p => p.id === parseInt(productId));
    if (!product) {
      return Response.json({
        error: 'Product not found',
        message: '未找到指定产品'
      }, { status: 404 });
    }
    
    // 获取用户购物车
    let cartItems = userCarts.get(userId) || [];
    
    // 检查产品是否已在购物车中
    const existingItemIndex = cartItems.findIndex(item => item.productId === parseInt(productId));
    
    if (existingItemIndex !== -1) {
      // 如果产品已在购物车中，更新数量
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      // 如果产品不在购物车中，添加新产品
      const newItem: CartItem = {
        id: Date.now(), // 简单的唯一ID生成
        productId: parseInt(productId),
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image
      };
      cartItems.push(newItem);
    }
    
    // 保存购物车
    userCarts.set(userId, cartItems);
    
    // 计算总数和总金额
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    return Response.json({
      message: '商品已添加到购物车',
      item: cartItems.find(item => item.productId === parseInt(productId)),
      items: cartItems,
      totalItems,
      totalAmount,
      userId,
      api: 'cart',
      version: '1.0.0'
    });
  } catch (error) {
    return Response.json({
      error: 'Invalid JSON',
      message: '请求体格式不正确'
    }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const userId = body.userId || 'default';
    const itemId = body.itemId;
    const quantity = body.quantity;
    
    if (itemId === undefined) {
      return Response.json({
        error: 'Item ID is required',
        message: '购物车项目ID是必需的'
      }, { status: 400 });
    }
    
    if (quantity === undefined) {
      return Response.json({
        error: 'Quantity is required',
        message: '数量是必需的'
      }, { status: 400 });
    }
    
    // 获取用户购物车
    let cartItems = userCarts.get(userId) || [];
    
    // 查找并更新项目
    const itemIndex = cartItems.findIndex(item => item.id === parseInt(itemId));
    if (itemIndex === -1) {
      return Response.json({
        error: 'Item not found in cart',
        message: '购物车中未找到指定项目'
      }, { status: 404 });
    }
    
    if (quantity <= 0) {
      // 如果数量小于等于0，删除项目
      cartItems.splice(itemIndex, 1);
    } else {
      // 更新数量
      cartItems[itemIndex].quantity = quantity;
    }
    
    // 保存购物车
    userCarts.set(userId, cartItems);
    
    // 计算总数和总金额
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    return Response.json({
      message: quantity <= 0 ? '商品已从购物车中移除' : '购物车项目已更新',
      items: cartItems,
      totalItems,
      totalAmount,
      userId,
      api: 'cart',
      version: '1.0.0'
    });
  } catch (error) {
    return Response.json({
      error: 'Invalid JSON',
      message: '请求体格式不正确'
    }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId') || 'default';
    const itemId = searchParams.get('itemId');
    
    if (!itemId) {
      return Response.json({
        error: 'Item ID is required',
        message: '购物车项目ID是必需的'
      }, { status: 400 });
    }
    
    // 获取用户购物车
    let cartItems = userCarts.get(userId) || [];
    
    // 查找并删除项目
    const itemIndex = cartItems.findIndex(item => item.id === parseInt(itemId));
    if (itemIndex === -1) {
      return Response.json({
        error: 'Item not found in cart',
        message: '购物车中未找到指定项目'
      }, { status: 404 });
    }
    
    cartItems.splice(itemIndex, 1);
    
    // 保存购物车
    userCarts.set(userId, cartItems);
    
    // 计算总数和总金额
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    return Response.json({
      message: '商品已从购物车中移除',
      items: cartItems,
      totalItems,
      totalAmount,
      userId,
      api: 'cart',
      version: '1.0.0'
    });
  } catch (error) {
    return Response.json({
      error: 'Error processing request',
      message: '处理请求时出错'
    }, { status: 500 });
  }
}

// 清空购物车的额外端点
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const userId = body.userId || 'default';
    const action = body.action; // 'clear' to clear cart
    
    if (action === 'clear') {
      userCarts.set(userId, []);
      
      return Response.json({
        message: '购物车已清空',
        items: [],
        totalItems: 0,
        totalAmount: 0,
        userId,
        api: 'cart',
        version: '1.0.0'
      });
    } else {
      return Response.json({
        error: 'Invalid action',
        message: '无效的操作，使用 action: "clear" 来清空购物车'
      }, { status: 400 });
    }
  } catch (error) {
    return Response.json({
      error: 'Invalid JSON',
      message: '请求体格式不正确'
    }, { status: 400 });
  }
}