# Market Items API

Backend API for serving product details, built with **NestJS** following **Hexagonal Architecture** principles.

### Badges

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/c0dejohn/market-items-challenge/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/c0dejohn/market-items-challenge/tree/main)
![SonarCloud Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=c0dejohn_market-items-challenge&metric=alert_status)
![SonarCloud Coverage](https://sonarcloud.io/api/project_badges/measure?project=c0dejohn_market-items-challenge&metric=coverage)

## 🚀 Features

*   **Hexagonal Architecture**: Strict separation between Domain, Application, and Infrastructure layers.
*   **Repository Pattern**: Data persistence is decoupled from business logic. Currently using a **File-Based Adapter** (`items.json`) to simulate a database.
*   **High Quality Standards**:
    *   **>90% Test Coverage** (Unit & Integration).
    *   **SOLID** Principles applied (Dependency Inversion, Single Responsibility).
    *   **Conventional Commits** enforced.

## 📂 Project Structure

```
src/
├── items/
│   ├── domain/                 # Pure Business Logic
│   │   ├── item.model.ts       # Domain Entity
│   │   └── items.repository.interface.ts # Port (Interface)
│   ├── infrastructure/         # Adapters & external world
│   │   └── persistence/
│   │       └── json-file-items.repository.ts # Adapter (File System)
│   ├── controllers/            # Entry Point Adapters
│   │   └── items.controller.ts # REST API Adapter
│   └── services/               # Application Service
│       └── items.service.ts    # Use Cases Orchestration
```

## 🛠️ Setup & Installation

1.  Navigate to the project directory:
    ```bash
    cd market-items
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the application:
    ```bash
    # Development
    npm run start:dev

    # Production
    npm run start:prod
    ```

## ✅ Testing

This project maintains a high coverage threshold (>90%).

```bash
# Unit & Integration Tests
npm run test

# Coverage Report
npm run test:cov
```

## 🏗️ Architecture Decisions (ADR)

See [docs/adr](docs/adr) for detailed records:
*   [ADR-001](docs/adr/001-hexagonal-architecture.md): Adoption of Hexagonal Architecture.
*   [ADR-002](docs/adr/002-file-persistence-strategy.md): File-Based Persistence Strategy.
