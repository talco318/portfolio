# Tal Cohen - Personal Portfolio

A modern, responsive, and highly interactive personal portfolio built with React and TypeScript. 

![Portfolio Preview Showcase](https://lh3.googleusercontent.com/d/1_Geshyn3WEDM7U9UnDuDZYbStrategy)

## 🚀 Features
- **Dynamic Animations:** Smooth scroll transitions, staggered element loading, and interactive hover effects powered by `Framer Motion`.
- **Responsive Design:** Mobile-first approach using `Tailwind CSS`, ensuring perfect layouts on all devices.
- **Dark Mode Support:** Built-in theme toggling that automatically respects system preferences.
- **Contact Form Integration:** Fully functional contact form leveraging `Web3Forms` to receive emails directly.
- **Enhanced UX/UI:** features a custom typing animation, reading progress bar, intelligent active section navigation, and accessible UI components.
- **Performance Optimized:** Lazy loading for images, preconnected CDNs, and robust SEO/OpenGraph meta attributes.

## 🛠️ Technology Stack
- **Framework:** [React 18](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Bundler:** [Vite](https://vitejs.dev/)

## 💻 Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/talco318/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory based on `.env.example`:
   ```env
   VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_api_key_here
   ```
   *(Note: You can get your free API key at [Web3Forms](https://web3forms.com/))*

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`.

## 📁 Project Structure

```text
src/
├── components/          # Reusable UI components (Navbar, Hero, Projects, etc.)
├── data/                # Hardcoded data structure defining the portfolio items
├── hooks/               # Custom React hooks (e.g., useTypewriter, useTheme)
├── index.css            # Base Tailwind imports and global styles
├── animations.ts        # Shared Framer Motion variant configuration
└── main.tsx             # Application entry point
```

## 🤝 Customization
All project information, skills, experience, and general data are stored inside `src/data/portfolio.ts`. To make this portfolio yours, simply update the JSON payload in that file.

---
*Coded with precision by [Tal Cohen](https://github.com/talco318)*
