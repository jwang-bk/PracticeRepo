# PracticeRepo — Angular + C# Full-Stack App

A full-stack application with an **Angular** frontend and an **ASP.NET Core 10** backend, featuring JWT authentication and role-based access control.

## Project Structure

```
PracticeRepo/
├── Backend/          # ASP.NET Core 10 Web API
│   ├── Controllers/
│   │   ├── AuthController.cs       # Login & Register endpoints
│   │   └── DashboardController.cs  # Protected dashboard endpoints
│   ├── Data/
│   │   └── AppDbContext.cs         # EF Core in-memory database
│   ├── Models/
│   │   ├── AuthResponse.cs
│   │   ├── LoginRequest.cs
│   │   └── RegisterRequest.cs
│   ├── Services/
│   │   └── TokenService.cs         # JWT token generation
│   └── Program.cs                  # App startup + seed data
│
└── frontend/         # Angular 19 standalone app
    └── src/app/
        ├── components/
        │   ├── home/       # Landing page
        │   ├── login/      # Login & register forms
        │   ├── dashboard/  # Protected dashboard with role-based sections
        │   └── nav/        # Navigation bar
        ├── guards/
        │   └── auth-guard.ts       # Route guard (auth + role check)
        ├── interceptors/
        │   └── auth-interceptor.ts # Adds JWT to outgoing requests
        └── services/
            └── auth.ts             # Authentication service (signals)
```

## Features

- ✅ JWT-based authentication (login & register)
- ✅ Role-based authorization (`Admin` and `User` roles)
- ✅ Protected API endpoints via `[Authorize]` and `[Authorize(Roles = "Admin")]`
- ✅ Angular route guards with role enforcement
- ✅ HTTP interceptor to attach Bearer tokens
- ✅ In-memory database with seeded demo users
- ✅ Standalone Angular components (no NgModules)

## Getting Started

### Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/) & npm
- Angular CLI: `npm install -g @angular/cli`

### Run the Backend

```bash
cd Backend
dotnet run
# API available at http://localhost:5000
```

### Run the Frontend

```bash
cd frontend
npm install
ng serve
# App available at http://localhost:4200
```

## Demo Credentials

| Username | Password   | Role  |
|----------|-----------|-------|
| admin    | Admin123! | Admin |
| user     | User123!  | User  |

## API Endpoints

| Method | URL                           | Auth Required | Role  | Description             |
|--------|-------------------------------|---------------|-------|-------------------------|
| POST   | `/api/auth/login`             | No            | -     | Login, returns JWT      |
| POST   | `/api/auth/register`          | No            | -     | Register new user       |
| GET    | `/api/dashboard/summary`      | Yes           | Any   | User dashboard summary  |
| GET    | `/api/dashboard/user-data`    | Yes           | Any   | User task list          |
| GET    | `/api/dashboard/admin-data`   | Yes           | Admin | Admin-only user list    |
