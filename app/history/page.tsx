import Link from "next/link";
import Header from "../components/Header";
import { getServerAuthSession } from "../auth";
import { fetchAllTransactions } from "../lib/fetch";
import { intToTransactionTypeEnum } from "../components/TransactionTypesEnum";

export default async function HistoryPage() {
  const authSession = await getServerAuthSession(); 

  let transactions: any[] = [];
  
  try {
    const result = await fetchAllTransactions();
    transactions = Array.isArray(result) ? result : [];
    console.log(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }

  return (  
    <>
    <main className="h-screen">
      {authSession?.user ? (
        <div>
          <div>
            <Header user={authSession.user} />
          </div>

          <div className="flex justify-center w-full ">
            <div id="transactions" className="flex-col mt-4">
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <div key={transaction.id} className="border p-4 mb-2 w-96 hover:border-teal-500">
                    <p><strong>Tipo:</strong> {intToTransactionTypeEnum(transaction.TypeId)}</p>
                    <p className="text-xl text-center"><strong>Valor: R$</strong> {transaction.Debt}</p>
                    <hr className="mb-1" />
                    <p><strong>Descrição:</strong> {transaction.Description}</p>
                    <p><strong>Data:</strong></p>
                  </div>
                ))
              ) : (
                <p>Nenhuma transação encontrada.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Link className="font-medium mt-2 text-blue-600 hover:underline" href="/login">
          Login
        </Link>
      )}
    </main>
    </>
  );
}
