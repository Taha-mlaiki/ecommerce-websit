
import { Button } from "@/components/ui/button";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import toast from "react-hot-toast";


const LoginProviders = () => {


  return (
    <div className="flex flex-col gap-3 w-full">
      <form
          action={async () => {
            "use server"
              await signIn("google")
          }}
      >
        <Button variant="outline"  className="gap-3 w-full">
          <FcGoogle size={23} />
          Continue With Google
        </Button>
      </form>
      <form
          action={async () => {
            "use server"
              await signIn("github")
          }}
      >
        <Button variant="outline"  className="gap-3 w-full">
          <FaGithub size={23} />
          Continue With Github
        </Button>
      </form>
    </div>
  );
};

export default LoginProviders;
