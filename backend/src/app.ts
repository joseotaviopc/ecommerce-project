import express from 'express';
import cors from 'cors';
import connectDB from './config/db';

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get('/api/status', (req, res) => {
    res.json({ message: 'API is running...' });
});

export default app;
