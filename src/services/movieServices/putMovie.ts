import { getMovie } from "./getMovie";
import { newMovie } from "../../models/types/types";

export const putMovie = async ( body: newMovie, id: string ) => {

    try {
        const movie = await getMovie( id );
        if (movie !== undefined && movie !== null) {
            movie.title = body.title;
            movie.director = body.director;
            movie.releaseYear = body.releaseYear;
            movie.genre = body.genre; 
            await movie.save()
            return (true)
        } else {
            return (false)
        }
    } catch (error) {
        console.log(error)
    }
    
}