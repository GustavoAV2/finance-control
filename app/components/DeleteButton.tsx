
"use client";
import { User } from "../types/user";
import { useRouter } from "next/navigation";
import { deleteAllTransactions } from "../lib/fetch";

export default function Header() {

    const deleteTransactions = async () => {
        await deleteAllTransactions();
        alert("Todas os registros foram deletados!");
    }

    return(
        <div>
            <button onClick={deleteTransactions} 
                className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-7 px-16 border border-red-500 hover:border-transparent rounded">
                LIMPAR HISTORICO
            </button>
        </div>
    );
}