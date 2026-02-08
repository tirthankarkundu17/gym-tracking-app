# Gym Exercises App

A modern, responsive web application for browsing and watching gym exercise videos. Built with React, TypeScript, and Vite, this app acts as a personal workout companion, allowing users to easily access video tutorials for various muscle groups directly from their mobile devices.

## 🚀 Features

- **Categorized Workouts**: Browse exercises by muscle group (Biceps/Triceps, Chest, Lats, Shoulders, Cardio).
- **Video Playback**: High-quality video demonstrations for each exercise.
- **Mobile-First Design**: Optimized layout and interactions for seamless use on smartphones during workouts.
- **Theme Support**: Toggle between Light and Dark modes for comfortable viewing in any environment.
- **Responsive Navigation**: Smooth transitions and intuitive navigation between categories and videos.

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Styling**: Vanilla CSS with CSS Variables for theming
- **Linting**: ESLint

## 📦 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/tirthankarkundu17/gym-exercises.git
    cd gym-app
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open your browser and navigate to `http://localhost:5173/gym-tracking-app/` (or the port shown in your terminal).

## 🏗️ Building for Production

To create a production-ready build:

```bash
npm run build
```

This will generate the static files in the `dist` directory, ready for deployment.

To preview the production build locally:

```bash
npm run preview
```

## 📂 Project Structure

```
src/
├── assets/         # Images and other static assets
├── components/     # Reusable UI components (ThemeToggle, ScrollToTop, etc.)
├── context/        # React Context (e.g., ThemeContext)
├── data/           # Data files (videos.json containing exercise data)
├── pages/          # Application pages (LandingPage, VideoGridPage, WatchPage)
├── utils/          # Utility functions (asset helpers)
├── App.tsx         # Main application component and routing setup
└── main.tsx        # Application entry point
```

## 🌐 Deployment

This application is configured for deployment on **GitHub Pages**.

The `base` path is set to `/gym-tracking-app/` in `vite.config.ts` and `App.tsx` to ensure correct routing on the hosted environment.

## 🤝 Contributing

Contributions are welcome! Please feel free to calculate a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
