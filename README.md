# Book Management REST API

A robust RESTful API for managing a book collection, built with **Node.js**, **Express**, and **TypeScript**. 
This project follows strictly typed MVC architecture and includes features like **Bulk CSV Import** with manual validation.

## 🚀 Features

- **CRUD Operations**: Create, Read, Update, Delete books.
- **Bulk Import**: Upload CSV files to add multiple books at once.
- **Manual Validation**: Custom CSV parsing logic (no third-party CSV libraries).
- **Type Safety**: Fully written in TypeScript.
- **Unit Tests**: Integration tests using Jest and Supertest.
- **Logging**: HTTP request logging via Morgan.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Utilities**: Multer (File Upload), Morgan (Logging), UUID (ID generation)
- **Testing**: Jest, Supertest

## 📦 Setup Instructions

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-username/book-management-api.git
    cd book-management-api
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env` file in the root directory (or copy the example).
    ```bash
    cp .env.example .env
    ```
    *Ensure `PORT=3000` is set in `.env`.*

4.  **Start the Server**
    *   **Development Mode** (with hot-reload):
        ```bash
        npm run dev
        ```
    *   **Production Build**:
        ```bash
        npm run build
        npm start
        ```

## 🧪 Running Tests

To run the automated integration tests:
```bash
npm test
```

## 📚 API Endpoints

| Method | Endpoint | Description | Body / Params |
| :--- | :--- | :--- | :--- |
| `GET` | `/books` | Get list of all books | - |
| `GET` | `/books/:id` | Get details of a specific book | `id`: UUID |
| `POST` | `/books` | Add a new book | `{ "title": "...", "author": "...", "publishedYear": 2023 }` |
| `PUT` | `/books/:id` | Update an existing book | `{ "title": "..." }` (Partial updates allowed) |
| `DELETE` | `/books/:id` | Delete a book | `id`: UUID |
| `POST` | `/books/import`| Bulk import books from CSV | **Form-Data**: Key=`file`, Value=`your-file.csv` |

### CSV Format for Import
The CSV file must have headers: `Title`, `Author`, `PublishedYear`.
```csv
Title,Author,PublishedYear
"Clean Code","Robert C. Martin",2008
"The Great Gatsby","F. Scott Fitzgerald",1925
```

## 📝 Manual Testing (Curl)

**Create a Book:**
```bash
curl -X POST http://localhost:3000/books \
     -H "Content-Type: application/json" \
     -d '{"title":"Test Book", "author":"Me", "publishedYear":2024}'
```

**Get All Books:**
```bash
curl http://localhost:3000/books
```
