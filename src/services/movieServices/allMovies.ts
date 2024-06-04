import { movies } from "../../models/models";
import { Movie } from "../../models/types/types";

export const AllMovies = async () => {
    try {
        const myMovies: Movie[] = await movies.find().exec();
        return myMovies
    } catch (error) {
        console.log(error)
    }
   
}