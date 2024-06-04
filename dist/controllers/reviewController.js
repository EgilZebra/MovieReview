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
exports.deleteOneReview = exports.putOneReview = exports.getOneReview = exports.getAllReviews = exports.postOneReview = void 0;
const getUserFromToken_1 = require("../services/reviewServices/getUserFromToken");
const getMovieFromTitle_1 = require("../services/reviewServices/getMovieFromTitle");
const postReview_1 = require("../services/reviewServices/postReview");
const allReviews_1 = require("../services/reviewServices/allReviews");
const getReview_1 = require("../services/reviewServices/getReview");
const updateReview_1 = require("../services/reviewServices/updateReview");
const deleteReview_1 = require("../services/reviewServices/deleteReview");
const postOneReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const user = yield (0, getUserFromToken_1.getUserFromToken)(req.headers.authorization);
    const movie = yield (0, getMovieFromTitle_1.getMovieFromTitle)(req.body.title);
    try {
        if (!((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.title)) {
            res.status(400).json({ message: 'faulty request, must include a movie title' });
        }
        else if (!((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.rating)) {
            res.status(400).json({ message: 'faulty request, must include a rating' });
        }
        else if (!((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.comment)) {
            res.status(400).json({ message: 'faulty request, must include a comment' });
        }
        else if (user == undefined) {
            res.status(404).json({ message: 'User not found!' });
        }
        else if (movie == undefined) {
            res.status(404).json({ message: 'Movie not found!' });
        }
        else if (yield (0, postReview_1.postReview)({
            movieId: movie._id,
            userId: user._id,
            rating: req.body.rating,
            comment: req.body.comment
        })) {
            res.status(200).json({
                message: 'sucess, your comment have been posted'
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'internal server error, try again' });
    }
});
exports.postOneReview = postOneReview;
const getAllReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, allReviews_1.allReviews)();
    try {
        if (result == undefined) {
            res.status(404).json({ message: 'No Reviews found!' });
        }
        else {
            res.status(200).json({
                message: 'sucess',
                'review counter': result.length,
                reviews: result.flat()
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'internal server error, try again' });
    }
});
exports.getAllReviews = getAllReviews;
const getOneReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const review = yield (0, getReview_1.getReview)(req.params.id);
    try {
        if (!((_d = req === null || req === void 0 ? void 0 : req.params) === null || _d === void 0 ? void 0 : _d.id)) {
            res.status(400).json({ message: 'faulty request, must include review id' });
        }
        else if (review == undefined) {
            res.status(404).json({ message: 'not found!' });
        }
        else {
            res.status(200).json({
                message: 'sucess',
                review: review
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'internal server error, try again' });
    }
});
exports.getOneReview = getOneReview;
const putOneReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g;
    const user = yield (0, getUserFromToken_1.getUserFromToken)(req.headers.authorization);
    const movie = yield (0, getMovieFromTitle_1.getMovieFromTitle)(req.body.title);
    try {
        if (!((_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.rating)) {
            res.status(400).json({ message: 'faulty request, must include rating' });
        }
        else if (!((_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.comment)) {
            res.status(400).json({ message: 'faulty request, must include comment' });
        }
        if (!((_g = req === null || req === void 0 ? void 0 : req.params) === null || _g === void 0 ? void 0 : _g.id)) {
            res.status(400).json({ message: 'faulty request, must include id' });
        }
        else if (!user || user === null || user === undefined) {
            res.status(404).json({ message: 'User not found!' });
        }
        else if (!movie || movie === null || movie === undefined) {
            res.status(404).json({ message: 'Movie not found!' });
        }
        else if (yield (0, updateReview_1.updateReview)(req.body.rating, req.body.comment, req.params.id)) {
            res.status(200).json({
                message: 'sucess, your comment have been updated'
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'internal server error, try again' });
    }
});
exports.putOneReview = putOneReview;
const deleteOneReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    try {
        if (!((_h = req === null || req === void 0 ? void 0 : req.params) === null || _h === void 0 ? void 0 : _h.id)) {
            res.status(400).json({ message: 'faulty request, must include id' });
        }
        else if (yield (0, deleteReview_1.deleteReview)(req.params.id)) {
            res.status(200).json({
                message: 'sucess, your review have been removed'
            });
        }
        else {
            res.status(404).json({ message: 'Review not found!' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'internal server error, try again' });
    }
});
exports.deleteOneReview = deleteOneReview;
