"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRatings = exports.deleteOneMovie = exports.getMovieReviews = exports.putOneMovie = exports.getOneMovie = exports.postOneMovie = exports.getAllMovies = void 0;
const allMovies_1 = require("../services/movieServices/allMovies");
const postMovie_1 = require("../services/movieServices/postMovie");
const putMovie_1 = require("../services/movieServices/putMovie");
const getMovie_1 = require("../services/movieServices/getMovie");
const getReview_1 = require("../services/movieServices/getReview");
const deleteMovie_1 = require("../services/movieServices/deleteMovie");
const checkTitle_1 = require("../services/movieServices/checkTitle");
const movieRatings_1 = require("../services/movieServices/movieRatings");
const getAllMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movies = yield (0, allMovies_1.AllMovies)();
    try {
        if (!movies) {
            res.status(404).json({ message: 'not found!' });
        }
        else if (movies === undefined) {
            res.status(400).json({ message: 'faulty request' });
        }
        else {
            res.status(200).json({
                message: 'sucess',
                movies: movies.flat()
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'internal server error, try again' });
    }
});
exports.getAllMovies = getAllMovies;
const postOneMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        if (!((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.title)) {
            res.status(400).json({ message: `faulty request, title must be present` });
        }
        else if (!((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.director)) {
            res.status(400).json({ message: `faulty request, director must be present` });
        }
        else if (!((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.releaseYear)) {
            res.status(400).json({ message: `faulty request, releaseYear must be present` });
        }
        else if (!((_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.genre)) {
            res.status(400).json({ message: `faulty request, genre must be present` });
        }
        else if (yield (0, checkTitle_1.checkTitle)(req.body.title)) {
            res.status(400).json({ message: `faulty request, that movie allready exists` });
        }
        else if (yield (0, postMovie_1.postMovie)(req.body)) {
            res.status(200).json({
                message: `sucess, your movie ${req.body.title} have been added!`
            });
        }
        else {
            res.status(404).json({ message: 'not found!' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'internal server error, try again' });
    }
});
exports.postOneMovie = postOneMovie;
const getOneMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movie = yield (0, getMovie_1.getMovie)(req.params.id);
    try {
        if (!req.params.id) {
            res.status(400).json({ message: `faulty request, movieId must be present` });
        }
        else if (movie === null) {
            res.status(404).json({ message: 'not found!' });
        }
        else {
            res.status(200).json({
                message: 'success',
                movie: movie
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'internal server error, try again' });
    }
});
exports.getOneMovie = getOneMovie;
const putOneMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g, _h;
    try {
        if (!req.params.id) {
            res.status(400).json({ message: `faulty request, movieId must be present` });
        }
        else if (!((_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.title)) {
            res.status(400).json({ message: `faulty request, title must be present` });
        }
        else if (!((_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.director)) {
            res.status(400).json({ message: `faulty request, director must be present` });
        }
        else if (!((_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.releaseYear)) {
            res.status(400).json({ message: `faulty request, releaseYear must be present` });
        }
        else if (!((_h = req === null || req === void 0 ? void 0 : req.body) === null || _h === void 0 ? void 0 : _h.genre)) {
            res.status(400).json({ message: `faulty request, genre must be present` });
        }
        else if (yield (0, putMovie_1.putMovie)(req.body, req.params.id)) {
            res.status(200).json({
                message: `success, your movie ${req.body.title} have been updated!`
            });
        }
        else {
            res.status(404).json({ message: 'not found!' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'internal server error, try again' });
    }
});
exports.putOneMovie = putOneMovie;
const getMovieReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _j;
    const review = yield (0, getReview_1.getReview)(req.params.id);
    try {
        if (!((_j = req === null || req === void 0 ? void 0 : req.params) === null || _j === void 0 ? void 0 : _j.id)) {
            res.status(400).json({ message: `faulty request, movieId must be present` });
        }
        else if (!review || review === undefined) {
            res.status(404).json({ message: 'Movie not found!' });
        }
        else {
            res.status(200).json({
                message: 'success',
                review: review.flat()
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'internal server error, try again' });
    }
});
exports.getMovieReviews = getMovieReviews;
const deleteOneMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _k;
    try {
        if (!((_k = req === null || req === void 0 ? void 0 : req.params) === null || _k === void 0 ? void 0 : _k.id)) {
            res.status(400).json({ message: `faulty request, movieId must be present` });
        }
        else if (yield (0, deleteMovie_1.deleteMovie)(req.params.id)) {
            res.status(200).json({
                message: 'success, movie deleted',
            });
        }
        else {
            res.status(404).json({ message: 'Movie not found!' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'internal server error, try again' });
    }
});
exports.deleteOneMovie = deleteOneMovie;
const getRatings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Ratings = yield (0, movieRatings_1.movieRatings)();
    try {
        if (Ratings) {
            res.status(200).json({
                message: 'success',
                'movies by rating': Ratings
            });
        }
        else {
            res.status(404).json({ message: 'No ratings found!' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'internal server error, try again' });
    }
});
exports.getRatings = getRatings;
