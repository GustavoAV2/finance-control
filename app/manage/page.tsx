import Header from "../components/Header";
import { getServerAuthSession } from "../auth";
import { redirect } from "next/navigation";
import DeleteButton from "../components/DeleteButton";

export default async function HistoryPage() {
  const authSession = await getServerAuthSession(); 

  if (!authSession?.user) {
    redirect("/login");
  }

  return (  
    <>
    <main className="h-screen">
        <div>
          <div>
            <Header user={authSession.user} />
          </div>
          
          <div className="flex justify-center w-full mt-28">
            <DeleteButton/>
          </div>
        </div>
    </main>
    </>
  );
}
