import {Card , CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import VerificationForm from "../_components/VerificationForm"


const page = () => {
  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-slate-700">Confirming your Verification</CardTitle>
        </CardHeader>
        <CardContent>
          <VerificationForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default page
