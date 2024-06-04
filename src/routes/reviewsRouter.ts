import express, { Router } from 'express';
import {
    postOneReview,
    getAllReviews,
    getOneReview,
    putOneReview,
    deleteOneReview
} from '../controllers/reviewController'

export const reviews: Router = express.Router();

// Add a new review
reviews.post('/', postOneReview)

// Get a list of all reviews
reviews.get('/', getAllReviews)

// Get details for a specific review
reviews.get('/:id', getOneReview);

// Update a specific review
reviews.put('/:id', putOneReview)

// Remove a specific review
reviews.delete('/:id', deleteOneReview)
