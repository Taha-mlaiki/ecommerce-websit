import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import RegisterForm from "../_components/RegisterForm"
import LoginProviders from "../_components/LoginProviders"
import Link from "next/link"


const page = () => {
  return (
    <div className="max-w-md w-full mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold mb-10">Register🔐</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter className="flex-col gap-3">
          <LoginProviders />
          <Link href="/login" className="text-sm font-semibld hover:underline">Already have an account ?</Link>
        </CardFooter>
      </Card>
    </div>
  )
}
export default page
