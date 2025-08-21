# 🚀 GitHub Pages Deployment Guide

This guide will walk you through deploying your Next.js app to GitHub Pages.

## 📋 Prerequisites

- GitHub account
- Git installed on your local machine
- Node.js and npm installed

## 🔧 Setup Steps

### 1. Create GitHub Repository

1. **Go to GitHub.com** and sign in
2. **Click the "+" icon** in the top right corner
3. **Select "New repository"**
4. **Repository name**: `roamthewrld`
5. **Description**: `Smart bracelet project showcase website`
6. **Visibility**: Choose Public or Private (Public recommended for GitHub Pages)
7. **Initialize with**: Don't add README, .gitignore, or license (we already have these)
8. **Click "Create repository"**

### 2. Update Package.json Homepage

**IMPORTANT**: Replace `[your-username]` with your actual GitHub username in `package.json`:

```json
"homepage": "https://your-actual-username.github.io/roamthewrld"
```

### 3. Initialize Git and Push to GitHub

```bash
# Initialize git repository
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit: Smart bracelet project website"

# Add remote origin (replace with your username)
git remote add origin https://github.com/your-username/roamthewrld.git

# Push to main branch
git push -u origin main
```

### 4. Enable GitHub Pages

1. **Go to your repository** on GitHub
2. **Click "Settings"** tab
3. **Scroll down to "Pages"** section
4. **Source**: Select "GitHub Actions"
5. **Click "Save"**

### 5. Verify Deployment

The GitHub Actions workflow will automatically:
1. **Build** your Next.js app
2. **Export** static files
3. **Deploy** to GitHub Pages

**Wait 2-5 minutes** for the first deployment to complete.

## 🌐 Access Your Site

Your site will be available at:
```
https://your-username.github.io/roamthewrld
```

## 🔄 Updating Your Site

### Automatic Updates (Recommended)

1. **Make changes** to your code
2. **Commit and push** to GitHub:
   ```bash
   git add .
   git commit -m "Update: [describe your changes]"
   git push
   ```
3. **GitHub Actions** will automatically rebuild and deploy

### Manual Updates

```bash
npm run build
git add .
git commit -m "Update: [describe your changes]"
git push
```

## 🛠️ Troubleshooting

### Build Failures

- **Check GitHub Actions** tab in your repository
- **Verify ESLint errors** are fixed locally first
- **Check Node.js version** (should be 18+)

### Site Not Loading

- **Wait 5-10 minutes** after first deployment
- **Check repository settings** → Pages → Source is set to "GitHub Actions"
- **Verify .nojekyll file** exists in the `out/` directory

### Image Loading Issues

- **Ensure images** are in `public/images/` directory
- **Check file paths** in your code match actual filenames
- **Verify image formats** are web-compatible (PNG, JPG, SVG)

## 📁 Repository Structure After Deployment

```
roamthewrld/
├── .github/workflows/     # GitHub Actions
├── app/                   # Next.js app code
├── public/                # Static assets
├── out/                   # Built static files (auto-generated)
├── next.config.ts         # Next.js config
├── package.json           # Dependencies and scripts
├── README.md              # Project documentation
├── DEPLOYMENT.md          # This file
└── .gitignore            # Git ignore rules
```

## 🔗 Useful Links

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Actions](https://docs.github.com/en/actions)

## 📞 Support

If you encounter issues:
1. **Check GitHub Actions** logs for error details
2. **Verify all prerequisites** are met
3. **Ensure file paths** and configurations are correct
4. **Check GitHub Pages** status in repository settings

---

**Happy Deploying! 🎉**
