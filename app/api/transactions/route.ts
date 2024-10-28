import { NextRequest, NextResponse } from 'next/server';
import { getAllTransactions, deleteAllTransactions, insertTransaction } from '../../lib/database';

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
    let types = await getAllTransactions();
    return NextResponse.json(types, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch transaction types' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await deleteAllTransactions();
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch transaction types' }, { status: 500 });
  }
}
