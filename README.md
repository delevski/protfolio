# Or Delevski - Professional Portfolio

A modern, responsive portfolio website showcasing Or Delevski's expertise as a CTO and Technology Leader, featuring integration with the Claude Skills Collection.

## 🚀 Features

- **Modern Design**: Clean, professional interface with smooth animations
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between themes with persistent preference
- **Interactive Skills Section**: Dynamic display of Claude Skills Collection data
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Contact Form**: Functional contact form with validation
- **SEO Optimized**: Meta tags and structured data for better search visibility

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Ready for Vercel, Netlify, or any static hosting

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── api/skills/route.ts    # API endpoint for skills data
│   │   ├── globals.css            # Global styles and dark mode
│   │   ├── layout.tsx             # Root layout with all components
│   │   └── page.tsx               # Main page (redirects to sections)
│   ├── components/
│   │   ├── Header.tsx             # Navigation with dark mode toggle
│   │   ├── Hero.tsx               # Landing section
│   │   ├── About.tsx               # Personal info and experience
│   │   ├── Skills.tsx             # Claude Skills Collection display
│   │   ├── Projects.tsx           # Featured projects
│   │   └── Contact.tsx             # Contact form and info
│   ├── data/
│   │   ├── index.ts               # Personal data and projects
│   │   └── skills.json            # Claude Skills Collection data
│   └── types/
│       └── index.ts               # TypeScript type definitions
├── tailwind.config.ts            # TailwindCSS configuration
└── package.json                  # Dependencies and scripts
```

## 🎨 Sections

### 1. Hero Section
- Professional introduction with name and title
- Call-to-action buttons for CV download and project viewing
- Animated scroll indicator

### 2. About Section
- Personal information and contact details
- Professional summary
- Experience timeline with detailed descriptions
- Technology stack tags for each role

### 3. Skills Section
- Dynamic display of Claude Skills Collection
- Category-based filtering
- Interactive skill cards with descriptions
- Statistics overview

### 4. Projects Section
- Featured projects with detailed descriptions
- Technology stack visualization
- Project categories (Fintech, Mobile, AI, Web, Automation)
- Links to GitHub and live demos

### 5. Contact Section
- Contact information with icons
- Functional contact form
- Social media links
- Professional networking options

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## 🔧 Customization

### Personal Information
Update `src/data/index.ts` with your personal details:

```typescript
export const personalInfo: PersonalInfo = {
  name: "Your Name",
  title: "Your Title",
  location: "Your Location",
  email: "your.email@example.com",
  phone: "+1234567890",
  summary: "Your professional summary..."
};
```

### Projects
Add your projects in the `projects` array in `src/data/index.ts`:

```typescript
export const projects: Project[] = [
  {
    id: "project-1",
    title: "Project Title",
    description: "Project description...",
    techStack: ["React", "TypeScript", "Node.js"],
    category: "web",
    githubUrl: "https://github.com/username/repo",
    liveUrl: "https://your-project.com"
  }
];
```

### Skills Data
The skills section automatically loads from the Claude Skills Collection. To update:

1. Run the skills CLI to regenerate data:
   ```bash
   cd ../
   node dist/cli.js list > portfolio/src/data/skills.json
   ```

2. Restart the development server

## 🎨 Styling

### Colors
The website uses a blue-based color scheme with dark mode support:
- Primary: Blue (#3B82F6)
- Secondary: Gray tones
- Accent: Purple for AI/ML projects

### Typography
- Primary font: Inter (Google Fonts)
- Responsive text sizing with TailwindCSS

### Animations
- Framer Motion for smooth transitions
- Hover effects on interactive elements
- Scroll-triggered animations
- Loading states and micro-interactions

## 📱 Responsive Design

- **Mobile**: Optimized for phones (320px+)
- **Tablet**: Adapted for tablets (768px+)
- **Desktop**: Full experience (1024px+)

## 🌙 Dark Mode

- Automatic detection of system preference
- Manual toggle in header
- Persistent preference in localStorage
- Smooth transitions between themes

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Upload `out` folder to Netlify
3. Configure redirects for SPA routing

### Other Platforms
The project builds to static files and can be deployed to any static hosting service.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Contact

**Or Delevski**
- Email: ordi1985@gmail.com
- Phone: +972-54-7917154
- Location: Ramat-Gan, Israel

---

Built with ❤️ using Next.js, TypeScript, and TailwindCSS