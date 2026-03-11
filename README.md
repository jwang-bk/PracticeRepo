# PracticeRepo

This repository contains a basic Angular frontend and an ASP.NET Core Web API backend.

## Project Structure

```
PracticeRepo/
├── frontend/   # Angular frontend project
└── backend/    # ASP.NET Core Web API backend project
```

## Running the Frontend

The frontend is a standard Angular application scaffolded with the Angular CLI.

**Prerequisites:** [Node.js](https://nodejs.org/) and [Angular CLI](https://angular.io/cli)

```bash
# Install Angular CLI globally (if not already installed)
npm install -g @angular/cli

# Navigate to the frontend folder
cd frontend

# Install dependencies
npm install

# Start the development server
ng serve
```

The app will be available at `http://localhost:4200`.

## Running the Backend

The backend is a standard ASP.NET Core Web API scaffolded with the .NET CLI.

**Prerequisites:** [.NET SDK](https://dotnet.microsoft.com/download) (version 10 or later)

```bash
# Navigate to the backend folder
cd backend

# Restore dependencies
dotnet restore

# Run the development server
dotnet run
```

The API will be available at `https://localhost:7xxx` and `http://localhost:5xxx` (the exact ports are shown in the terminal output). The OpenAPI JSON specification is served at `/openapi/v1.json` when running in Development mode.
