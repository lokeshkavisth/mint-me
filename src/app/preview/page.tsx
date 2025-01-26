"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import PreviewContent from "./preview-content";

export default function PreviewPage({}) {
  const searchParams = useSearchParams();

  const username = searchParams.get("username");
  const json = searchParams.get("json");

  // console.log(username);
  // console.log(json);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle>README Preview for {username || "Custom Data"}</CardTitle>
        </CardHeader>
        <PreviewContent username={username} jsonInput={json} />
      </Card>
    </div>
  );
}
