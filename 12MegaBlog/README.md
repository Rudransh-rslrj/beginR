# 12MegaBlog

A minimal React + Vite blog starter using Appwrite (Tables & Storage) for backend. This project implements post CRUD, image uploads to Appwrite Storage, and a simple auth flow.

## Quick start

Prerequisites:
- Node.js 16+ and npm
- An Appwrite project with a Database (Tables), Collection, and Storage bucket

1. Install dependencies

```bash
npm install
```

2. Configure Appwrite environment

Create a `.env` file or set environment variables used by Vite. Keys (used in source at `src/conf/conf.js`):

- `VITE_APPWRITE_URL` — Appwrite endpoint (e.g. `http://localhost/v1`)
- `VITE_APPWRITE_PROJECT_ID` — Appwrite project id
- `VITE_APPWRITE_DATABASE_ID` — Database id
- `VITE_APPWRITE_COLLECTION_ID` — Collection id for posts
- `VITE_APPWRITE_BUCKET_ID` — Storage bucket id for images

3. Run the dev server

```bash
npm run dev
```

4. Build for production

```bash
npm run build
```

## Notes about Appwrite and images

- The code stores uploaded image file IDs on the post row under the `featuredimage` field (lowercase). Do not rename that field unless you update the code.
- To display images without requiring Appwrite image transformations (blocked on some plans), the service helper `getFilePreview(fileId)` routes to Appwrite's `getFileView(...)` so components can call `appwriteService.getFilePreview(...)` without requesting transformations.

## Where to look in the code

- Appwrite client and helpers: `src/appwrite/config.js`
- Appwrite environment mapping: `src/conf/conf.js`
- Main app entry: `src/main.jsx`
- Components: `src/components/` (PostCard, PostForm, Login, Signup, etc.)
- Pages: `src/pages/` (Home, AllPosts, Post, AddPost, EditPost)

## Troubleshooting

- If images show a 403 error about transformations, ensure `getFilePreview` in `src/appwrite/config.js` uses `getFileView` (no transform params). This project already applies that change.
- If posts do not appear, verify the `status` field in your rows is `active` (the app filters by Query.equal('status','active')).

If you want a different default color scheme or centralized tokens, I can add a small `src/styles/tokens.css` or Tailwind config change.
