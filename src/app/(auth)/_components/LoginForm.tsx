"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import FormError from "@/components/FormStatus/FormError";
import FormSuccess from "@/components/FormStatus/FormSuccess";
import Link from "next/link";
const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(5, {
    message: "Password must at least contains 5 charachter",
  }),
});

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email Already in use With different Provider!"
      : "";
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setSuccess("");
    setError("");
    try {
      setLoading(true);
      const res = await axios.post("/api/login", data);
      if (res.status === 201) {
        setSuccess(res.data.success);
      } else if (res.status === 200) {
        toast.success(res.data.success);
        router.push("/");
      }
    } catch (error: any) {
      if (error.response) setError(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    type="email"
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="* * * * *"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            size="sm"
            type="button"
            variant="link"
            className="w-fit p-0 -my-3 underline"
            asChild
          >
            <Link href="/requestResetPwd">Forgot Password ?</Link>
          </Button>
          <FormError error={error || urlError} />
          <FormSuccess success={success} />
          <Button disabled={loading} className="gap-3">
            {loading && <Loader2 size={20} className=" animate-spin" />}
            {loading ? "Loading..." : "Login"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
