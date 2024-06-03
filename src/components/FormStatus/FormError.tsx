import React from "react";
import { TriangleAlert } from "lucide-react";

const FormError = ({ error }: { error: string }) => {
  if (error) {
    return (
      <div className="px-3 py-3 bg-red-100 text-red-600 flex gap-2 items-center text-sm font-medium">
        <TriangleAlert />
        {error}
      </div>
    );
  }
  return null;
};

export default FormError;
