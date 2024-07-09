
# Chatter
## Overview
A vertically scaled chat application utilizing Redis for pub/sub, Docker for containerization, Caddy Server for reverse proxy and automatic HTTPS, written in TypeScript with Fastify and Fastify-Socket.IO.

## Features
- Real-time chat functionality
- Scalability using Redis pub/sub
- Containerized deployment with Docker
- Automatic HTTPS with Caddy Server
- TypeScript for type safety and modern JavaScript features
- Fastify for fast and low overhead HTTP server
- Fastify-Socket.IO for WebSocket support

## System Design
<img src="/assets/system.png" width="" />
<br />

## Pub-Sub
Publish/Subscribe (Pub/Sub) is a messaging pattern where senders (publishers) send messages without knowing who will receive them, and receivers (subscribers) receive messages without knowing who sent them. This decoupling of publishers and subscribers allows for scalable and flexible communication between distributed systems.
### How Pub/Sub is Used in This Application
In this chat application, Redis is used as the Pub/Sub message broker. Here's how it works:

- Publishing Messages: When a user sends a message, the server publishes this message to a Redis channel.
- Subscribing to Messages: All connected clients subscribe to the Redis channel. When a new message is published, Redis sends it to all subscribers.

### Implementation Details
In the application, the following modules handle Pub/Sub:

- Publisher: When a user sends a message, the server uses Redis to publish the message to a specific channel.
- Subscriber: All connected clients are subscribed to the Redis channel. They listen for new messages and update the chat interface accordingly.
This design ensures that the application can scale efficiently, as Redis handles the distribution of messages to all clients.

## Badges
![Visual Studio](https://img.shields.io/badge/Visual%20Studio-5C2D91.svg?style=for-the-badge&logo=visual-studio&logoColor=white) ![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white) ![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Frontend
```bash
  cd ui
```
```bash
  pnpm i
```
Backend
```bash
  cd server
```
```bash
  pnpm i
```

Start the server

```bash
  pnpm dev
```
For Docker
```bash
./run.sh
```



## Authors

- [para-docx](https://www.github.com/para-docx)

