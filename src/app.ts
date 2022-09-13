import express, { Request, Response } from 'express';

const app = express();

app.get('/', (_req: Request, res: Response) => res.send('Hello, World!'));

app.use(express.json());

export default app;
