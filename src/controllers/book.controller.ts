import { Request, Response } from 'express';
import { BookService } from '../services/book.service';

const bookService = new BookService();

export class BookController {
    public getBooks(req: Request, res: Response): void {
        const books = bookService.findAll();
        res.status(200).json(books);
    }

    public getBookById(req: Request, res: Response): void {
        const id = req.params.id as string;
        const book = bookService.findById(id);

        if (!book) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }

        res.status(200).json(book);
    }

    public createBook(req: Request, res: Response): void {
        const { title, author, publishedYear } = req.body;

        if (!title || !author || !publishedYear) {
            res.status(400).json({ message: 'Missing required fields: title, author, publishedYear' });
            return;
        }

        const newBook = bookService.create({ title, author, publishedYear });
        res.status(201).json(newBook);
    }

    public updateBook(req: Request, res: Response): void {
        const id = req.params.id as string;
        const { title, author, publishedYear } = req.body;

        const updatedBook = bookService.update(id, { title, author, publishedYear });

        if (!updatedBook) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }

        res.status(200).json(updatedBook);
    }

    public deleteBook(req: Request, res: Response): void {
        const id = req.params.id as string;
        const isDeleted = bookService.delete(id);

        if (!isDeleted) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }

        res.status(204).send();
    }
}
