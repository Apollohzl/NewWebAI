import { NextRequest } from 'next/server';
import { products } from '../../../lib/products'; // 引入现有的产品数据

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';
  const minPrice = parseFloat(searchParams.get('minPrice') || '0');
  const maxPrice = parseFloat(searchParams.get('maxPrice') || '999999');
  
  // 过滤产品
  let filteredProducts = [...products];
  
  if (category) {
    filteredProducts = filteredProducts.filter(product => 
      product.category.toLowerCase().includes(category.toLowerCase())
    );
  }
  
  if (search) {
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(search.toLowerCase()) || 
      product.description.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  // 价格范围过滤
  filteredProducts = filteredProducts.filter(product => 
    product.price >= minPrice && product.price <= maxPrice
  );
  
  // 排序选项
  const sort = searchParams.get('sort') || 'id';
  if (sort === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sort === 'name') {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    // 默认按ID排序
    filteredProducts.sort((a, b) => a.id - b.id);
  }
  
  // 分页
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  return Response.json({
    products: paginatedProducts,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(filteredProducts.length / limit),
      totalProducts: filteredProducts.length,
      hasNextPage: endIndex < filteredProducts.length,
      hasPrevPage: startIndex > 0
    },
    filters: {
      category,
      search,
      minPrice,
      maxPrice,
      sort
    },
    api: 'products',
    version: '1.0.0'
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 验证必需字段
    if (!body.name || body.price === undefined) {
      return Response.json({
        error: 'Missing required fields',
        message: '产品名称和价格是必需的'
      }, { status: 400 });
    }
    
    // 创建新产品
    const newProduct = {
      id: Math.max(...products.map(p => p.id), 0) + 1,
      name: body.name,
      description: body.description || '',
      price: parseFloat(body.price),
      originalPrice: parseFloat(body.originalPrice) || parseFloat(body.price),
      category: body.category || 'general',
      rating: body.rating || 0,
      tags: body.tags || [],
      inStock: body.inStock !== undefined ? body.inStock : true,
      image: body.image || '/placeholder-product.jpg',
      features: body.features || []
    };
    
    // 在实际应用中，这里会保存到数据库
    console.log('Adding new product:', newProduct);
    
    return Response.json({
      message: '产品创建成功',
      product: newProduct,
      api: 'products',
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
    const id = body.id;
    
    if (!id) {
      return Response.json({
        error: 'Product ID is required',
        message: '产品ID是必需的'
      }, { status: 400 });
    }
    
    const productIndex = products.findIndex(product => product.id === parseInt(id));
    
    if (productIndex === -1) {
      return Response.json({
        error: 'Product not found',
        message: '未找到指定产品'
      }, { status: 404 });
    }
    
    // 更新产品信息
    const updatedProduct = {
      ...products[productIndex],
      ...body,
      id: parseInt(id) // 确保ID不变
    };
    
    console.log('Updating product:', updatedProduct);
    
    return Response.json({
      message: '产品更新成功',
      product: updatedProduct,
      api: 'products',
      version: '1.0.0'
    });
  } catch (error) {
    return Response.json({
      error: 'Invalid JSON',
      message: '请求体格式不正确'
    }, { status: 400 });
  }
}