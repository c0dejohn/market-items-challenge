# 2. File-Based Persistence Strategy for MVP

Date: 2026-01-11

## Status

Accepted

## Context

For the MVP/Challenge, utilizing a real database system is restricted or optional, and a "simulation" via local files is requested. We need a way to persist/read data that mimics a DB but uses `items.json`.

## Decision

Implement a **File-Based Repository Adapter** (`JsonFileItemsRepository`).
This adapter will:
1.  Read the `data/items.json` file from disk on initialization or request.
2.  Parse the JSON content into Domain Entities.
3.  Simulate asynchronous database latency if needed.

## Consequences

*   **Positive**: Meets challenge requirements without external dependencies (Docker, Mongo).
*   **Negative**: Not suitable for high concurrency or write-heavy loads (locking issues). Accepted for read-heavy MVP.
