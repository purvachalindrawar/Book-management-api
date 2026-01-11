import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Basic route to verify setup
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Book Management API is running' });
});

// Error handling middleware placeholder (will be enhanced later)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

export default app;
