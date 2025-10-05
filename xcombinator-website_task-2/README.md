# xCombinator Website

A modern, responsive web application for xCombinator - helping people launch on Solana blockchain. Built with Next.js 15, React 19, TypeScript, and TailwindCSS.

##  Live Demo

**Deployed Link:** [https://xcombinator-blue.vercel.app/](https://xcombinator-blue.vercel.app/)

##  About

xCombinator serves as an umbrella organization for a suite of Solana-focused products, providing expert guidance, full launch support, and whale connections to help projects succeed in the Solana ecosystem.

##  Features

###  Modern UI/UX
- **Glassmorphism Design**: Beautiful frosted glass effects with backdrop blur
- **Gradient Animations**: Smooth floating gradient backgrounds
- **Hover Effects**: Interactive card hover states with gradient glows
- **Custom Typography**: Museo font family for elegant text rendering
- **Dark Theme**: Sleek dark mode interface optimized for readability

### Fully Responsive
- **Mobile-First Design**: Optimized for all screen sizes (320px and up)
- **Breakpoint Support**:
  - Mobile: 320px - 639px
  - Tablet: 640px - 1023px
  - Desktop: 1024px and above
- **Adaptive Navigation**: Hamburger menu for mobile, full navigation bar for desktop
- **Flexible Layouts**: Grid systems that adapt from 1 to 4 columns based on screen size
- **Touch-Optimized**: Enhanced touch targets and interactions for mobile devices

###  Core Pages

#### Home Page (`/`)
- Hero section with animated gradients
- Real-time market cap display ($X token)
- Four key feature highlights:
  - Expert guidance from industry leaders
  - Full launch support (token creation to marketing)
  - Solana-native tools
  - Whale connections for instant traction
- Product notification card (xApple)
- Call-to-action buttons

#### Products Page (`/products`)
- Showcase of xCombinator products
- **xApple**: Fair launches launchpad with real liquidity and trader rewards
- Product cards with social media links (Twitter, Telegram, Website)
- Hover animations and gradient effects

#### Ambassadors Page (`/ambassadors`)
- Grid display of xCombinator ambassadors
- Ambassador profiles with:
  - Profile images
  - Names and handles
  - Role tags (Advisor, Blockchain expert)
- "Become an xAmbassador" call-to-action section
- Responsive 1-3 column grid layout

#### Contact Page (`/contact`)
- Multiple contact methods:
  - Email: contact@xcombinator.com
  - Twitter/X: @xCombinator
  - Telegram community
  - Discord server
- Interactive contact cards with hover effects
- "Ready to Launch?" call-to-action section
- Schedule a call button

#### $X Token Page (`/sx`)
- Dedicated page for the $X token information

###  UI Components

#### Navbar
- Fixed top navigation with backdrop blur
- Logo with hover effects
- Desktop navigation links
- Mobile hamburger menu
- Active route highlighting
- Smooth transitions

#### Footer
- Comprehensive site links
- Social media integration
- Newsletter subscription
- Copyright information

###  Design Features
- **Lucide Icons**: Modern icon library for consistent visuals
- **Smooth Animations**: CSS transitions and transforms
- **Loading States**: Optimized image loading
- **Accessibility**: Semantic HTML and ARIA labels
- **Performance**: Optimized assets and code splitting

##  Tech Stack

- **Framework**: Next.js 15.5.4 (App Router)
- **React**: 19.1.0
- **TypeScript**: 5.x
- **Styling**: TailwindCSS 3.4.18
- **Icons**: Lucide React 0.544.0
- **Deployment**: Vercel

##  Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd xcombinator-website_task-2
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

##  Build & Deploy

### Build for Production
```bash
npm run build
npm start
```

### Lint Code
```bash
npm run lint
```

##  Project Structure

```
xcombinator-website_task-2/
├── app/
│   ├── ambassadors/        # Ambassadors page
│   ├── contact/            # Contact page
│   ├── products/           # Products showcase
│   ├── sx/                 # $X token page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── Navbar.tsx          # Navigation component
│   └── Footer.tsx          # Footer component
├── public/                 # Static assets
└── package.json            # Dependencies
```

##  Responsive Breakpoints

- **sm**: 640px (Tablet)
- **md**: 768px (Medium devices)
- **lg**: 1024px (Desktop)
- **xl**: 1280px (Large desktop)

##  Key Highlights

-  **100% Responsive** - Works seamlessly on all devices
-  **Modern Design** - Glassmorphism and gradient effects
-  **Fast Performance** - Optimized with Next.js 15
-  **Type-Safe** - Built with TypeScript
-  **SEO Friendly** - Proper meta tags and semantic HTML
-  **Accessible** - WCAG compliant components
-  **Production Ready** - Deployed on Vercel

##  License

This project is private and proprietary.

##  Contributing

This is a private project. For any inquiries, please contact the development team.

---

**Built with ❤️ for the Solana ecosystem**
