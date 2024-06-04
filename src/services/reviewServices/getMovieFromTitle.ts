import { movies } from "../../models/models"

export const getMovieFromTitle = async ( title: string ) => {

    try {
        const movie = await movies.findOne({ title: title }).exec();
        return movie
    } catch (error) {
        console.log(error)
    }
    
}