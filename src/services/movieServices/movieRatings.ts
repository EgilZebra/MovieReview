
import { AllMovies } from "./allMovies";
import { getReview } from "./getReview";
import { MovieRating } from "../../models/types/types";

export const movieRatings = async () => {
    
    let moviesRated: MovieRating[] = []
    const allMovies = await AllMovies()

    try {
        if ( allMovies !== undefined ) {
            for (const movie of allMovies) {
                let ratingGather: number = 0
                const movieReviews = await getReview( String(movie._id) );
                if (movieReviews !== undefined ) {
                    movieReviews?.forEach((rating) => {
                        ratingGather = ratingGather + Number(rating.rating)
                    });
                    const rank: number = ratingGather / movieReviews.length;
                    const movieWithRarting = {
                        movie: movie.title,
                        rating: rank
                    }
                    moviesRated.push(movieWithRarting);
                }
            }
        }
        moviesRated.sort(( a, b ) => b.rating - a.rating)
        return moviesRated
    } catch (error) {
        console.log({ 'error message': error});
    }
}

// export const movieRatings = async (): Promise<MovieRating[] | null> => {
//     return new Promise< MovieRating[] | null>( async ( resolve, reject ) => {
//         let moviesRated: MovieRating[] = []
//         const allMovies = await AllMovies()
//         if ( allMovies !== undefined ) {
//             allMovies.forEach( async (movie) => {
//                 let ratingGather: number = 0
//                 const movieReviews = await getReview( String(movie._id) )
//                 if (movieReviews !== undefined ) {
//                     movieReviews?.forEach((rating) => {
//                         ratingGather = ratingGather + Number(rating.rating)
//                     });
//                     const rank: number = ratingGather / movieReviews.length;
//                     const movieWithRarting = {
//                         movie: movie.title,
//                         rating: rank
//                     }
//                     moviesRated.push(movieWithRarting)
//                 }
//             })
//             resolve(moviesRated)
//         } else {
//             reject()
//         }
//     }) 
// }