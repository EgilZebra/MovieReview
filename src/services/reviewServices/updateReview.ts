import { getReview } from "./getReview"

export const updateReview = async ( rating: string, comment: string, id: string ) => { 
    try {
        const review = await getReview(id);
        if (review !== undefined && review !== null ) {
            review.rating = rating;
            review.comment = comment;
            await review.save();
            return (true)
        } else {
            return (false)
        }
    } catch (error) {
        console.log(error)
    }
}