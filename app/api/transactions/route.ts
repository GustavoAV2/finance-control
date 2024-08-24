import { NextRequest, NextResponse } from 'next/server';
import { insertTransaction, getAllTransactionTypes } from '../../lib/database';

export async function POST(req: NextRequest) {
  try {
    const { description, value, debt, typeId } = await req.json();
    await insertTransaction(description, value, debt, typeId);
    return NextResponse.json({ message: 'Transaction added successfully' }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to add transaction' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const types = await getAllTransactionTypes();
    return NextResponse.json(types, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch transaction types' }, { status: 500 });
  }
}
