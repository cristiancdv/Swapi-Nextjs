This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📁 Project Structure

```
new-swapi/
├── 📄 package.json
├── 📄 package-lock.json
├── 📄 next.config.ts
├── 📄 tailwind.config.ts
├── 📄 tsconfig.json
├── 📄 jest.config.ts
├── 📄 jest.setup.ts
├── 📄 eslint.config.mjs
├── 📄 postcss.config.mjs
├── 📄 next-env.d.ts
├── 📄 .gitignore
├── 📄 README.md
├── 📁 public/
│   ├── 📄 favicon.ico
│   ├── 📄 file.svg
│   ├── 📄 globe.svg
│   ├── 📄 next.svg
│   ├── 📄 vercel.svg
│   └── 📄 window.svg
└── 📁 src/
    ├── 📁 app/
    │   ├── 📄 layout.tsx
    │   ├── 📄 page.tsx
    │   ├── 📁 characters/
    │   │   └── 📄 page.tsx
    │   ├── 📁 movies/
    │   │   └── 📄 page.tsx
    │   ├── 📁 planets/
    │   │   └── 📄 page.tsx
    │   └── 📁 ships/
    │       └── 📄 page.tsx
    ├── 📁 assets/
    │   ├── 📁 icons/
    │   │   ├── 📄 CardIcon.tsx
    │   │   └── 📄 ListIcon.tsx
    │   └── 📁 images/
    │       ├── 📄 LoadingLogo.svg
    │       ├── 📄 StarWarsLogo.svg
    │       └── 📄 triangleAlert.svg
    ├── 📁 components/
    │   ├── 📁 layoutComponent/
    │   │   ├── 📄 Footer.tsx
    │   │   ├── 📄 Logo.tsx
    │   │   ├── 📄 NavBar.tsx
    │   │   └── 📄 NavItem.tsx
    │   └── 📁 ui/
    │       ├── 📄 Card.tsx
    │       ├── 📄 CardImage.tsx
    │       ├── 📄 ErrorMessage.tsx
    │       ├── 📄 LoadingSpinner.tsx
    │       ├── 📄 SwitchButton.tsx
    │       └── 📄 Table.tsx
    ├── 📁 config/
    │   ├── 📄 config.ts
    │   └── 📄 env.ts
    ├── 📁 constant/
    │   └── 📄 navItems.ts
    ├── 📁 entities/
    ├── 📁 features/
    │   └── 📁 entities/
    │       ├── 📁 types/
    │       └── 📁 views/
    │           ├── 📄 CardsView.tsx
    │           ├── 📄 EntityView.tsx
    │           └── 📄 TableView.tsx
    ├── 📁 hooks/
    │   ├── 📄 UseEntityData.tsx
    │   └── 📄 UseViewMode.tsx
    ├── 📁 services/
    │   ├── 📄 fetchEntity.ts
    │   └── 📁 types/
    ├── 📁 styles/
    │   ├── 📄 globals.css
    │   └── 📄 home.module.css
    ├── 📁 test/
    │   ├── 📁 app/
    │   │   ├── 📄 home.test.tsx
    │   │   ├── 📄 layout.test.tsx
    │   │   ├── 📁 characters/
    │   │   │   └── 📄 charactersPage.test.tsx
    │   │   ├── 📁 movies/
    │   │   │   └── 📄 moviesPage.test.tsx
    │   │   ├── 📁 planets/
    │   │   │   └── 📄 planetPage.test.tsx
    │   │   └── 📁 ships/
    │   │       └── 📄 shipsPage.test.tsx
    │   ├── 📁 assets/
    │   │   └── 📁 icons/
    │   │       ├── 📄 cardIcon.test.tsx
    │   │       └── 📄 listIcon.test.tsx
    │   ├── 📁 components/
    │   │   ├── 📁 layoutComponents/
    │   │   │   ├── 📄 footer.test.tsx
    │   │   │   ├── 📄 logo.test.tsx
    │   │   │   ├── 📄 navBar.test.tsx
    │   │   │   └── 📄 navItem.test.tsx
    │   │   └── 📁 ui/
    │   │       ├── 📄 card.test.tsx
    │   │       ├── 📄 cardImage.test.tsx
    │   │       ├── 📄 ErrorMessage.test.tsx
    │   │       ├── 📄 loadingSpinner.test.tsx
    │   │       ├── 📄 switchButton.test.tsx
    │   │       └── 📄 table.test.tsx
    │   ├── 📁 config/
    │   │   └── 📄 config.test.ts
    │   ├── 📁 features/
    │   │   └── 📁 entities/
    │   │       └── 📁 views/
    │   │           ├── 📄 cardViews.test.tsx
    │   │           ├── 📄 entityViews.test.tsx
    │   │           └── 📄 tableViews.test.tsx
    │   ├── 📁 hooks/
    │   │   ├── 📄 useEntityData.test.tsx
    │   │   └── 📄 useViewMode.test.tsx
    │   └── 📁 services/
    │       └── 📄 fetchEntity.test.ts
    └── 📁 utils/
```

### 📋 Structure Overview

- **`app/`** - Next.js App Router pages and layouts
- **`assets/`** - Static assets like icons and images
- **`components/`** - Reusable UI components
  - **`layoutComponent/`** - Layout-specific components (NavBar, Footer, etc.)
  - **`ui/`** - Generic UI components (Card, Table, etc.)
- **`config/`** - Configuration files
- **`constant/`** - Application constants
- **`features/`** - Feature-based modules
  - **`entities/`** - Entity-related features with types and views
- **`hooks/`** - Custom React hooks
- **`services/`** - API and external service integrations
- **`styles/`** - Global styles and CSS modules
- **`test/`** - Test files mirroring the src structure
- **`utils/`** - Utility functions and helpers