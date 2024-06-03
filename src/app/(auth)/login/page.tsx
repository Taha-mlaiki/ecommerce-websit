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


const page = () => {
  return (
    <div className=" w-full max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold mb-7">Login🔐</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex-col gap-3">
          <LoginProviders/>
          <Link href="/register" className="text-sm font-semibld hover:underline">Don't have an account ?</Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default page
