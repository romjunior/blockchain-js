import { json } from 'body-parser';
import express, { Express, NextFunction, Request, Response } from 'express';
import { env } from 'process';

const app: Express = express();

app.use(json());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
});

app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});