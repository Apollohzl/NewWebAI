import { NextResponse } from 'next/server';
import apisData from '@/config/apis.json';

export async function GET() {
  try {
    return NextResponse.json(apisData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load API configuration' },
      { status: 500 }
    );
  }
}