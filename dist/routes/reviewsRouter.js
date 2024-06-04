"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviews = void 0;
const express_1 = __importDefault(require("express"));
const reviewController_1 = require("../controllers/reviewController");
exports.reviews = express_1.default.Router();
// Add a new review
exports.reviews.post('/', reviewController_1.postOneReview);
// Get a list of all reviews
exports.reviews.get('/', reviewController_1.getAllReviews);
// Get details for a specific review
exports.reviews.get('/:id', reviewController_1.getOneReview);
// Update a specific review
exports.reviews.put('/:id', reviewController_1.putOneReview);
// Remove a specific review
exports.reviews.delete('/:id', reviewController_1.deleteOneReview);
