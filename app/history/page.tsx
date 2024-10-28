import { redirect } from "next/navigation";
import { getServerAuthSession } from "../auth";
import Header from "../components/Header";
import HistoryComponent from "../components/HistoryComponent";
import { fetchAllTransactions } from "../lib/fetch";

export default async function HistoryPage() {
  const authSession = await getServerAuthSession();

  if (!authSession?.user) {
    redirect("/login");
  }

  let transactions: any[] = [];

  try {
    const result = await fetchAllTransactions();
    transactions = Array.isArray(result) ? result : [];
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }

  return (
    <main className="h-screen">
      <Header user={authSession.user} />
      <HistoryComponent transactions={transactions} />
    </main>
  );
}
