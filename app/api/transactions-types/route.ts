import { NextRequest, NextResponse } from 'next/server';
import { insertTransaction, getTransactionsByType } from '../../lib/database';

export async function POST(req: NextRequest) {
  try {
    const { description, debt, typeId } = await req.json();
    await insertTransaction(description, debt, typeId);
    return NextResponse.json({ message: 'Transaction added successfully' }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to add transaction' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    var typeId = req.nextUrl.searchParams.get('typeId');
    var types = [];
    if (typeId) {
      types = await getTransactionsByType(typeId);
    }
    return NextResponse.json(types, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch transaction types' }, { status: 500 });
  }
}
