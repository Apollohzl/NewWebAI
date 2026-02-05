import { NextRequest } from 'next/server';
import adsData from '@/config/ads.json';

export async function GET(request: NextRequest) {
  return Response.json(adsData);
}