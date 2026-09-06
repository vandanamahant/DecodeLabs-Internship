# DecodeLabs Full Stack Project 1: Responsive Frontend Interface

Welcome to Project 1 of the Full Stack Development Industrial Training Kit by **DecodeLabs (Batch: 2026)**. This project focuses on building a modern, highly adaptable, and accessible responsive frontend interface using pure HTML5, CSS3, and JavaScript without relying on heavy frameworks.

---

## 🚀 Execution Roadmap & Features

1. **Strategy & Discovery (Step 1 & 2):**
   - Designed following a mobile-first paradigm and low-fidelity wireframing hierarchy.
   - Focused on structural layout flow and user accessibility.

2. **Semantic Integrity (Step 3):**
   - Utilized proper HTML5 semantic landmarks (`<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`) to ensure optimal AI and screen-reader compatibility.

3. **Styling & 2025 Aesthetics (Step 4):**
   - Implemented **CSS Grid** for macro layout floor-plans and **Flexbox** for micro-component alignment.
   - Applied a warm, grounded 2025 color palette:
     - **Mocha Mousse (`#A8956F`)** - Stability
     - **Ethereal Blue (`#A0D4E0`)** - Trust
     - **Moonlit Grey (`#F2F0EA`)** - Refinement

4. **Logic & Interactivity (Step 5):**
   - Integrated lightweight JavaScript for dynamic state changes and responsive navigation toggles.

5. **Performance & Accessibility Audit (Step 6):**
   - Verified via Lighthouse with high scores across Performance, Accessibility, Best Practices, and SEO.

---

## 🛠️ Project 2 & 3: Secure Backend API & Gateway Resilience

1. **Backend API Development:**
   - Built a robust server using **Node.js** and **Express.js** to handle application logic and data flow.
   - Implemented RESTful architecture with clean noun-based routing (`/users`).

2. **API Endpoints & HTTP Methods:**
   - **GET (`/users`):** Retrieve the list of users safely.
   - **POST (`/users`):** Create a new user with syntactic and advanced semantic validation (email format verification).
   - **PUT (`/users/:id`):** Update existing user details.
   - **DELETE (`/users/:id`):** Remove a user (restricted to admins).

3. **Security & Resilience:**
   - **Authentication (AuthN):** Protected routes using token verification via environment variables (`.env`).
   - **Authorization (AuthZ):** Role-based access control ensuring only `admin` roles can delete records.
   - **Rate Limiting:** Integrated `express-rate-limit` to guard against DDoS and spam requests, fulfilling API Gateway resilience concepts.

4. **Relational Database & Security Integration (Project 3):**
   - Replaced in-memory data arrays with a persistent **MySQL relational database** managed via a high-performance connection pool (`config/db.js`).
   - Implemented a structured schema (`users` and `orders` tables) linked via Foreign Key constraints (`ON DELETE CASCADE`) to preserve referential integrity.
   - Automated schema setup using a dedicated execution script (`initDb.js` and `schema.sql`).
   - **SQL Injection Defense:** Enforced **Parameterized Queries (`?` placeholders)** across all database queries, ensuring user-submitted inputs are treated strictly as data rather than executable statements.
   - **Data Integrity:** Enforced schema-level constraints including `PRIMARY KEY`, `AUTO_INCREMENT`, `UNIQUE`, and `NOT NULL`.

---

## 📁 Project Structure

```text

DecodeLabs-Project1/
├── index.html                  # Main semantic markup (Project 1)
├── style.css                   # CSS Grid, Flexbox & 2025 Palette styling
├── script.js                   # Basic state management & interactivity
└── decodelabs-backend/         # Backend API Directory (Project 2 & 3)
    ├── config/                 # Configuration folder
    │   └── db.js               # MySQL connection pool configuration
    ├── server.js               # Express server, CRUD routes & validation
    ├── schema.sql              # Relational database tables (users & orders)
    ├── initDb.js               # Database schema initialization script
    ├── .env                    # Environment variables (Port & Secret Token)
    ├── .gitignore              # Excludes node_modules and .env from git
    └── package.json            # Backend dependencies & scripts

```

---

## 🛠️ How to Run
* **Frontend (Project 1):**
1. Open the project folder in **Visual Studio Code**.
2. Install and run via **Live Server** extension.
3. View the responsive interface live in your browser at `http://123.0.0.1:55000`.

* **Backend (Project 2 & 3):** 
1. Navigate to the backend folder:

```
cd decodelabs-backend
```

2. Install dependencies:

```
npm install
```
3. Run the database initialization script:

```
node initDb.js
```

4. Run the server:

```
node server.js
```

5. Test endpoints in Postman using proper headers 
(Authorization: xyz and role: admin).
 
---

## 👨‍💻 Author
* **Vandana Mahant**

---

© 2026 DecodeLabs Internship Program. Designed with 2025 Aesthetics.