import { movies } from "../../models/models";

export const getMovie = async ( movieId: string ) => {

    try {
        const movie = await movies.findOne({ _id: movieId}).exec();
        return movie  
    } catch (error) {
        console.log(error)
    }
    
}