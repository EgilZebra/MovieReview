import express, { Express } from 'express';
require('dotenv').config();
import { movies } from './routes/moviesRouter'
import { reviews } from './routes/reviewsRouter'
import { user } from './routes/userRouter'
import { verifyToken } from './middleware/VerifyToken';
import { run } from './models/initiateMongodb';
import mongoose from 'mongoose';

const app: Express = express();
const PORT: number = Number(process.env.PORT);
const BASE_URL: string = String(process.env.BASE_URL);

run().catch(console.dir);

app.use(express.json());
app.use('/api/movies', verifyToken,  movies)
app.use('/api/reviews', verifyToken, reviews)
app.use('/api/user', user)

mongoose.connection.once('open', () => {
    app.listen( PORT, BASE_URL, () => {
        console.log(`MovieReview is up and running on ${BASE_URL}:${PORT} `);
        console.log('Time to review some movies!');
    })
})
