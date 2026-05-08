# Hacker News Web Scraper Backend

Node.js, Express, MongoDB, and JWT backend for scraping the top Hacker News stories and bookmarking them per user.

## Features

- Scrapes the top 10 stories from Hacker News on server start.
- Manual scrape trigger with `POST /api/scrape`.
- JWT authentication with register and login endpoints.
- Story listing sorted by points in descending order.
- Pagination with `GET /api/stories?page=1&limit=10`.
- Authenticated bookmark toggle.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Make sure MongoDB is running locally, or update `MONGO_URI` in `.env`.

## Environment Variables

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/web_scraper
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=7d
HACKER_NEWS_URL=https://news.ycombinator.com
SCRAPE_LIMIT=10
```

## API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

Register body:

```json
{
  "name": "Tejas",
  "email": "tejas@example.com",
  "password": "password123"
}
```

Login body:

```json
{
  "email": "tejas@example.com",
  "password": "password123"
}
```

### Scraper

- `POST /api/scrape`

### Stories

- `GET /api/stories`
- `GET /api/stories?page=1&limit=10`
- `GET /api/stories/:id`
- `POST /api/stories/:id/bookmark`
- `GET /api/stories/bookmarks/me`

Authenticated routes require:

```http
Authorization: Bearer <token>
```
