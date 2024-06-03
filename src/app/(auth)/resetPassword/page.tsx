import React, { Suspense } from "react";
import ResetPwdForm from "../_components/resetPassword/ResetPwdForm";

const Page = () => {
  return (
    <div className="w-full max-w-md">
      <ResetPwdForm />
    </div>
  );
};


const LoginPageWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  );
};

export default LoginPageWithSuspense;

