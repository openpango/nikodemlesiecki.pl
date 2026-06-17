# Nikodem Lesiecki — Portfolio & Résumé Website

Bilingual (EN/PL), CMS-driven portfolio website for Nikodem (Nico) Lesiecki, built with Next.js 14, Tailwind CSS, GSAP, and Sanity CMS.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v3
- **Animations**: GSAP + ScrollTrigger, Framer Motion
- **CMS**: Sanity v3 (Embedded Studio)
- **Email**: Resend
- **Analytics**: Vercel Analytics

## Local Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Copy the example environment file and fill in your keys:
   ```bash
   cp .env.local.example .env.local
   ```
   *Note: You need to create a project at [sanity.io](https://sanity.io) to get the `NEXT_PUBLIC_SANITY_PROJECT_ID`.*

3. **Run the development server**:
   ```bash
   npm run dev
   ```

## Sanity CMS Studio
The Sanity Studio is embedded directly into the application.
- Access it locally at: [http://localhost:3000/studio](http://localhost:3000/studio)
- First time setup: Create a new "Site Settings" document to configure the global site content.

### Adding your Sanity CORS Origins
Before the Studio can connect to your dataset from a browser, you must add your local and production URLs to the Sanity CORS origins list at [manage.sanity.io](https://manage.sanity.io).
- `http://localhost:3000`
- `https://nikodemlesiecki.pl`

## Deployment
This project is optimized for deployment on Vercel.
1. Connect your GitHub repository to Vercel.
2. Add all environment variables from `.env.local` to the Vercel project settings.
3. Deploy!

### On-Demand ISR (Webhooks)
To update the live site immediately when publishing changes in Sanity:
1. Generate a random secret string and add it to Vercel as `SANITY_WEBHOOK_SECRET`.
2. In Sanity project settings (manage.sanity.io), create a new webhook:
   - URL: `https://nikodemlesiecki.pl/api/revalidate`
   - Secret: Your random secret string
   - Trigger on: Create, Update, Delete

## Adding Your Profile Photo
Place your high-resolution profile photo at `public/images/nico-profile.jpg`, or alternatively, upload it via the Sanity Studio and link it in the Site Settings.
