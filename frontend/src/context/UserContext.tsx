"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../app/types";

type UserContextType = {
  user: User | null;
  handleLogin: () => Promise<void>
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const USER_STORAGE_KEY = "ecommerce_cart_user";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<User | null>(null);

  const handleLogin = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_PROD}/api/users`, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const dataFromLogin = await response.json() as User;
    console.log(dataFromLogin);

    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(dataFromLogin));
    setUserData(dataFromLogin);
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUserId) {
      setUserData(JSON.parse(storedUserId));
    }
  }, []);
  
  return (
    <UserContext.Provider
      value={{
        user: userData,
        handleLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
