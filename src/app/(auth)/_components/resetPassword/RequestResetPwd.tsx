"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FormEvent, useState } from "react";
import FormError from "../../../../components/FormStatus/FormError";
import FormSuccess from "../../../../components/FormStatus/FormSuccess";
import { Loader2 } from "lucide-react";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

const RequestResetPwd = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setSuccess("");
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("/api/requestResetPwd", {
        ...data,
      });
      setSuccess(res.data.success);
    } catch (error: any) {
      setError(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center mb-10 text-2xl">
          Forgot password 🔐
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
            <Button disabled={loading} className="gap-2 w-full mt-4">
              {loading && <Loader2 className=" animate-spin" />}
              {loading ? "loading..." : "Send reset email"}
            </Button>
          </form>
        </Form>
        <CardFooter className="flex flex-col gap-4 w-full mt-10">
          <FormError error={error} />
          <FormSuccess success={success} />
          <Link
            className="font-bold text-sm mx-auto hover:underline"
            href="/login"
          >
            Back to login page
          </Link>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default RequestResetPwd;
