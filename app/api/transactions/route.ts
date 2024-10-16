import { NextRequest, NextResponse } from 'next/server';
import { getAllTransactionTypes } from '../../lib/database';

export async function GET(req: NextRequest) {
  try {
    let types = await getAllTransactionTypes();
    return NextResponse.json(types, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch transaction types' }, { status: 500 });
  }
}
