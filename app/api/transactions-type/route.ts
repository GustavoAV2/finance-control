import { NextRequest, NextResponse } from 'next/server';
import { getAllTransactionType } from '../../lib/database';

export async function GET(req: NextRequest) {
  try {
    var types: any[] = [];
    types = await getAllTransactionType();
    return NextResponse.json(types, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch transaction types' }, { status: 500 });
  }
}

