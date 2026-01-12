# ADR 003: Item Detail API Scope and Data Aggregation

## Status
Accepted

## Context
In a microservices architecture like Mercado Libre's ecosystem, a Product Detail Page (PDP) requires data from multiple disparate domains:
- **Catalog**: Core product data (Title, Attributes, Pictures, Description).
- **Inventory/Stock**: Real-time availability (`available_quantity`).
- **Reputation**: Seller information and ratings.
- **Q&A**: User questions and answers.
- **Transactions**: Shipping options, payment methods (`sale_terms`).

When designing the `GET /items/:id` endpoint for this challenge, we must decide whether this service acts as a strictly bounded "Catalog Service" or as an "Aggregator/BFF" (Backend for Frontend).

## Decision
We have decided to model this service primarily as a **Catalog Service** that maintains the "Core Product Entity", but for the purpose of the challenge (serving a complete Item Detail view), it will **simulate** the aggregation of essential external data fields (like basic stock information and condition).

However, we explicitly acknowledge that in a production distributed system:
- **Dynamic Data** (like real-time Stock) should be fetched from an Inventory Service.
- **Seller Data** should be fetched from a Users/Reputation Service.

Therefore, the current `Product` model includes fields like `sold_quantity` and `attributes` (Warranty, etc.) as they are often cached or partly managed within the item's document for read-performance (CQRS), acting as a read-model.

## Consequences
### Positive
- The API provides a "complete enough" JSON response to render a rich Item Detail UI without needing multiple extra backend calls in this demo environment.
- It demonstrates understanding of the complexity of "rich" entities versus "normalized" database rows.

### Negative
- Mixing static catalog data (Description, Title) with fast-changing data (Stock) in the same persistence layer (SQLite/JSON) is not scalable for high-throughput write scenarios (Inventory updates locking the Catalog row).

## Future Improvements
- If this scales, we would split into `Catalog Service` (Write rare, Read often) and `Inventory Service` (High write throughput).
- A **BFF (Gateway)** layer would query both and merge the JSON for the frontend.
