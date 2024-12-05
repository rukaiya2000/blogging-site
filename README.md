# Blogging Website - Open blogging platform for everyone

Open Media is a user-friendly blogging website where you can share your thoughts, connect with other writers, and stay updated with the latest news.

## [Visit My Website](https://blogging-site-next.vercel.app/)

## Features

- **User Authentication:**
  - Sign in using Google or Email.
  - Secure authentication system to protect user accounts.

- **Blog Creation:**
  - Easy-to-use interface for writing and publishing blogs.
  - Markdown support for rich text formatting.
  - Comment on and like posts from other users.

- **News Feed:**
  - Stay informed with a curated news feed.
  - Explore trending topics and discover new content.

- **Search Functionality:**
  - Effortlessly find blogs or news articles using the search feature.

## Features

- **Frontend: NextJs**

- **Database: Firestore**

- **Authentication: Firebase Authentication**

- **External APIs: News API for fetching news articles**

## Getting Started

1. **Clone the Repository:**
   ```
   git clone https://github.com/rukaiya2000/blogging-site

2. **Install Dependencies:**
   ```
   cd blogging-site-next
   npm install
   ```

3. **Set up Environment Variables:**
    *Envirnoment Vars Template:*
    ```
    NEXT_PUBLIC_FIREBASE_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxxxxxxx.firebaseapp.com
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxxxxxx
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxxxxxx.appspot.co
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxxxxxx
    NEXT_PUBLIC_FIREBASE_APP_ID=xxxxxxxxxxxxxx
    NEWS_API_BASE_URL=https://newsapi.org/v2/
    NEWS_API_KEY=xxxxxxxxxxxxxxxxxxxxx
    RANDOM_FOOD_MEAL_URL=xxxxxxxxxxxxxxxxxxx
    ```

4. **Run in Development Mode:**
   ```
   npm run dev
   ```

5. **Run in Production Mode:**
   ```bash
   npm run build
   npm run start
   ```
