import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import LoginForm from "../_components/LoginForm"
import LoginProviders from "../_components/LoginProviders"
import Link from "next/link"
import { Suspense } from "react"


const Page = () => {
  return (
    <div className=" w-full  max-w-md mx-auto">
      <Card className="border-none sm:border shadow-none sm:shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold mb-7">Login🔐</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex-col gap-3">
          <LoginProviders/>
          <Link href="/register" className="text-sm font-semibld hover:underline">Don&apos;t have an account ?</Link>
        </CardFooter>
      </Card>
    </div>
  )
}

const LoginPageWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  );
};

export default LoginPageWithSuspense;
