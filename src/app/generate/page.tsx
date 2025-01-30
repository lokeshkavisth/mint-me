"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Download, Edit, Save } from "lucide-react";
import ReactMarkdown from "react-markdown";
import GenerateForm from "./generate-form";

export default function GeneratePage() {
  const [readme, setReadme] = useState<string | null>(null);
  const [editedReadme, setEditedReadme] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGenerate = async (jsonInput: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/generate-readme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonInput),
      });

      const data = await res.json();
      const readme = data.readme.readme || data.readme.markdown;

      console.log(data.readme.readme);

      setReadme(readme);
      setEditedReadme(readme);
      setIsModalOpen(false);
    } catch (err) {
      setError(
        "An error occurred while generating the README. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (!editedReadme) return;
    const blob = new Blob([editedReadme], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    setIsEditing(false);
    setReadme(editedReadme);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button onClick={() => setIsModalOpen(true)} className="mb-4">
        Generate README
      </Button>
      <GenerateForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGenerate={handleGenerate}
        isLoading={loading}
      />
      <Card className="w-full">
        <CardHeader>
          <CardTitle>README Preview</CardTitle>
        </CardHeader>
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
          {readme && (
            <div className="mt-4 flex justify-between">
              {!isEditing ? (
                <Button onClick={handleEdit}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
              ) : (
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" /> Save
                </Button>
              )}
              <Button onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" /> Export README
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// {
//   "name": "Lokesh Sharma",
//   "bio": "Full Stack Web Developer with expertise in modern web technologies, backend development, and cloud computing.",
//   "location": "India",
//   "email": "lokesh@example.com",
//   "website": "https://lokesh.dev",
//   "linkedin": "https://www.linkedin.com/in/lokeshsharma",
//   "github": "https://github.com/lokeshkavisth",
//   "skills": {
//     "frontend": ["HTML", "CSS", "JavaScript", "React.js", "Next.js", "Tailwind CSS"],
//     "backend": ["Node.js", "Express.js", "NestJS"],
//     "database": ["MongoDB", "PostgreSQL", "MySQL", "Firebase"],
//     "programming_languages": ["JavaScript", "TypeScript", "Java", "Python", "C", "C#"],
//     "devops": ["Docker", "Kubernetes", "AWS", "CI/CD"],
//     "other": ["GraphQL", "REST APIs", "Microservices Architecture"]
//   },
//   "experience": [
//     {
//       "company": "TechCorp",
//       "position": "Software Engineer",
//       "duration": "2022 - Present",
//       "responsibilities": [
//         "Developing and maintaining scalable web applications",
//         "Integrating third-party APIs and cloud services",
//         "Optimizing performance and security of applications"
//       ]
//     },
//     {
//       "company": "StartupX",
//       "position": "Backend Developer Intern",
//       "duration": "2021 - 2022",
//       "responsibilities": [
//         "Designed and implemented RESTful APIs",
//         "Worked on database optimizations and cloud deployment",
//         "Collaborated with frontend developers for seamless integrations"
//       ]
//     }
//   ],
//   "projects": [
//     {
//       "name": "FileFlow",
//       "description": "A cloud-based file hosting service that allows users to upload, share, and manage files securely.",
//       "tech_stack": ["Next.js", "Node.js", "MongoDB", "AWS S3", "Tailwind CSS"],
//       "repository": "https://github.com/lokeshkavisth/fileflow",
//       "live_demo": "https://fileflow.app"
//     },
//     {
//       "name": "Reserve",
//       "description": "An online bus ticket booking platform that helps users book tickets seamlessly.",
//       "tech_stack": ["React.js", "Express.js", "PostgreSQL", "Redis", "Stripe API"],
//       "repository": "https://github.com/lokeshkavisth/reserve",
//       "live_demo": "https://reserve.com"
//     },
//     {
//       "name": "DevConnect",
//       "description": "A social platform for developers to share ideas, collaborate, and network.",
//       "tech_stack": ["Next.js", "Firebase", "GraphQL", "TypeScript"],
//       "repository": "https://github.com/lokeshkavisth/devconnect",
//       "live_demo": "https://devconnect.app"
//     }
//   ],
//   "certifications": [
//     {
//       "title": "AWS Certified Developer – Associate",
//       "issued_by": "Amazon Web Services",
//       "year": 2023
//     },
//     {
//       "title": "Full-Stack Web Development Certification",
//       "issued_by": "Udemy",
//       "year": 2022
//     }
//   ],
//   "hobbies": [
//     "Reading and writing tech articles",
//     "Traveling",
//     "Open-source contributions",
//     "Exploring new programming languages and frameworks"
//   ]
// }
