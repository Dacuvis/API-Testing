# API Documentation

Base URL:
http://localhost:3000

---

## AI

### Chat with AI
POST /ai/chat

Description:
Send a message to AI chat endpoint.

Example:
```bash
curl -X POST http://localhost:3000/ai/chat \
-H "Content-Type: application/json" \
-d '{
  "message": "Hello AI"
}'
```

---

## Authentication

### Register User
POST /auth/register

Description:
Register a new user account.

Example:
```bash
curl -X POST http://localhost:3000/auth/register \
-H "Content-Type: application/json" \
-d '{
  "email": "test@mail.com",
  "password": "123456"
}'
```

### Get User Profile
GET /auth/profile/{id}

Description:
Get user profile by ID.

Example:
```bash
curl http://localhost:3000/auth/profile/1
```

---

## News

### CNN News
GET /news/cnn

Description:
Get latest CNN news.

Example:
```bash
curl http://localhost:3000/news/cnn
```

---

### Tempo News
GET /news/tempo

Description:
Get latest Tempo news.

Example:
```bash
curl http://localhost:3000/news/tempo
```

---

### Search CNN News
GET /news/cnn/search

Description:
Search CNN news.

Example:
```bash
curl "http://localhost:3000/news/cnn/search?q=tech"
```

---

### Search Tempo News
GET /news/tempo/search

Description:
Search Tempo news.

Example:
```bash
curl "http://localhost:3000/news/tempo/search?q=politik"
```
