import { Router } from 'express';
import { BookController } from '../controllers/book.controller';

const router = Router();
const bookController = new BookController();

router.get('/', bookController.getBooks.bind(bookController));
router.get('/:id', bookController.getBookById.bind(bookController));
router.post('/', bookController.createBook.bind(bookController));
router.put('/:id', bookController.updateBook.bind(bookController));
router.delete('/:id', bookController.deleteBook.bind(bookController));

export default router;
