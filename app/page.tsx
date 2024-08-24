
import Chart from './components/Chart';
import CompleteChart from './components/CompleteChart';
import Wallet from './components/Wallet';
import UserInfo from "./components/UserInfo";
import TButton from "./components/TransactionButton";
import { getServerAuthSession } from "./auth";
import Link from "next/link";

export default async function HomePage() {
  const authSession = await getServerAuthSession(); 
  console.log(authSession);
  return (  
  <main className="flex h-screen">
    {
      authSession?.user && (
        <div className="flex-col">
          <div>
            <UserInfo user={authSession?.user} />
            <div className='flex justify-between'>
              <Wallet className="ml-2 mt-1" />
              <div className="mt-1 mr-1">
                <TButton/>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <CompleteChart foodDebt={400} healthDebt={200} leisureDebt={200} studyDebt={300} transportDebt={500}/>
          </div>

          <div className="flex flex-wrap">
            <Chart title="Food" totalValue={600} debts={300} />
            <Chart title="Leisure" totalValue={1000} debts={300} />
            <Chart title="Transport" totalValue={500} debts={400} />
            <Chart title="Study" totalValue={1000} debts={700} />
            <Chart title="Health" totalValue={400} debts={390} />
          </div>
        </div>
      )
    } 
    {!authSession?.user && ( 
      <Link className="font-medium mt-2 text-blue-600 hover:underline" href="/login">
        Login
      </Link>
    )}
  </main>
  );
}