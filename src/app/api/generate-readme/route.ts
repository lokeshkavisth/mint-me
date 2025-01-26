import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
  const body = await request.json();
  const { user, topRepos, customData } = body;
  console.log(user, topRepos, customData);

  if ((!user || !topRepos) && !customData) {
    return NextResponse.json(
      { error: "User data and top repositories or custom data are required" },
      { status: 400 }
    );
  }

  let prompt = "";

  if (customData) {
    prompt = `
      Generate a GitHub profile README based on the following custom data:
      ${JSON.stringify(customData, null, 2)}

      Please create a markdown formatted README that includes:
      1. A brief introduction
      2. Key skills or technologies
      3. Highlights of projects or achievements
      4. Any other relevant information provided

      Use emojis and formatting to make the README visually appealing.
    `;
  } else {
    prompt = `
      Generate a GitHub profile README for the following user:
      Name: ${user.name || user.login}
      Bio: ${user.bio || "No bio provided"}
      Location: ${user.location || "Not specified"}
      Public Repositories: ${user.public_repos}
      Followers: ${user.followers}
      Following: ${user.following}

      Top 5 Repositories:
      ${topRepos
        .map(
          (repo: any) =>
            `- ${repo.name}: ${repo.description || "No description"}`
        )
        .join("\n")}

      Please create a markdown formatted README that includes:
      1. A brief introduction
      2. Key skills or technologies (inferred from repositories)
      3. Highlights of top projects
      4. GitHub stats
      5. A call-to-action for collaboration

      Use emojis and formatting to make the README visually appealing.
    `;
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY!;
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
    };

    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              text: "Generate a GitHub profile README for the following user:\n      Name: lokeshkavisth\n      Bio: full stack web developer\n      Location: jaipur, rajasthan\n      Public Repositories: fileflow, nike clone, saas diary, mini world\n      Followers: 25\n      Following: 34\n\n      Top 5 Repositories:\n      \n      name: fileflow\n      description: a platform to host you files\n      \n      name: nike clone\n      description: a ui clone website of nike\n      \n      name: saas diary\n      description: the collection of all my saas products\n      \n      name: mini world\n      description: a collection of all of my 3d designs\n      \n\n      Please create a markdown formatted README that includes:\n      1. A brief introduction\n      2. Key skills or technologies (inferred from repositories)\n      3. Highlights of top projects\n      4. GitHub stats\n      5. A call-to-action for collaboration\n\n      Use emojis and formatting to make the README visually appealing.",
            },

            {
              text: ' Generate a GitHub profile README based on the following custom data:\n      {\n  "Name": "lokeshkavisth",\n  "email": "lokeshkavisth.dev@gmail.com",\n  "Bio": "full stack web developer",\n  "Location": "jaipur, rajasthan",\n  "Public_Repositories": ["fileflow", "nike clone", "saas diary", "mini world"],\n  "Followers": 25,\n  "Following": 34,\n  "skills": [\n    "javascript",\n    "node js",\n    "expressjs",\n    "tailwind css",\n    "nextjs",\n    "deno",\n    "firebase",\n    "python",\n    "ruby on rails",\n    "django"\n  ],\n  "Top_5_Repositories": [\n    {\n      "name": "fileflow",\n      "description": "a platform to host your files"\n    },\n    {\n      "name": "nike clone",\n      "description": "a UI clone website of Nike"\n    },\n    {\n      "name": "saas diary",\n      "description": "the collection of all my SaaS products"\n    },\n    {\n      "name": "mini world",\n      "description": "a collection of all of my 3D designs"\n    }\n  ]\n}\n\n\n      Please create a markdown formatted README that includes:\n      1. A brief introduction\n      2. Key skills or technologies\n      3. Highlights of projects or achievements\n      4. Any other relevant information provided\n\n      Use emojis and formatting to make the README visually appealing.\n      ',
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: '```markdown\n👋 Hi there, I\'m Lokesh Kavisth!\n\n🚀 I\'m a full stack web developer passionate about building awesome things on the web. Based in the vibrant city of Jaipur, Rajasthan, I love turning ideas into reality, one line of code at a time. \n\n## 🛠️ Key Skills & Technologies\n\nFrom my repositories, you can see I enjoy working with:\n\n*   🌐 **Web Development:** Creating robust and engaging web applications.\n*   🎨 **UI/UX Design:** Focusing on user-friendly interfaces (as seen in my Nike clone).\n*   📁 **File Management:** Developing platforms to handle and host files (check out FileFlow!).\n*   📦 **SaaS Exploration:** Gathering knowledge and building my own software as a service (SaaS Diary).\n*   📐 **3D Design:** Experimenting with bringing 3D worlds to life (Mini World).\n*   And many more tools and technologies used for bringing these ideas to life!\n\n## 🌟 Top Projects\n\nHere are some of my most notable projects:\n\n### 📁 [FileFlow](https://github.com/lokeshkavisth/fileflow) \n> A platform to host your files easily and securely.\n\n### 👟 [Nike Clone](https://github.com/lokeshkavisth/nike-clone)\n> A UI clone website of Nike, showcasing my frontend development skills.\n\n### 📒 [SaaS Diary](https://github.com/lokeshkavisth/saas-diary)\n> The collection of all my SaaS product explorations and ideas.\n\n### 🌍 [Mini World](https://github.com/lokeshkavisth/mini-world)\n> A collection of all my 3D designs and creations.\n\n## 📊 GitHub Stats\n\n<p align="center">\n    <img alt="GitHub Followers" src="https://img.shields.io/github/followers/lokeshkavisth?style=social" />\n    <img alt="GitHub Following" src="https://img.shields.io/github/following/lokeshkavisth?style=social" />\n</p>\n\n<p align="center">\n  <a href="https://github.com/lokeshkavisth?tab=repositories" style="text-decoration: none;">\n    <img src="https://github-readme-stats.vercel.app/api?username=lokeshkavisth&show_icons=true&theme=radical" alt="Lokesh Kavisth\'s GitHub Stats" />\n    </a>\n</p>\n\n## 🤝 Let\'s Connect & Collaborate!\n\nI\'m always excited to connect with fellow developers and collaborate on new projects! Feel free to reach out or explore my repositories.\n\n✨ Let\'s build something amazing together! ✨\n```\n',
            },

            {
              text: "```markdown\n👋 Hi there! I'm **lokeshkavisth**\n\n👨‍💻 I'm a full stack web developer based in Jaipur, Rajasthan.\n\n📧 You can reach me at: [lokeshkavisth.dev@gmail.com](mailto:lokeshkavisth.dev@gmail.com)\n\n📍 Location: Jaipur, Rajasthan, India\n\n---\n\n### 🛠️ My Skills\n\nI'm proficient in the following technologies:\n\n-   **Languages:** \n    -  `javascript` \n    -  `python`\n    -  `ruby`\n-   **Backend:**\n    -  `node js`\n    -  `expressjs` \n    -   `deno`\n    -  `django`\n    -  `ruby on rails` \n-   **Frontend:**\n    -  `tailwind css` \n    -  `nextjs`\n -   **Other:**\n    - `firebase`\n\n---\n\n### 🚀 My Projects\n\nHere are some of my top projects:\n\n1.  **[fileflow](https://github.com/lokeshkavisth/fileflow)**: 📁 A platform to host your files.\n2.  **[nike clone](https://github.com/lokeshkavisth/nike-clone)**: 👟 A UI clone website of Nike.\n3.  **[saas diary](https://github.com/lokeshkavisth/saas-diary)**: 📒 The collection of all my SaaS products.\n4.  **[mini world](https://github.com/lokeshkavisth/mini-world)**: 🌍 A collection of all of my 3D designs.\n\n---\n\n### 📊 GitHub Stats\n\n-   **Public Repositories:** 4 ([fileflow](https://github.com/lokeshkavisth/fileflow), [nike clone](https://github.com/lokeshkavisth/nike-clone), [saas diary](https://github.com/lokeshkavisth/saas-diary), [mini world](https://github.com/lokeshkavisth/mini-world))\n-   **Followers:** 25 \n-   **Following:** 34\n\n---\n  \nLet's connect! Feel free to explore my repositories and reach out if you have any questions or want to collaborate.\n```\n",
            },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage(prompt);
    const data = JSON.parse(result.response.text());

    // const { text } = await generateText({
    //   model: openai("gpt-4o"),
    //   prompt: prompt,
    //   system:
    //     "You are an AI assistant specialized in creating engaging and informative GitHub profile READMEs.",
    // });

    return NextResponse.json({ readme: data });
  } catch (error) {
    console.error("Error generating README:", error);
    return NextResponse.json(
      { error: "Failed to generate README" },
      { status: 500 }
    );
  }
}
