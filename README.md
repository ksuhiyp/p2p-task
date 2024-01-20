# Project Overview
This project is an implementation of a distributed order book system using the service-oriented architecture provided by the svc CLI tool. The system is designed such that each client has its own instance of the order book and can submit orders to it. These orders are then distributed to other instances of the order book.

## Key Features
### Order Matching:
If a client's order matches with another order, any remainder is added back to the order book. This ensures that all orders are fully executed.

### Implementation Details:

The system was implemented using the svc CLI tool, which provides a framework for building service-oriented architectures. The order book was implemented as a simple buy/sell order system.

One of the main challenges faced during the implementation was figuring out how to communicate between workers using the pub/sub pattern in the svc architecture. While basic Grenache scripts provide a way to communicate between workers, they were not sufficient for this project.

To solve this problem, the system was designed to sync the order book status by emitting it after each order execution. This ensures that all workers have a consistent view of the order book.

Additionally, to ensure the consistency of the distributed order book, the state of the order book is written to the DHT using Grenache's put method. This creates a versioned history of the order book, ensuring that clients always get the updated version and cannot mutate a version that has already been written.

### Challenges:
Lack of IntelliSense: As the project is implemented in JavaScript, not TypeScript, there was a lack of IntelliSense support which made the development process more challenging.

Insufficient Documentation: The documentation for the bfx-wrk-api library was not comprehensive enough, which made it difficult to understand how to use it effectively.

### Missing requirements
1- isolating worker for each client

2- syncing orderbook status between different workers
