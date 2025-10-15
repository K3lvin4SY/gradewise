# GradeWise

## Features

### Grade Management

- Track your courses and grades
- Edit grades in directly in a table
- Calculate your average grade

### Insert Courses

- Import a programs courses from LTHs programs
- Insert a course manually
- Insert a secific course from LTHs courses
- Upload a LADOK national transcript of records (pdf)

### Theming & UI

- Multiple Themes
  - Default
  - Quarth
  - Ocean Breeze
  - Bold Tech
  - Neo Brutalism
  - Elegant Luxury
- Dark/light mode support

### Entry Requirements Warning

If a course has any reqirements, a waring will be displayed along with a link to the course's website.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. **Install dependencies**

```bash
  npm install
```

### Development

1. **Start the development server**

```bash
  npm run dev
```

2. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Build & Deployment

1. **Build for production**

```bash
   npm run build
```

2. **Preview the production build**

```bash
   npm run preview
```

### Usage

#### Scenario 1

The following instruction will describe how you can see your average calculated grade in LTHs program C with the start year 23/24

1. Follow the steps in the [Build & Deployment](#build--deployment) section to build and deploy the application.
2. Enter `o` and press `ENTER` into the terminal you deployed the application. You should now be at the landing page in the application.
3. Press the button `Get Started`.
4. Press the Drop-down menu `Select program...`.
5. Select & press the Option `C - Information and Communication Engineering`.
6. Press the Drop-down menu `Select start year...`.
7. Scroll down the list until you see the option `23/24`.
8. Select & press the Option `23/24`.
9. Press the button `Select`.
10. For each course you have done, click the `Grade` inputfield and type in your grade.

#### Scenario 2

The following instruction will describe how you can use the uploud transcript feature.
This scenario will assume you already have downloaded a national transcript of records from LADOK in english.

1. Complete steps 1-9 in [Scenario 1](#scenario-1).
2. Press the button `Upload Transcript`.
3. Choose and select your national trascript of records you got from LADOK.
4. Wait until it have finished loading
5. Done! Now your courses should have your grades inserted.
