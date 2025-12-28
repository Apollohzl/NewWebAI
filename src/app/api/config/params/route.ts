import { NextRequest, NextResponse } from 'next/server';
import paramsData from '@/config/apiParams.json';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const apiId = searchParams.get('api');
  
  try {
    if (apiId && paramsData[apiId as keyof typeof paramsData]) {
      return NextResponse.json(paramsData[apiId as keyof typeof paramsData]);
    }
    return NextResponse.json(paramsData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load API parameters configuration' },
      { status: 500 }
    );
  }
}