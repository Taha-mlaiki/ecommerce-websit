import React from "react";
import { TriangleAlert } from "lucide-react";
import { MailCheck } from 'lucide-react';
const FormSuccess = ({ success }: { success: string }) => {
  if (success) {
    return (
      <div className="px-3 py-3 bg-green-100 text-green-600 flex gap-2 items-center text-sm font-medium">
        <MailCheck />
        {success}
      </div>
    );
  }
  return null;
};

export default FormSuccess;
