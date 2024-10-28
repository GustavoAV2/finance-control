import { NextRequest, NextResponse } from 'next/server';
import { getTransactionsByType } from '../../lib/database';

export async function GET(req: NextRequest) {
  try {
    var typeId = req.nextUrl.searchParams.get('typeId');
    var types: any[] = [];
    if (typeId) {
      types = await getTransactionsByType(typeId);
    }
    return NextResponse.json(types, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch transaction types' }, { status: 500 });
  }
}

