import { Request, Response } from 'express'
import { getUserFromToken } from '../services/reviewServices/getUserFromToken';
import { getMovieFromTitle } from '../services/reviewServices/getMovieFromTitle';
import { postReview } from '../services/reviewServices/postReview'
import { allReviews } from '../services/reviewServices/allReviews';
import { Movie, Review, User } from '../models/types/types';
import { getReview } from '../services/reviewServices/getReview';
import { updateReview } from '../services/reviewServices/updateReview';
import { deleteReview } from '../services/reviewServices/deleteReview';

export const postOneReview = async ( req: Request, res: Response ) => {
    const user: User | undefined | null = await getUserFromToken( req.headers.authorization )
    const movie: Movie | undefined | null = await getMovieFromTitle( req.body.title );
    try {
        if (!req?.body?.title) {
            res.status(400).json({ message: 'faulty request, must include a movie title'});
        } else if (!req?.body?.rating) {
            res.status(400).json({ message: 'faulty request, must include a rating'});
        } else if (!req?.body?.comment) {
            res.status(400).json({ message: 'faulty request, must include a comment'});
        } else if ( user == undefined ) {
            res.status(404).json({ message: 'User not found!'});
        } else if ( movie == undefined ) {
            res.status(404).json({ message: 'Movie not found!'});
        } else if ( await postReview({
            movieId: movie._id, 
            userId: user._id, 
            rating: req.body.rating, 
            comment: req.body.comment 
            })) {
                res.status(200).json({
                    message: 'sucess, your comment have been posted'
                })
        }    
    } catch (error) {
        res.status(500).json({ message: 'internal server error, try again'})
    }
}
export const getAllReviews = async ( req: Request, res: Response ) => {

    const result: Review[] | undefined = await allReviews();

    try {
        if ( result == undefined) {
            res.status(404).json({ message: 'No Reviews found!'});
        } else  {
            res.status(200).json({
                message: 'sucess',
                'review counter': result.length,
                reviews: result.flat()
            })
        }  
    } catch (error) {
        res.status(500).json({ message: 'internal server error, try again'})
    }
}
export const getOneReview = async ( req: Request, res: Response ) => {
    const review: Review | null | undefined = await getReview( req.params.id );
    try {
        if (!req?.params?.id) {
            res.status(400).json({ message: 'faulty request, must include review id'});
        } else if (review == undefined) {
            res.status(404).json({ message: 'not found!'});
        } else {
            res.status(200).json({
                message: 'sucess',
                review: review
            })
        }
    } catch (error) {
        res.status(500).json({ message: 'internal server error, try again'})
    }
}
export const putOneReview = async ( req: Request, res: Response ) => {

    const user: User | undefined | null = await getUserFromToken( req.headers.authorization );
    const movie: Movie | undefined | null = await getMovieFromTitle( req.body.title );
    try {
        if (!req?.body?.rating) {
            res.status(400).json({ message: 'faulty request, must include rating'});
        } else if (!req?.body?.comment) {
            res.status(400).json({ message: 'faulty request, must include comment'});
        } if (!req?.params?.id) {
            res.status(400).json({ message: 'faulty request, must include id'});
        } else if ( !user || user === null || user === undefined ) {
            res.status(404).json({ message: 'User not found!'});
        } else if ( !movie || movie === null || movie === undefined ) {
            res.status(404).json({ message: 'Movie not found!'});
        } else if ( await updateReview( req.body.rating, req.body.comment, req.params.id )) {
                res.status(200).json({
                    message: 'sucess, your comment have been updated'
                })
        } 
    } catch (error) {
        res.status(500).json({ message: 'internal server error, try again'})
    }
}
export const deleteOneReview = async ( req: Request, res: Response ) => {
    
    try {
        if (!req?.params?.id) {
            res.status(400).json({ message: 'faulty request, must include id'});
        } else if ( await deleteReview( req.params.id )) {
            res.status(200).json({
                message: 'sucess, your review have been removed'
            })
        } else {
            res.status(404).json({ message: 'Review not found!'});
        } 
    } catch (error) {
        res.status(500).json({ message: 'internal server error, try again'})
    }
}