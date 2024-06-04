import { ObjectId } from "mongodb"

export interface newMovie {
    title: string,
    director: string,
    releaseYear: string,
    genre: string
}
export interface Movie extends newMovie {
    _id: ObjectId
}

export interface newReview {
    movieId: ObjectId,
    userId: ObjectId,
    rating: string,
    comment: string
};
export interface Review extends newReview {
    _id: ObjectId
}

export interface newUser {
    username: string,
    email: string,
    password: string,
    role: string
}
export interface User extends newUser {
    _id: ObjectId
}
export interface jwtPayload {
    user: string,
    role: string
}
export interface MovieRating  {
    movie: string,
    rating: number
}