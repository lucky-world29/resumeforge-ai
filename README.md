


# ResumeForge AI

ResumeForge AI is a premium single-page resume builder built with React + Vite, Tailwind CSS, Framer Motion, and Lucide icons. It delivers a polished dark SaaS interface, live preview, local AI assistance, export tools, and localStorage persistence with no backend required.

## Features

- Premium hero with animated background, floating blobs, gradient text, and interactive mouse spotlight
- Dashboard cards for Create Resume, My Resumes, Templates, AI Assistant, Export PDF, and Profile
- Multi-step resume builder for personal info, summary, work experience, education, skills, projects, certifications, achievements, and languages
- Local AI helpers for professional summary generation, ATS-style scoring, grammar/tone guidance, missing skills suggestions, keyword optimization, and bullet improvements
- Right-side live preview with one-click PDF, DOCX, HTML, and Print export
- Template switching for Modern, Minimal, Executive, Creative, Developer, Corporate, Dark, and Light themes
- Settings panel for dark mode, accent color, font selection, paper size, margins, and autosave
- Undo/redo, keyboard shortcuts, progress bar, step indicator, loading polish, and confetti on completion
- All data stored in localStorage for a backend-free workflow

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS 3
- Framer Motion
- Lucide React
- jsPDF + html2canvas
- docx + file-saver
- canvas-confetti

## Folder Structure

```bash
resumeforge-ai/
├── public/
│   └── avatar-placeholder.svg
├── src/
│   ├── components/
│   │   ├── ai/
│   │   ├── builder/
│   │   ├── dashboard/
│   │   ├── layout/
│   │   ├── preview/
│   │   ├── settings/
│   │   ├── templates/
│   │   └── ui/
│   ├── context/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## Installation

```bash
npm install
npm run dev
```

Then open the local Vite URL in your browser.

## Production Build

```bash
npm run build
npm run preview
```

## Notes

- The AI features are implemented client-side using smart local heuristics so the app runs without secrets or backend services.
- For real LLM integration, replace the helper functions in `src/lib/ai.js` with your preferred AI API.
- Local storage keys used by the app: `resumeforge-ai-state` and `resumeforge-ai-library`.
=======
# resumeforge-ai

