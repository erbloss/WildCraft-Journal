# 🌿 WildCraft Journal

A full-stack foraging journal built with **React**, **Vite**, and **Supabase** that allows users to securely document and organize their wild food discoveries.

Users can create an account, log in securely, record foraging observations, upload photos, and manage their own private collection of journal entries.

---

## 📸 Screenshots

### Dashboard
![Dashboard](https://github.com/erbloss/WildCraft-Journal/tree/main/GatherWild-Journal/screenshots/dashboard.png)

### Create Journal Entry
![Create Entry](https://github.com/erbloss/WildCraft-Journal/tree/main/GatherWild-Journal/screenshots/create-entry.png)

---

## ✨ Features

- Secure user authentication with Supabase Auth
- Private journal entries protected with Row Level Security (RLS)
- Create, edit, and delete journal entries
- Upload and store images using Supabase Storage
- Species autocomplete for commonly foraged plants and mushrooms
- Responsive dashboard displaying journal cards
- Default placeholder image when no photo is provided
- Mobile-friendly layout

---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- React Router
- JavaScript (ES6+)
- CSS3

### Backend
- Supabase
- PostgreSQL
- Supabase Authentication
- Supabase Storage
- Row Level Security (RLS)

---

## 📂 Project Structure

```text
src/
│
├── assets/
├── components/
│   ├── journal/
│   └── layout/
│
├── features/
│   ├── auth/
│   └── journal/
│
├── lib/
├── services/
├── styles/
└── utils/
```

---

## 🔐 Authentication

Users can:

- Create an account
- Log in securely
- Log out
- View only their own journal entries

Database security is enforced using Supabase Row Level Security policies, ensuring each user can only access their own data.

---

## 🌱 Journal Entries

Each entry can include:

- Species name
- Date found
- Location
- Notes
- Uploaded photo

The dashboard presents each entry as a responsive card for quick browsing.

---

## 📷 Image Storage

Images are uploaded directly to Supabase Storage.

If a journal entry does not include an image, a default placeholder illustration is displayed.

---

## 🚀 Getting Started

Clone the repository

```bash
git clone https://github.com/erbloss/GatherWild-Journal.git
```

Navigate into the project

```bash
cd GatherWild-Journal
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

Run the development server

```bash
npm run dev
```

---

## Future Improvements

- Search journal entries
- Filter by species
- Interactive map of discoveries
- Favorite species
- Weather data for each observation
- Offline support
- AI-assisted species suggestions
- Export journal as PDF

---

## What I Learned

This project strengthened my experience with:

- Building component-based React applications
- React Router navigation
- React hooks and state management
- Supabase Authentication
- PostgreSQL databases
- Secure database access with Row Level Security
- File uploads using Supabase Storage
- Responsive UI design
- Organizing larger React projects into reusable features and components

---

## Author
**Ryan Bloss**
GitHub: https://github.com/erbloss

