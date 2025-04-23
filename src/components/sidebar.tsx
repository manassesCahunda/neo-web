'use client';

import { MessageSquare, Database , Bot } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import Link from "next/link";
import neo from "@/assets/logo.png";


export default function Sidebar({ avatar }:{avatar:string} ) {
  return (
    <div className="w-16 bg-white border-r border-gray-200 h-full flex flex-col items-center">
      <div className="p-3 border-b border-gray-200 w-full flex justify-center">
        <div className="w-10 h-10 bg-black rounded-md flex items-center justify-center overflow-hidden">
         <Avatar style={{ width: 40, height: 40 }}>
            <AvatarImage
              src={`${neo.src}`}
              alt="@NEO"
              width={40}
              height={40}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <nav className="flex-1 py-6 w-full">
        <ul className="space-y-6 flex flex-col items-center">
          <li className="group relative">
            <Link href="/chat" className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100">
              <MessageSquare size={22} />
              <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                Bate papo
              </span>
            </Link>
          </li>
          <li className="group relative">
            <Link href="/schedules" className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100">
              <Database size={22} />
              <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                Agendamentos
              </span>
            </Link>
          </li>
          <li className="group relative">
            <Link href="/form" className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100">
              <Bot size={22} />
              <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                configurações de IA
              </span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-3 border-t border-gray-200 w-full flex justify-center">
        <div className="group relative">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
          <div style={{ width: 40, height: 40, position: "relative" }}>
          <Avatar style={{ width: 40, height: 40 }}>
            <AvatarImage
              src={avatar}
              alt="@NEO"
              width={40}
              height={40}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          </div>
          </div>
          <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
            Profile
          </span>
        </div>
      </div>
    </div>
  );
}
