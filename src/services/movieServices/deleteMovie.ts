import { movies } from "../../models/models"

export const deleteMovie = async ( movieId: string) => {

    try {
        const result = await movies.deleteOne({_id: movieId});
        return (result) 
    } catch (error) {
        console.log(error)
    }
}