import { reviews } from "../../models/models";
import { Review } from "../../models/types/types";

export const allReviews = async () => {
    try {
        const myReviews: Review[] = await reviews.find();
        return myReviews
    } catch (error) {
        console.log(error)
    }
    
}