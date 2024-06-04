import { reviews } from "../../models/models";

export const getReview = async ( id: string ) => {
    try {
         const myReview = await reviews.findOne({ _id: id }).exec();
         return myReview
    } catch (error: any) {
        console.log(error.message)
    }
}