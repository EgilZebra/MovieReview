import { reviews } from "../../models/models"
import { newReview } from "../../models/types/types"

export const postReview = async ( review: newReview ) => { 
    try {
        const result = await reviews.create({
            movieId: review.movieId,
            userId: review.userId,
            rating: review.rating,
            comment: review.comment
        })
        return result
    } catch (error) {
        console.log(error)
    }
}