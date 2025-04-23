'use client';

import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import { sessionStore } from "@/lib/session";
import { cookies } from "@/lib/cookie";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ avatar: string }>({ avatar: "" });

  useEffect(() => {
    const fetchUser = async () => {
      const tokenCookie = cookies["token"];
      const session = await sessionStore({ tokenCookie });
      setUser(session || { avatar: "" });
    };

    fetchUser();
  }, []);

  return (
    <>
      <Sidebar avatar={user.avatar} />
      <div className="flex-1">{children}</div>
    </>
  );
}
