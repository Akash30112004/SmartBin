# SmartBin – Smart Waste Management System

## Overview
SmartBin is a full-stack application that monitors and manages waste bins using real-time data. It provides analytics, alerts, and efficient waste collection tracking.

## Tech Stack
- Frontend: React (Vite)
- Backend: Node.js, Express
- Database: PostgreSQL
- Auth: JWT + bcrypt

## Features
- User authentication (JWT-based login)
- Secure password hashing (bcrypt)
- Dashboard with bin analytics
- Real-time updates (WebSocket)
- Protected API routes

## Architecture
Frontend → REST API → Backend → Database

## API Endpoints
- POST /api/v1/auth/login
- GET /api/v1/bins
- GET /api/v1/analytics

## Setup

### Backend
```bash
cd binBackend
npm install
npm run dev
