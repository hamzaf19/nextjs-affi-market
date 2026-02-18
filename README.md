# Next.js + shadcn/ui Starter

A modern starter template using Next.js 16 with the App Router and shadcn/ui components.

## Tech Stack

- **Next.js 16.1** - React framework with App Router
- **React 19.2** - Latest React with new features
- **TypeScript 5.9** - Type-safe development
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **shadcn/ui** - Re-usable UI components (New York style)
- **Radix UI** - Accessible component primitives
- **Lucide React 0.574** - Icon library

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
app/
  layout.tsx    # Root layout
  page.tsx      # Home page
  globals.css   # Global styles + Tailwind
lib/
  utils.ts      # Utility functions (cn helper)
```

## Adding shadcn/ui Components

```bash
npx shadcn@latest add button
npx shadcn@latest add card
# etc.
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
