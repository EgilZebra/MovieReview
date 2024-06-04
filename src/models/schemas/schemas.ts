import mongoose, { Schema } from "mongoose";

export const Movie= new Schema({
    title: {
        type: String,
        required: true 
    },
    director: {
        type: String,
        required: true 
    },
    releaseYear: {
        type: String,
        required: true 
    },
    genre: {
        type: String,
        required: true 
    }
})

export const Review = new Schema({
    movieId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true 
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true 
    },
    rating: {
        type: String,
        required: true 
    },
    comment: {
        type: String,
        required: true 
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    }
}) 
    
export const User = new Schema({
    username: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true,
        lowercase: true 
    },
    password: {
        type: String,
        required: true 
    },
    role: {
        type: String,
        default: "user"
    },
})