<div align="center">

<img src="public/gradewise-logo.svg" alt="GradeWise" width="120" />

# GradeWise

**The ultimate academic companion for tracking grades and visualizing progress — tailored for LTH students.**

<br/>

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

</div>

---

## Problem Statement

Managing academic progress can be tedious. Students often rely on:

- 📝 **Messy spreadsheets** that require constant manual updating.
- 🏛️ **University portals** (like LADOK) that are great for official records but poor for "what-if" planning and quick overviews.
- 🧠 **Mental math** to calculate weighted averages across different credit systems.

Students need a tool that understands their specific program structure, calculates averages instantly, and provides a clear visual overview of their academic standing.

---

## Solution

**GradeWise** bridges the gap between official records and personal planning. It offers a specialized interface for tracking courses, importing data directly from university sources (LTH), and visualizing your academic journey.

| Feature               | GradeWise                                             | Excel / Sheets            | University Portal     |
| --------------------- | ----------------------------------------------------- | ------------------------- | --------------------- |
| **Data Import**       | One-click import via PDF (LADOK) or Program selection | Manual entry only         | Read-only             |
| **Grade Calculation** | Automatic weighted average                            | Requires complex formulas | Often hidden or basic |
| **Program Knowledge** | Built-in LTH course database                          | None                      | High                  |
| **UI Experience**     | Modern, themeable, interactive                        | Grid-based                | Legacy enterprise UI  |

### Key Features

- **Smart Course Management**:
  - **Program Import**: Automatically load all courses for specific LTH programs.
  - **LADOK Integration**: Upload your official LADOK transcript PDF to instantly populate completed courses and grades.
  - **Manual Entry**: Add specific courses or custom entries as needed.
- **Grade Tracking**:
  - Edit grades directly in an interactive table.
  - Real-time calculation of weighted average grades.
- **Compliance & Requirements**:
  - Automatic warnings for course entry requirements with direct links to official course syllabi.
- **Rich Theming**:
  - Toggle between **Dark** and **Light** modes.
  - Choose from 6+ professional themes: _Default, Quarth, Ocean Breeze, Bold Tech, Neo Brutalism, Elegant Luxury_.

---

## Tech Stack

GradeWise is built with modern web technologies to ensure a fast, responsive, and maintainable application.

### Frontend Architecture

| Technology                                        | Purpose                                                     |
| ------------------------------------------------- | ----------------------------------------------------------- |
| **[React 19](https://react.dev/)**                | Core UI library for building interactive components         |
| **[TypeScript](https://www.typescriptlang.org/)** | Type safety and developer experience                        |
| **[Vite](https://vitejs.dev/)**                   | Next-generation frontend tooling and bundler                |
| **[Tailwind CSS v4](https://tailwindcss.com/)**   | Utility-first CSS framework for styling                     |
| **[Shadcn UI](https://ui.shadcn.com/)**           | Reusable, accessible component primitives based on Radix UI |
| **[React Router v7](https://reactrouter.com/)**   | Client-side routing                                         |
| **[GSAP](https://gsap.com/)**                     | High-performance animations                                 |
| **[Tabler Icons](https://tabler-icons.io/)**      | Clean and consistent icon set                               |

---

## Project Structure

```bash
gradewise/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── animated/       # GSAP powered components
│   │   ├── theme/          # Theme providers and toggles
│   │   └── ui/             # Shadcn UI base components
│   ├── lib/                # Utility functions
│   ├── models/             # Data models (CourseGrade.ts)
│   ├── about-page.tsx      # Application pages
│   ├── average-grade.tsx   # Grade calculation logic
│   ├── main.tsx            # Entry point
│   ├── router-config.tsx   # Route definitions
│   └── transcript-loader.tsx # PDF parsing logic
├── components.json         # Shadcn UI configuration
├── package.json            # Dependencies and scripts
└── vite.config.ts          # Vite configuration
```

---

## Getting Started

### Prerequisites

- **Node.js** (Latest LTS recommended)
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/K3lvin4SY/gradewise.git
   cd gradewise
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   Navigate to `http://localhost:5173` to view the application.

### Build for Production

To create an optimized production build:

```bash
npm run build
npm run preview
```

---

## Usage Scenarios

### 1. Planning a Program (Example: LTH Program C)

Use this scenario if you want to populate your grade book with the standard curriculum for a specific program.

1. Launch the application and click **Get Started**.
2. Locate the **Program Selector** dropdown.
3. Select **C - Information and Communication Engineering**.
4. Choose your **Start Year** (e.g., `23/24`) from the secondary dropdown.
5. Click **Select**. The table will populate with the program's mandatory courses.
6. Click into the `Grade` column for any course to input your results (e.g., `3`, `4`, `5`).
7. Watch your average grade update automatically at the top of the screen.

### 2. Importing Existing Grades (LADOK)

Use this scenario if you already have a transcript and want to visualize your current standing without manual data entry.

1. Download your **Official Transcript of Records** (in English) as a PDF from Ladok.
2. In GradeWise, complete the initial setup (or ensure you are on the main dashboard).
3. Click the **Upload Transcript** button.
4. Select your downloaded PDF file.
5. Wait for the processing to complete. Your completed courses and grades will be automatically inserted into the table, replacing or updating existing entries.
