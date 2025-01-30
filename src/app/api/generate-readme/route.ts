import { NextResponse } from "next/server";
import {
  GoogleGenerativeAI,
  GenerativeModel,
  GenerationConfig,
} from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set in the environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model: GenerativeModel = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig: GenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export async function POST(request: Request) {
  try {
    // Parse the JSON input safely
    const jsonInput = await request.json();
    if (!jsonInput || Object.keys(jsonInput).length === 0) {
      return NextResponse.json(
        { error: "Custom data is required" },
        { status: 400 }
      );
    }

    // Constructing the prompt dynamically
    const prompt = `
      Generate a GitHub profile README based on the following custom data:
      ${JSON.stringify(jsonInput, null, 2)}

      Please create a markdown formatted README that includes:
      1. A brief introduction
      2. Key skills or technologies
      3. Highlights of projects or achievements
      4. Any other relevant information provided

      Use emojis and formatting to make the README visually appealing.
    `;

    // Start a chat session with the model
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              text: ' Generate a GitHub profile README based on the following custom data:\n      {\n  "Name": "lokeshkavisth",\n  "email": "lokeshkavisth.dev@gmail.com",\n  "Bio": "full stack web developer",\n  "Location": "jaipur, rajasthan",\n  "Public_Repositories": ["fileflow", "nike clone", "saas diary", "mini world"],\n  "Followers": 25,\n  "Following": 34,\n  "skills": [\n    "javascript",\n    "node js",\n    "expressjs",\n    "tailwind css",\n    "nextjs",\n    "deno",\n    "firebase",\n    "python",\n    "ruby on rails",\n    "django"\n  ],\n  "Top_5_Repositories": [\n    {\n      "name": "fileflow",\n      "description": "a platform to host your files"\n    },\n    {\n      "name": "nike clone",\n      "description": "a UI clone website of Nike"\n    },\n    {\n      "name": "saas diary",\n      "description": "the collection of all my SaaS products"\n    },\n    {\n      "name": "mini world",\n      "description": "a collection of all of my 3D designs"\n    }\n  ]\n}\n\n\n      Please create a markdown formatted README that includes:\n      1. A brief introduction\n      2. Key skills or technologies\n      3. Highlights of projects or achievements\n      4. Any other relevant information provided\n\n      Use emojis and formatting to make the README visually appealing.\n      ',
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "```markdown\n👋 Hi there! I'm **lokeshkavisth**\n\n👨‍💻 I'm a full stack web developer based in Jaipur, Rajasthan.\n\n📧 You can reach me at: [lokeshkavisth.dev@gmail.com](mailto:lokeshkavisth.dev@gmail.com)\n\n📍 Location: Jaipur, Rajasthan, India\n\n---\n\n### 🛠️ My Skills\n\nI'm proficient in the following technologies:\n\n-   **Languages:** \n    -  `javascript` \n    -  `python`\n    -  `ruby`\n-   **Backend:**\n    -  `node js`\n    -  `expressjs` \n    -   `deno`\n    -  `django`\n    -  `ruby on rails` \n-   **Frontend:**\n    -  `tailwind css` \n    -  `nextjs`\n -   **Other:**\n    - `firebase`\n\n---\n\n### 🚀 My Projects\n\nHere are some of my top projects:\n\n1.  **[fileflow](https://github.com/lokeshkavisth/fileflow)**: 📁 A platform to host your files.\n2.  **[nike clone](https://github.com/lokeshkavisth/nike-clone)**: 👟 A UI clone website of Nike.\n3.  **[saas diary](https://github.com/lokeshkavisth/saas-diary)**: 📒 The collection of all my SaaS products.\n4.  **[mini world](https://github.com/lokeshkavisth/mini-world)**: 🌍 A collection of all of my 3D designs.\n\n---\n\n### 📊 GitHub Stats\n\n-   **Public Repositories:** 4 ([fileflow](https://github.com/lokeshkavisth/fileflow), [nike clone](https://github.com/lokeshkavisth/nike-clone), [saas diary](https://github.com/lokeshkavisth/saas-diary), [mini world](https://github.com/lokeshkavisth/mini-world))\n-   **Followers:** 25 \n-   **Following:** 34\n\n---\n  \nLet's connect! Feel free to explore my repositories and reach out if you have any questions or want to collaborate.\n```\n",
            },
          ],
        },
      ],
    });
    const result = await chatSession.sendMessage(prompt);

    if (!result.response.text()) {
      throw new Error("Received empty response from AI model");
    }

    // Parsing response safely
    let readmeContent;
    try {
      readmeContent = JSON.parse(result.response.text());
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 }
      );
    }

    return NextResponse.json({ readme: readmeContent });
  } catch (error) {
    console.error("Error generating README:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
