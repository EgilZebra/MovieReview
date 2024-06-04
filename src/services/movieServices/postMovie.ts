import { movies } from "../../models/models"
import { newMovie } from "../../models/types/types"

export const postMovie = async ( movie: newMovie ) => {
    
    try {
         await movies.create({
            title: movie.title,
            director: movie.director,
            releaseYear: movie.releaseYear,
            genre: movie.genre
        })
        return (true)
    } catch (error) {
        console.log(error)
    }
   
}