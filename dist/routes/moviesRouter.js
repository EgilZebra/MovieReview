"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movies = void 0;
const express_1 = __importDefault(require("express"));
const movieController_1 = require("../controllers/movieController");
const VerifyAdmin_1 = require("../middleware/VerifyAdmin");
exports.movies = express_1.default.Router();
// Get a list of all movies
exports.movies.get('/', movieController_1.getAllMovies);
// Add a new movie
exports.movies.post('/', VerifyAdmin_1.verifyAdmin, movieController_1.postOneMovie);
// Get all movies and their average rating
exports.movies.get('/ratings', movieController_1.getRatings);
// Get details for a specific movie
exports.movies.get('/:id', movieController_1.getOneMovie);
// Update a specific movie
exports.movies.put('/:id', VerifyAdmin_1.verifyAdmin, movieController_1.putOneMovie);
// Get all the reviews of a specific movie
exports.movies.get('/:id/reviews', movieController_1.getMovieReviews);
// Remove a specific movie
exports.movies.delete('/:id', VerifyAdmin_1.verifyAdmin, movieController_1.deleteOneMovie);
