"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieRatings = void 0;
const allMovies_1 = require("./allMovies");
const getReview_1 = require("./getReview");
const movieRatings = () => __awaiter(void 0, void 0, void 0, function* () {
    let moviesRated = [];
    const allMovies = yield (0, allMovies_1.AllMovies)();
    try {
        if (allMovies !== undefined) {
            for (const movie of allMovies) {
                let ratingGather = 0;
                const movieReviews = yield (0, getReview_1.getReview)(String(movie._id));
                if (movieReviews !== undefined) {
                    movieReviews === null || movieReviews === void 0 ? void 0 : movieReviews.forEach((rating) => {
                        ratingGather = ratingGather + Number(rating.rating);
                    });
                    const rank = ratingGather / movieReviews.length;
                    const movieWithRarting = {
                        movie: movie.title,
                        rating: rank
                    };
                    moviesRated.push(movieWithRarting);
                }
            }
        }
        moviesRated.sort((a, b) => b.rating - a.rating);
        return moviesRated;
    }
    catch (error) {
        console.log({ 'error message': error });
    }
});
exports.movieRatings = movieRatings;
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
