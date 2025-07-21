# 🗓️ Event Scheduler API

A simple event scheduling backend built with **TypeScript**, **Express.js**, and **Zod**. It allows users to create, retrieve, update, delete, and categorize events — all stored in-memory (no database used for simplicity).

---

## 🔗 Project Links

- **🔴 Server Live**: https://chronofy-server.vercel.app/
- **🌐 Client Live**: [https://your-frontend-url.com](https://your-frontend-url.com)
- **📦 Client GitHub Repo**: [https://github.com/your-username/event-scheduler-client](https://github.com/your-username/event-scheduler-client)

---

## 📌 Features

- Add new events with validation
- List all events sorted by date and time
- Categorize events intelligently
- Filter event by category, and sort events
- Update event status (archive)
- Delete events

---

## 📁 API Endpoints

| Method   | Endpoint     | Description                            |
| -------- | ------------ | -------------------------------------- |
| `GET`    | `/events`    | Get all events (sorted by date & time) |
| `GET`    | `/event/:id` | Get a single event by `id`             |
| `POST`   | `/event`     | Create a new event                     |
| `PUT`    | `/event/:id` | Update archived status of an event     |
| `DELETE` | `/event/:id` | Delete an event                        |

### ➕ Sample Event Schema (Request Body)

```json
{
  "title": "Team Meeting",
  "date": "2025-08-15",
  "time": "14:30",
  "notes": "Discuss quarterly performance"
}


├── src
│   ├── builder/
│   ├── config/
│   ├── error/
│   ├── event/
│   ├── interface/
|   ├── middlewire/
│   ├── router/
│   ├── utills/
│   ├── app.ts/
│   └── index.ts
├── .env
├── .env.example
├── .gitignore
├── .prettierignore
├── .prettierrc.json
├──  Chronofy.postman_collection.json
├── .eslint.config.mjs
├──  package.lock.json
├── package.json
├── README.md
├── vercel.json
└── tsconfig.json
```

## Clone the repository

```
bash
git clone https://github.com/your-username/event-scheduler-backend.git
cd event-scheduler-backend

```

## run the project

```
bash
git clone https://github.com/theabsparrow/Chronofy-server.git
cd Chronofy-server

```

## run the project

```
bash
npm install

```

## Create .env file

```
.env
PORT=5000
NODE_ENV=development

```
