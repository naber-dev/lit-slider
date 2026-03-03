# Lit Slider

A dynamic image slider built as a static website. Images can be added at runtime
by entering a URL into the input field at the bottom of the page.

## Tech Stack

| Technology | Purpose |
|---|---|
| [Astro](https://astro.build) | Static site generator & JS/TS bundler |
| [Lit](https://lit.dev) | Web Component for the dynamic slider |
| [TailwindCSS v4](https://tailwindcss.com) | Utility-first styling |
| [Docker / Podman](https://www.docker.com) | Containerized deployment |

## Features

- **Responsive** — 1 image per slide on mobile, 2 on medium, 3 on large screens
- **Smooth animation** — slide transition on prev/next navigation
- **Wrap-around** — loops from last to first slide and vice versa
- **Add images** — enter any image URL and press Enter to add a new slide
- **Dark mode** — automatically adapts to the system color scheme

## Prerequisites

- Docker or Podman

For local development additionally:
- Node.js >= 22

## Running with Docker

```bash
docker build -t lit-slider .
docker run -p 8080:80 lit-slider
```

Open http://localhost:8080

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:4321

## Build

```bash
npm run build
```

Output is generated in the `dist/` directory.

## Project Structure

```
src/
├── components/
│   └── slider.ts       # Lit Web Component
├── pages/
│   └── index.astro     # Single page entry point
└── styles/
    └── tailwind.css    # Tailwind CSS entry
Dockerfile
```
