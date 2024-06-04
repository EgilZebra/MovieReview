import { reviews } from "../../models/models"

export const deleteReview = async ( reviewId: string) => {

    try {
        const result = await reviews.deleteOne({ _id: reviewId });
        return (result) 
    } catch (error) {
        console.log(error)
    }
}