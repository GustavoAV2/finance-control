import Link from "next/link";
import Header from "../components/Header";
import { getServerAuthSession } from "../auth";
import { deleteAllTransactions } from "../lib/fetch";

export default async function HistoryPage() {
  const authSession = await getServerAuthSession(); 

  const deleteTransactions = async () => {
    await deleteAllTransactions();
    alert("Todas os registros foram deletados!");
  }

  return (  
    <>
    <main className="h-screen">
      {authSession?.user ? (
        <div>
          <div>
            <Header user={authSession.user} />
          </div>
          
          <div className="flex justify-center w-full mt-28">
            <button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-7 px-16 border border-red-500 hover:border-transparent rounded">
                LIMPAR HISTORICO
            </button>
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
