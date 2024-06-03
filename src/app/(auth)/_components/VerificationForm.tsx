"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import FormError from "@/components/FormStatus/FormError";
import FormSuccess from "@/components/FormStatus/FormSuccess";
import Link from "next/link";

const VerificationForm = () => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    (async () => {
      if (!token) {
        setError("Missing Token");
        return;
      }
      try {
        const res = await axios.post("/api/emailVerification", {
          token,
        });
        setSuccess(res.data.success);
      } catch (error: any) {
        setError(error.response.data.error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="py-4 flex items-center flex-col gap-5 justify-center">
      <BeatLoader size={30} loading={loading} color="black" />
      <FormError error={error} />
      <FormSuccess success={success} />
      {!loading && (
        <Link className="text-sm hover:underline font-semibold" href="/login">
          Back To Login Page
        </Link>
      )}
    </div>
  );
};

export default VerificationForm;
