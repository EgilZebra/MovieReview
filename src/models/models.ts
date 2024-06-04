import { Movie, Review, User } from './schemas/schemas';
import * as mongoose from 'mongoose';

export const movies = mongoose.model('Movie', Movie)
export const reviews = mongoose.model('Review', Review)
export const users = mongoose.model('User', User)
