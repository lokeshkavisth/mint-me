import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 mx-auto border-x">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Create Stunning GitHub Profile READMEs
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Generate beautiful and informative GitHub profile READMEs using
                AI and your GitHub data.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/generate">
                <Button>Get Started</Button>
              </Link>
              <Link
                href="https://github.com/lokeshkavisth/mint-me"
                target="_blank"
              >
                <Button variant="outline">Learn More</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="border-t w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900/20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 p-4">
              <GithubIcon className="h-10 w-10 mb-2" />
              <h2 className="text-xl font-bold">GitHub Integration</h2>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Automatically fetch and display your GitHub stats and
                contributions.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4">
              <svg
                className="h-10 w-10 mb-2"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" x2="12" y1="22.08" y2="12" />
              </svg>
              <h2 className="text-xl font-bold">JSON Customization</h2>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Add custom details to your README using a simple JSON format.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4">
              <svg
                className="h-10 w-10 mb-2"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <h2 className="text-xl font-bold">AI-Powered Generation</h2>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Leverage Gemini AI to create personalized and engaging README
                content.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
