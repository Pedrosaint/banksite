# NovaTrust Credit Union - Single Page Application

A modern, responsive single-page credit union website built with React, Vite, TypeScript, and Tailwind CSS. Featuring smooth scrolling navigation, interactive components, and a professional fintech design.

## 🌟 Features

- **Single Page Application (SPA)** - Entire website on one page with smooth scrolling navigation
- **Responsive Design** - Fully mobile-friendly with responsive grid layouts
- **Sticky Navigation** - Header stays fixed with active section highlighting
- **Smooth Scrolling** - Native scroll-into-view animations between sections
- **Modern UI Components** - Card-based sections, gradient backgrounds, hover effects
- **Modern Banking Services** - Showcasing accounts, loans, and services
- **Contact Form** - Functional contact form with form state management
- **Login Panel** - Floating login widget (demo UI only)
- **Secure & Trustworthy** - NCUA insurance information, security features highlighted

## 🏗️ Project Structure

```
banksite/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx           # Sticky navigation with smooth scrolling
│   │   ├── HeroSection.tsx       # Home section with CTA buttons
│   │   ├── AboutSection.tsx      # About NovaTrust with mission & values
│   │   ├── AccountsSection.tsx   # Account products showcase
│   │   ├── LoansSection.tsx      # Loan types with rates table
│   │   ├── ServicesSection.tsx   # Banking services & security
│   │   ├── ContactSection.tsx    # Contact form & information
│   │   ├── LoginPanel.tsx        # Floating login widget
│   │   └── Footer.tsx            # Footer with links & social
│   ├── App.tsx                   # Main app component with scroll tracking
│   ├── main.tsx                  # React entry point
│   ├── App.css                   # Tailwind CSS imports
│   └── index.css                 # Global styles & CSS variables
├── index.html                    # HTML template
├── package.json                  # Dependencies & scripts
├── tailwind.config.js            # Tailwind CSS configuration
├── postcss.config.js             # PostCSS configuration
├── tsconfig.json                 # TypeScript configuration
├── vite.config.ts                # Vite configuration
└── README.md                     # This file
```

## 📋 Navigation & Sections

### Navigation Items (Smooth Scroll to Sections)

- 🏠 **Home** - Hero section with call-to-action
- ℹ️ **About** - Company mission and values
- 💳 **Accounts** - Account products and features
- 💰 **Loans & Rates** - Loan offerings and rates table
- 🛠️ **Services** - Banking services and security features
- 📞 **Contact** - Contact form and information

### Key Sections

1. **Hero Section** (`#home`)
   - Trust-focused headline and subheading
   - Call-to-action buttons: "Open an Account" & "Apply for a Loan"
   - Stats display: Members, Assets, Years of Service
   - Modern gradient background

2. **About Section** (`#about`)
   - Company mission, values, and background
   - Trust indicators and member benefits
   - Visual stats card with key metrics

3. **Accounts Section** (`#accounts`)
   - Savings, Checking, and Business accounts
   - Benefits and features for each account
   - Account signup prompt

4. **Loans & Rates Section** (`#loans`)
   - Auto, Personal, and Home loans
   - Current APR rates and terms
   - Comprehensive rates table

5. **Services Section** (`#services`)
   - Six main banking services
   - Security and trust information
   - NCUA insurance and fraud monitoring

6. **Contact Section** (`#contact`)
   - Contact form (Name, Email, Message)
   - Contact information and hours
   - Social media links

7. **Login Panel**
   - Floating login widget (demo UI only)
   - Hidden on mobile, visible on desktop

8. **Footer**
   - Quick navigation links
   - Social media links
   - Legal links and NCUA notice

## 🛠️ Technical Stack

- **React 19.2.4** - UI library
- **Vite 8.0.1** - Build tool & dev server
- **TypeScript ~5.9.3** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm installed

### Installation

1. Navigate to project directory

   ```bash
   cd banksite
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start development server

   ```bash
   npm run dev
   ```

   Website available at `http://localhost:5173`

### Available Scripts

- **`npm run dev`** - Start development server
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build
- **`npm run lint`** - Run ESLint checks

## 🎨 Design System

### Colors

- **Primary**: `#0066cc` (Blue)
- **Secondary**: `#00cc88` (Green)
- **Accent**: `#ff6b35` (Orange)

### Typography

- **Display Font**: Poppins
- **Body Font**: Inter
- **Monospace**: System monospace

### Components

- Card-based layouts with hover effects
- Rounded corners (8px radius)
- Smooth transitions (300ms)
- Responsive grid layouts

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All sections are fully responsive with mobile-first design.

## ✨ UX Features

- Smooth scrolling between sections
- Active section highlighting in navbar
- Hover effects on cards and buttons
- Mobile hamburger menu
- Touch-friendly design
- Form validation

## 🔐 Security & Trust

- NCUA insurance information
- 256-bit encryption mentioned
- Multi-factor authentication featured
- 24/7 fraud monitoring
- Trust badges and security details

## 📄 Content Information

**Fictional credit union for demonstration:**

- **Brand**: NovaTrust Credit Union
- **All contact info is fictional**
- **All rates are mock data**
- **Login is UI-only**

## 📚 Component Architecture

Each component is:

- Pure React functional components
- Self-contained and modular
- Responsive using Tailwind CSS
- Well-organized and maintainable

## 📦 Building for Production

```bash
npm run build
```

Deploy the `dist/` folder to your hosting provider.

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vite.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Built with ❤️ using modern web technologies**
tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },

},
])

````

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
````
