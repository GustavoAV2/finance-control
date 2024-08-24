
"use client";

import { User } from "../types/user";
import { signOut } from "next-auth/react";

type UserInfoProps = {
  user: User;
}

export default function UserInfo({ user }: UserInfoProps) {
  const handleLogout = async () => {
    await signOut();
  }

  return(
   <div className=" flex justify-between rounded-lg border shadow-lg p-3">
      <div>
        Name : {user.name}
      </div>
      <button className="font-medium  text-blue-600 hover:underline" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}