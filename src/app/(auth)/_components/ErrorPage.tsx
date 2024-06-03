"use client"

import {Card , CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const ErrorPage = () => {
  return (
        <Card className="p-5">
            <CardHeader>
                <CardTitle className="text-center text-red-500 text-2xl">
                    Oops! Somthing Went Wrong
                </CardTitle>
            </CardHeader>
            <CardContent  className="text-center text-xs text-slate-700">
                this error usually appears when you have Already
                signed in with the same email.
                Try  signin with different methode
            </CardContent>
            <CardFooter className="text-center">
                <Link className="font-bold hover:underline mx-auto" href="/login">Back To Login Page</Link>
            </CardFooter>
        </Card>
  )
}

export default ErrorPage
