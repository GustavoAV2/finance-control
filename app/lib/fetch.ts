interface Transaction {
    Id: number;
    Description: string;
    Debt: number;
    TypeId: number;
  }
  
  export async function fetchData(typeId: number) {
    try {
      const response = await fetch(`/api/transactions?typeId=${typeId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
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
  