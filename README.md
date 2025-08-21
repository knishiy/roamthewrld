# Roam The World - Smart Bracelet Project

A Next.js web application showcasing the development journey of a smart bracelet with advanced sensor technology.

## 🚀 Features

- **Interactive Product Showcase**: Dynamic slider between bracelet and sensor views
- **Development History**: Comprehensive timeline of prototype iterations
- **Responsive Design**: Modern UI with smooth animations using Framer Motion
- **Mobile-First**: Optimized for all device sizes

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.4
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Language**: TypeScript
- **Deployment**: GitHub Pages

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/[your-username]/roamthewrld.git
   cd roamthewrld
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Building for Production

```bash
npm run build
```

The built files will be in the `out/` directory.

## 🚀 Deployment to GitHub Pages

### Automatic Deployment (Recommended)

1. **Push to main branch**: The GitHub Actions workflow will automatically build and deploy your site
2. **Enable GitHub Pages**: Go to your repository Settings → Pages
3. **Source**: Select "GitHub Actions" as the source

### Manual Deployment

```bash
npm run deploy
```

## ⚙️ Configuration

### Next.js Config
- `output: 'export'` - Enables static export for GitHub Pages
- `trailingSlash: true` - Adds trailing slashes for better compatibility
- `images.unoptimized: true` - Required for static export
- `basePath` - Configured for GitHub Pages repository name

### Environment Variables
No environment variables required for basic functionality.

## 📁 Project Structure

```
roamthewrld/
├── app/                    # Next.js app directory
│   ├── features/          # Feature pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── public/                # Static assets
│   ├── images/            # Project images
│   └── .nojekyll          # GitHub Pages config
├── .github/workflows/     # GitHub Actions
└── next.config.ts         # Next.js configuration
```

## 🔧 Customization

### Adding New Features
1. Create new components in the `app/` directory
2. Update navigation in `app/page.tsx`
3. Add corresponding sections with proper IDs

### Styling
- Uses Tailwind CSS for utility-first styling
- Custom animations via Framer Motion
- Responsive breakpoints: `sm:`, `md:`, `lg:`, `xl:`

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 📞 Support

For questions or support, please open an issue in the GitHub repository.

---

**Built with ❤️ using Next.js and Tailwind CSS**
