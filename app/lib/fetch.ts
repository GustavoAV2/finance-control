interface Transaction {
  Id: number;
  Description: string;
  Debt: number;
  TypeId: number;
}

export async function fetchTransactionByType(typeId: number) {
  try {
    // Construindo a URL absoluta
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const url = `${baseUrl}/api/transactions-by-type?typeId=${typeId}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch transactions: ${response.status} - ${response.statusText}`);
      return 0; // Retorna 0 em caso de erro
    }

    const data: Transaction[] = await response.json();
    const debtsArray = data.map(x => x.Debt);
    const debts = debtsArray.reduce((sum, current) => sum + current, 0); // Somatório correto
    console.log(`Total debts for type ${typeId}:`, debts);
    return debts;
  } catch (error) {
    console.error('Error fetching data:', error);
    return 0; // Retorna 0 em caso de erro
  }
}

export async function fetchAllTransactions() {
  try {
    // Construindo a URL absoluta
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const url = `${baseUrl}/api/transactions`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch transactions: ${response.status} - ${response.statusText}`);
      return 0; // Retorna 0 em caso de erro
    }

    const data: Transaction[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return 0; // Retorna 0 em caso de erro
  }
}

export async function deleteAllTransactions() {
  try {
    // Construindo a URL absoluta
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const url = `${baseUrl}/api/transactions`;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch transactions: ${response.status} - ${response.statusText}`);
      return 0;
    }
    return 1;
  } catch (error) {
    console.error('Error fetching data:', error);
    return 0;
  }
}
