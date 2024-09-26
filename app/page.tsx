import { getServerAuthSession } from "./auth";
import { TransactionTypeEnum } from "./components/TransactionTypesEnum";
import UserInfo from "./components/UserInfo";
import TButton from "./components/TransactionButton";
import Wallet from "./components/Wallet";
import { fetchData } from "./lib/fetch";
import CompleteChart from "./components/CompleteChart";
import Chart from "./components/Chart";
import Link from "next/link";

export default async function HomePage() {
  const authSession = await getServerAuthSession(); 
  let foodDebt = 0;
  let leisureDebt = 0;
  let transportDebt = 0;
  let studyDebt = 0;
  let healthDebt = 0;

  // Execute as chamadas em paralelo
  try {
    const [food, leisure, transport, study, health] = await Promise.all([
      fetchData(parseInt(TransactionTypeEnum.Food)),
      fetchData(parseInt(TransactionTypeEnum.Leisure)),
      fetchData(parseInt(TransactionTypeEnum.Transport)),
      fetchData(parseInt(TransactionTypeEnum.Study)),
      fetchData(parseInt(TransactionTypeEnum.Health))
    ]);

    // Atribua os resultados e garanta valores válidos
    foodDebt = food ?? 0;
    leisureDebt = leisure ?? 0;
    transportDebt = transport ?? 0;
    studyDebt = study ?? 0;
    healthDebt = health ?? 0;
  } catch (error) {
    console.error("Error fetching debts:", error);
  }

  console.log(authSession);
  return (  
    <main className="flex h-screen">
      {authSession?.user ? (
        <div className="flex-col">
          <div>
            <UserInfo user={authSession.user} />
            <div className='flex justify-between'>
              <Wallet className="ml-2 mt-1" />
              <div className="mt-1 mr-1">
                <TButton/>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <CompleteChart 
              foodDebt={foodDebt} 
              leisureDebt={leisureDebt} 
              transportDebt={transportDebt} 
              studyDebt={studyDebt}
              healthDebt={healthDebt}
            />
          </div>

          <div className="flex flex-wrap">
            <Chart title='Food' debt={foodDebt} total={1500} />
            <Chart title='Leisure' debt={leisureDebt} total={1500} />
            <Chart title='Transport' debt={transportDebt} total={1500} />
            <Chart title='Study' debt={studyDebt} total={1500} />
            <Chart title='Health' debt={healthDebt} total={1500} />
          </div>
        </div>
      ) : (
        <Link className="font-medium mt-2 text-blue-600 hover:underline" href="/login">
          Login
        </Link>
      )}
    </main>
  );
}
