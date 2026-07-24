# 12MegaBlog

A React + Vite blog platform powered by Appwrite for authentication, content storage, and image upload.

## Features

- User authentication with Appwrite signup/login
- Create, edit, and delete blog posts
- Rich text editor for post content
- Featured image upload and preview using Appwrite Storage
- Post search and filtering on home and all-posts pages
- Protected routes for authenticated users
- Responsive UI built with Tailwind-inspired styling

## Tech Stack

- React 19
- Vite
- React Router DOM v7
- React Hook Form
- Redux Toolkit
- Appwrite SDK
- TinyMCE rich text editor
- ESLint

## App Architecture

- `src/main.jsx` — application entry point and route configuration
- `src/App.jsx` — root app wrapper and current user loader
- `src/appwrite/config.js` — Appwrite service client and database/storage helper
- `src/appwrite/auth.js` — authentication service for Appwrite account sessions
- `src/pages/` — home, auth, post management, and detail pages
- `src/components/` — reusable UI components and form building blocks
- `src/store/` — Redux state management for auth

## Routes

- `/` — public home page with latest posts and search
- `/login` — login page
- `/signup` — signup page
- `/all-posts` — authenticated page to browse all posts
- `/add-post` — authenticated page to create a new post
- `/edit-post/:id` — authenticated page to edit an existing post
- `/post/:id` — public post detail page

## Setup

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file in the project root and add your Appwrite configuration:

```env
VITE_APPWRITE_URL=https://<YOUR_APPWRITE_ENDPOINT>
VITE_APPWRITE_PROJECT_ID=<YOUR_APPWRITE_PROJECT_ID>
VITE_APPWRITE_DATABASE_ID=<YOUR_APPWRITE_DATABASE_ID>
VITE_APPWRITE_COLLECTION_ID=<YOUR_APPWRITE_COLLECTION_ID>
VITE_APPWRITE_BUCKET_ID=<YOUR_APPWRITE_BUCKET_ID>
```

3. Start the development server

```bash
npm run dev
```

4. Open the local Vite URL shown in the terminal

## Appwrite Configuration

This app expects the following Appwrite resources:

- Appwrite Project
- Database
- Collection for posts
- Storage bucket for featured images
- Email/password authentication enabled

### Required environment variables

- `VITE_APPWRITE_URL`
- `VITE_APPWRITE_PROJECT_ID`
- `VITE_APPWRITE_DATABASE_ID`
- `VITE_APPWRITE_COLLECTION_ID`
- `VITE_APPWRITE_BUCKET_ID`

> Do not commit Appwrite credentials to source control.

## Usage

- Sign up or log in to access protected pages
- Create a new post from `/add-post`
- Upload a featured image when publishing a post
- Edit existing posts from the post detail view if you are the author
- Delete a post from its detail view
- Search posts by title or content on the home and all-posts pages

## Scripts

- `npm run dev` — start development server
- `npm run build` — build production assets
- `npm run preview` — preview the built app locally
- `npm run lint` — run ESLint

## Notes

- Post creation requires a featured image upload
- Authenticated routes are protected using `AuthLayout`
- The app loads the current Appwrite session on initial mount and updates Redux auth state

## License

This project is provided as-is.
