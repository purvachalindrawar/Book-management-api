import { Book } from '../models/book.interface';
import { v4 as uuidv4 } from 'uuid';

// In-memory storage
let books: Book[] = [];

export class BookService {
    public findAll(): Book[] {
        return books;
    }

    public findById(id: string): Book | undefined {
        return books.find((book) => book.id === id);
    }

    public create(data: Omit<Book, 'id'>): Book {
        const newBook: Book = {
            id: uuidv4(),
            ...data,
        };
        books.push(newBook);
        return newBook;
    }

    public update(id: string, data: Partial<Omit<Book, 'id'>>): Book | undefined {
        const bookIndex = books.findIndex((book) => book.id === id);
        if (bookIndex === -1) return undefined;

        const updatedBook = { ...books[bookIndex], ...data };
        books[bookIndex] = updatedBook;
        return updatedBook;
    }

    public delete(id: string): boolean {
        const bookIndex = books.findIndex((book) => book.id === id);
        if (bookIndex === -1) return false;

        books.splice(bookIndex, 1);
        return true;
    }
}
