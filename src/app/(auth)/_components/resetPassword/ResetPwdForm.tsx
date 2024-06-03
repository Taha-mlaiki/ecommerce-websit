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
import React, { FormEvent, useState } from "react";
import FormError from "../../../../components/FormStatus/FormError";
import FormSuccess from "../../../../components/FormStatus/FormSuccess";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

const ResetPwdForm = () => {
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    if (newPwd === "" || newPwd !== confirmPwd) {
      setError("Password must Match");
      return;
    }
    try {
      const res = await axios.post("/api/resetPwd", {
        token,
        newPassword: newPwd,
      });
      setSuccess(res.data.success);
    } catch (error: any) {
      setError(error.response.data.error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center mb-10 text-2xl">
          Reset password 🔐
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-5">
            <div>
              <Label>New Password</Label>
              <Input
                disabled={loading}
                onChange={(e) => setNewPwd(e.target.value)}
                value={newPwd}
                name="newPassword"
                type="password"
                placeholder="* * * * *"
              />
            </div>
            <div>
              <Label>Confirm Password</Label>
              <Input
                disabled={loading}
                onChange={(e) => setConfirmPwd(e.target.value)}
                value={confirmPwd}
                name="confirmPassword"
                type="password"
                placeholder="* * * * *"
              />
            </div>
          </div>
          <div className="flex justify-end mt-3">
            <Button disabled={loading} className="gap-2">
              {loading && <Loader2 className=" animate-spin" />}
              {loading ? "loading..." : "Change Password"}
            </Button>
          </div>
        </form>
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

export default ResetPwdForm;
