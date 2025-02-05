import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import setupSwagger from './swagger';

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get('/api/status', (req, res) => {
    res.json({ message: 'API is running...' });
});

setupSwagger(app);

export default app;
