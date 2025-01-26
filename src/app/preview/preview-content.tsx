"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Download, Edit, Save } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function PreviewContent({
  username = "",
  jsonInput = "",
}: {
  username?: string;
  jsonInput?: string;
}) {
  const [readme, setReadme] = useState<string | null>(null);
  const [editedReadme, setEditedReadme] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const generateReadme = async () => {
      try {
        let githubData;

        if (username && username.length > 0) {
          // Fetch GitHub data
          const githubResponse = await fetch(
            `/api/github?username=${username}`
          );
          if (!githubResponse.ok) {
            throw new Error("Failed to fetch GitHub data");
          }
          // console.log("response: ", await githubResponse.json());

          githubData = await githubResponse.json();
        } else if (jsonInput) {
          githubData = {
            customData: JSON.parse(decodeURIComponent(jsonInput)),
          };
        } else {
          throw new Error("No username or JSON input provided");
        }

        // Generate README using AI
        const generateResponse = await fetch("/api/generate-readme", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(githubData),
        });

        if (!generateResponse.ok) {
          throw new Error("Failed to generate README");
        }
        const { readme } = await generateResponse.json();
        // console.log(readme.readme);
        setReadme(readme.readme);
        setEditedReadme(readme.readme);
      } catch (err) {
        setError(
          "An error occurred while generating the README. Please try again."
        );
        // console.error("Error generating README:", err);
      } finally {
        setLoading(false);
      }
    };

    generateReadme();
  }, [username, jsonInput]);

  const handleExport = () => {
    const blob = new Blob([editedReadme || ""], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setReadme(editedReadme);
  };

  if (loading) {
    return null; // The loading state is handled by the Suspense boundary in the parent component
  }

  return (
    <>
      <CardContent>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {readme && !isEditing && (
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown>{readme}</ReactMarkdown>
          </div>
        )}
        {isEditing && (
          <Textarea
            value={editedReadme || ""}
            onChange={(e) => setEditedReadme(e.target.value)}
            className="w-full h-[500px] font-mono"
          />
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          <Button asChild className="mr-2">
            <Link href="/generate">Back to Generate</Link>
          </Button>
          {!isEditing && (
            <Button onClick={handleEdit}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Button>
          )}
          {isEditing && (
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" /> Save
            </Button>
          )}
        </div>
        <Button onClick={handleExport} disabled={!readme}>
          <Download className="mr-2 h-4 w-4" /> Export README
        </Button>
      </CardFooter>
    </>
  );
}
