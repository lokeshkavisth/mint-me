"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, AlertCircle } from "lucide-react";

export default function GeneratePage() {
  const [username, setUsername] = useState("");
  const [jsonInput, setJsonInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (username) {
        router.push(`/preview?username=${username}`);
      } else if (jsonInput) {
        // For simplicity, we're just validating if it's a valid JSON
        JSON.parse(jsonInput);
        // In a real app, you'd send this to the server and process it
        router.push(`/preview?json=${encodeURIComponent(jsonInput)}`);
      } else {
        throw new Error("Please provide either a username or JSON input");
      }
    } catch (err) {
      setError(
        "Invalid input. Please check your username or JSON and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Generate GitHub README</CardTitle>
          <CardDescription>
            Enter your GitHub username or provide custom JSON data to generate
            your profile README.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="username">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="username">GitHub Username</TabsTrigger>
              <TabsTrigger value="json">Custom JSON</TabsTrigger>
            </TabsList>
            <TabsContent value="username">
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="username">GitHub Username</Label>
                    <Input
                      id="username"
                      placeholder="Enter your GitHub username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="json">
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="json">Custom JSON Data</Label>
                    <Textarea
                      id="json"
                      placeholder="Enter your custom JSON data"
                      value={jsonInput}
                      onChange={(e) => setJsonInput(e.target.value)}
                      className="h-[200px]"
                    />
                  </div>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleSubmit} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Generating..." : "Generate README"}
          </Button>
        </CardFooter>
      </Card>
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
