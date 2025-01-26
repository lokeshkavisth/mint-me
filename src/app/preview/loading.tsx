import { Loader2 } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-64">
      <Loader2 className="bg-red-400 text-red-900 h-8 w-8 animate-spin" />
    </div>
  );
}
