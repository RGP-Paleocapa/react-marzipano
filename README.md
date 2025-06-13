# 🧭 Project Structure Guide & Setup Guide

## 📁 Root Structure

<pre style="background:#1e1e1e; color:#d4d4d4; padding:10px; border-radius:5px; font-family: monospace;">
<span style="color:#569cd6;">├──</span> App.tsx           <span style="color:#6a9955;"># Root component rendering scenes and overlays</span>
<span style="color:#569cd6;">├──</span> main.tsx          <span style="color:#6a9955;"># Entry point</span>
<span style="color:#569cd6;">├──</span> index.css         <span style="color:#6a9955;"># Global CSS styles (Tailwind)</span>
<span style="color:#569cd6;">├──</span> assets/           <span style="color:#6a9955;"># Static assets: images and icons</span>
<span style="color:#569cd6;">│</span>   <span style="color:#569cd6;">├──</span> icons/        <span style="color:#6a9955;"># Icon images</span>
<span style="color:#569cd6;">│</span  >   <span style="color:#569cd6;">└──</span> images/       <span style="color:#6a9955;"># Other static images</span>
<span style="color:#569cd6;">├──</span> components/       <span style="color:#6a9955;"># UI components grouped by domain</span>
<span style="color:#569cd6;">│</span>   <span style="color:#569cd6;">├──</span> errors/       <span style="color:#6a9955;"># Error UI components (e.g., ErrorFallback)</span>
<span style="color:#569cd6;">│</span>   <span style="color:#569cd6;">├──</span> layout/       <span style="color:#6a9955;"># Layout and common UI (e.g., Header)</span>
<span style="color:#569cd6;">│</span>   <span style="color:#569cd6;">├──</span> overlays/     <span style="color:#6a9955;"># Modular UI overlays (Map, Video, Audio, etc.)</span>
<span style="color:#569cd6;">│</span>   <span style="color:#569cd6;">├──</span> scene/        <span style="color:#6a9955;"># Scene-related components and hotspots</span>
<span style="color:#569cd6;">│</span>   <span style="color:#569cd6;">└──</span> tour/         <span style="color:#6a9955;"># Tour and onboarding system</span>
<span style="color:#569cd6;">├──</span> data/             <span style="color:#6a9955;"># App-wide data and JSON (formerly config/)</span>
<span style="color:#569cd6;">├──</span> hooks/            <span style="color:#6a9955;"># Custom React hooks</span>
<span style="color:#569cd6;">├──</span> store/            <span style="color:#6a9955;"># Zustand stores for global state</span>
<span style="color:#569cd6;">├──</span> types/            <span style="color:#6a9955;"># TypeScript types and declarations</span>
<span style="color:#569cd6;">└──</span> utils/            <span style="color:#6a9955;"># Utility and helper functions</span></pre>


## 🧩 Folder Details

### `data/`
Contains Marzipano scene data (e.g. hotspots), common settings among all scenes and global settings (e.g. fullscreen, autorotate).

### `components/`
Contains all UI components grouped by domain responsibility for clarity and modularity.

- `errors/`: Error UI components like ErrorFallback.
- `layout/`: Common layout components such as Header.
- `overlays/`: Modular UI overlays, including audio, video, and map components.
- `scene/`: Components managing Marzipano scenes and hotspots.
- `tour/`: Onboarding and walkthrough UI using React Joyride.

### `hooks/`
Project-specific logic extracted as composable hooks. These are not tied to specific pages, but may be scoped to the app's Marzipano context.

### `stores/`
Zustand stores managing state for audio, scenes, hotspots, video, and the viewer instance.

### `types/`
Centralised types and type declarations, including external (e.g., Marzipano) and internal app types.

### `ui/`
Contains reusable presentational components (e.g. error, header, footer UIs).

### `utils/`
Stateless helper functions, initialisers, or config logic (e.g. viewer initialisation, scene loader). No rendering logic.

---

## 🔧 Design Principles

- 🧠 **Feature-based separation** over type-based. Code is grouped by purpose, not file kind.
- 🧼 **Clean boundaries** between reusable UI, domain logic, and state.
- 🔁 Only promote to `ui/` or `utils/` if a second use-case arises.
- 🚫 Avoid over-abstraction — simplicity wins unless proven otherwise.

---

## 📝 Notes

- Uses [Marzipano](https://www.marzipano.net/) for 360° scene rendering.
- State managed with [Zustand](https://github.com/pmndrs/zustand).
- Tour system based on [React Joyride](https://github.com/gilbarbara/react-joyride).

---

<br>
<br>

# 🚀 Getting Started

## 📦 Prerequisites

Make sure you have the following installed:

  - Node.js (v18+ recommended)
  - pnpm or npm/yarn

## Clone the repository
    git clone https://github.com/rgp-paleocapa/react-marzipano.git
    cd react-marzipano;

## 🛠 Installation
```
npm install
```

## ▶️ Running the App
```
npm run dev
```

This will start the app at http://localhost:5173/ (using Vite).

## 🧃 Feedback & Contributions

This project is a work in progress. Feedback, ideas, and contributions are welcome!
