import { Router } from 'express';
import { BookController } from '../controllers/book.controller';

import multer from 'multer';

const router = Router();
const bookController = new BookController();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/import', upload.single('file'), bookController.importBooks.bind(bookController));

router.get('/', bookController.getBooks.bind(bookController));
router.get('/:id', bookController.getBookById.bind(bookController));
router.post('/', bookController.createBook.bind(bookController));
router.put('/:id', bookController.updateBook.bind(bookController));
router.delete('/:id', bookController.deleteBook.bind(bookController));

export default router;
