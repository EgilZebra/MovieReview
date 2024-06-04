import { reviews } from "../../models/models"
import mongoose from 'mongoose';

export const getReview = async ( movieId: string) => {
    
    try {
        const review = await reviews.find({ movieId: movieId }).exec();
        return review  
    } catch (error) {
        console.error('Error feching reviews', error)
    }
}