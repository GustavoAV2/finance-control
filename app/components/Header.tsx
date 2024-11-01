
"use client";

import { User } from "../types/user";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

type UserInfoProps = {
  user: User;
}

export default function Header({ user }: UserInfoProps) {
  const router = useRouter();

  const goToHistory = () => {
    return router.push('/history'); 
  }
  const goToHome = () => {
    return router.push('/'); 
  }
  const goToManage = () => {
    return router.push('/manage'); 
  }

  const handleLogout = async () => {
    await signOut();
  }

  return(
   <div className=" flex justify-between rounded-lg border shadow-lg p-3">
      <div className="md:flex hidden">
        Name : {user.name}
      </div>

      <div className="font-medium cursor-pointer text-blue-600 hover:underline" onClick={goToHome}>
        Graficos
      </div>

      <div className="font-medium cursor-pointer text-blue-600 hover:underline" onClick={goToHistory}>
        Historico
      </div>
      
      <div className="font-medium cursor-pointer text-blue-600 hover:underline" onClick={goToManage}>
        Manage
      </div>
      
      <button className="font-medium text-red-600 hover:underline" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}