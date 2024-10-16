import { NextRequest, NextResponse } from 'next/server';
import { getAllTransactions, deleteAllTransactions } from '../../lib/database';

export async function GET(req: NextRequest) {
  try {
    let types = await getAllTransactions();
    return NextResponse.json(types, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch transaction types' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await deleteAllTransactions();
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch transaction types' }, { status: 500 });
  }
}
