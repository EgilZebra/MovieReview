import express, { Router } from 'express';
import { 
    getAllMovies,
    postOneMovie,
    getOneMovie,
    putOneMovie,
    getMovieReviews,
    deleteOneMovie,
    getRatings
} from '../controllers/movieController'
import { verifyAdmin } from '../middleware/VerifyAdmin';

export const movies: Router = express.Router();

// Get a list of all movies
movies.get('/', getAllMovies);

// Add a new movie
movies.post('/', verifyAdmin, postOneMovie);

// Get all movies and their average rating
movies.get('/ratings', getRatings);

// Get details for a specific movie
movies.get('/:id', getOneMovie);

// Update a specific movie
movies.put('/:id', verifyAdmin, putOneMovie);

// Get all the reviews of a specific movie
movies.get('/:id/reviews', getMovieReviews);

// Remove a specific movie
movies.delete('/:id', verifyAdmin, deleteOneMovie);
