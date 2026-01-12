# 1. Adoption of Hexagonal Architecture

Date: 2026-01-11

## Status

Accepted

## Context

The project requires a flexible backend API that can withstand changes in underlying technologies (like persistence mechanisms) without affecting the core business logic. The current requirement is to read from a file, but future requirements might involve a real database.

## Decision

We will adopt **Hexagonal Architecture (Ports and Adapters)**.

*   **Core Logic**: Isolated in the `domain` layer.
*   **Ports**: Interfaces defined in the `domain` layer (e.g., `ItemsRepository`).
*   **Adapters**: Implementations in the `infrastructure` layer (e.g., `JsonFileItemsRepository` and `ItemsController`).

## Consequences

*   **Positive**: High decoupleability. Changing the database only requires writing a new Adapter.
*   **Negative**: Slightly more boilerplate (interfaces + implementations) than a simple MVC architecture.
