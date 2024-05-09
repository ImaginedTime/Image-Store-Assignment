import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

import userRoutes from './routes/user.js';
import imagesRoutes from './routes/images.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/user', userRoutes);
app.use('/api/images', imagesRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to Image Repository API');
});


(async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        app.listen(process.env.PORT, () => {
            console.log(`Server running on http://localhost:${process.env.PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
})();