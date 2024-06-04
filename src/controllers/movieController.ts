import { Request, Response } from 'express';
import { AllMovies } from '../services/movieServices/allMovies';
import { postMovie } from '../services/movieServices/postMovie';
import { putMovie } from '../services/movieServices/putMovie';
import { getMovie } from '../services/movieServices/getMovie';
import { getReview } from '../services/movieServices/getReview';
import { deleteMovie } from '../services/movieServices/deleteMovie';
import { checkTitle } from '../services/movieServices/checkTitle'
import { Movie} from '../models/types/types';
import { movieRatings } from '../services/movieServices/movieRatings';

export const getAllMovies = async ( req: Request, res: Response ) => {
    
    const movies: Movie[] | undefined = await AllMovies();

    try {
        if (!movies) {
           res.status(404).json({ message: 'not found!'}); 
        } else if (movies === undefined) {
            res.status(400).json({ message: 'faulty request'});
        } else {
            res.status(200).json({
                message: 'sucess',
                movies: movies.flat()
            })
        }
    } catch (error) {
        res.status(500).json({ message: 'internal server error, try again'})
    }
};
export const postOneMovie = async ( req: Request, res: Response ) => {

    try {
        if (!req?.body?.title) {
            res.status(400).json({ message: `faulty request, title must be present`});
        } else if (!req?.body?.director) {
            res.status(400).json({ message: `faulty request, director must be present`});
        } else if (!req?.body?.releaseYear) {
            res.status(400).json({ message: `faulty request, releaseYear must be present`});
        } else if (!req?.body?.genre) {
            res.status(400).json({ message: `faulty request, genre must be present`});
        } else if (await checkTitle( req.body.title )){
            res.status(400).json({ message: `faulty request, that movie allready exists`});
        } else if (await postMovie( req.body )) {
            res.status(200).json({
                message: `sucess, your movie ${req.body.title} have been added!`
            })
        } else {
            res.status(404).json({ message: 'not found!'});
        } 
    } catch (error) {
        res.status(500).json({ message: 'internal server error, try again'})
    }
};
export const getOneMovie = async ( req: Request, res: Response ) => {
    
    const movie: Movie | undefined | null = await getMovie( req.params.id );
    try {
        if (!req.params.id) {
            res.status(400).json({ message: `faulty request, movieId must be present`});
        } else if (movie === null) {
            res.status(404).json({ message: 'not found!'});
        } else {
            res.status(200).json({
                message: 'success',
                movie: movie
            })
        }
    } catch (error) {
        res.status(500).json({ message: 'internal server error, try again'})
    }
};
export const putOneMovie = async ( req: Request, res: Response ) => {

    try {
        if (!req.params.id) {
            res.status(400).json({ message: `faulty request, movieId must be present`});
        } else if (!req?.body?.title) {
            res.status(400).json({ message: `faulty request, title must be present`});
        } else if (!req?.body?.director) {
            res.status(400).json({ message: `faulty request, director must be present`});
        } else if (!req?.body?.releaseYear) {
            res.status(400).json({ message: `faulty request, releaseYear must be present`});
        } else if (!req?.body?.genre) {
            res.status(400).json({ message: `faulty request, genre must be present`});
        } else if (await putMovie( req.body, req.params.id)) {
            res.status(200).json({
                message: `success, your movie ${req.body.title} have been updated!`
            })
        } else {
            res.status(404).json({ message: 'not found!'});
        } 
    } catch (error) {
        res.status(500).json({ message: 'internal server error, try again'})
    }
};
export const getMovieReviews = async ( req: Request, res: Response ) => {
 
    const review = await getReview( req.params.id );
    try {
        if (!req?.params?.id) {
            res.status(400).json({ message: `faulty request, movieId must be present`});
        } else if (!review || review === undefined) {
            res.status(404).json({ message: 'Movie not found!'});
        } else {
            res.status(200).json({
                message: 'success',
                review: review.flat()
            })
        }
    } catch (error) {
        res.status(500).json({ message: 'internal server error, try again'})
    }
};
export const deleteOneMovie = async ( req: Request, res: Response ) => {

    try {
        if (!req?.params?.id) {
            res.status(400).json({ message: `faulty request, movieId must be present`});
        } else if (await deleteMovie( req.params.id )) {
            res.status(200).json({
                message: 'success, movie deleted',
            })
        } else {
            res.status(404).json({ message: 'Movie not found!'});
        }
    } catch (error) {
        res.status(500).json({ message: 'internal server error, try again'})
    }
};
export const getRatings = async ( req: Request, res: Response ) => {

    const Ratings = await movieRatings();
    try {
        if ( Ratings ) {
            res.status(200).json({
                message: 'success',
                'movies by rating': Ratings
            })
        } else {
            res.status(404).json({ message: 'No ratings found!'});
        }
    } catch (error) {
        res.status(500).json({ message: 'internal server error, try again'})
    }
}
