"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import Image from "next/image"
import { GoogleIcon } from "@/components/svg/google"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import neo from "@/assets/logo.png";

export default function LoginPage() {
  const [pending, setPending] = useState(false)

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    setPending(true)
    if (process.env.URL_SERVER)  window.location.href = `${process.env.URL_SERVER}/auth/google`
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-black rounded-md flex items-center justify-center overflow-hidden">
            <Avatar style={{ width: 80, height: 80 }}>
              <AvatarImage
                src={`${neo.src}`}
                alt="@NEO"
                width={80}
                height={80}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Bem-vindo ao Neo</CardTitle>
          <CardDescription>Faça login para acessar sua plataforma de chat com IA</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleLogin}>
            <Button
              variant="outline"
              className="w-full flex items-center gap-2"
              type="submit"
              disabled={pending}
            >
              {pending ? (
                <div className="w-5 h-5 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
              ) : (
                <GoogleIcon />
              )}
              Fazer login com o Google
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center gap-2">
          <div className="text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
            Ao clicar em continuar, você concorda com nossos{" "}
            <a href="#">Termos de Serviço</a> e <a href="#">Política de Privacidade</a>.
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
