"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require('dotenv').config();
const moviesRouter_1 = require("./routes/moviesRouter");
const reviewsRouter_1 = require("./routes/reviewsRouter");
const userRouter_1 = require("./routes/userRouter");
const VerifyToken_1 = require("./middleware/VerifyToken");
const initiateMongodb_1 = require("./models/initiateMongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT);
const BASE_URL = String(process.env.BASE_URL);
(0, initiateMongodb_1.run)().catch(console.dir);
app.use(express_1.default.json());
app.use('/api/movies', VerifyToken_1.verifyToken, moviesRouter_1.movies);
app.use('/api/reviews', VerifyToken_1.verifyToken, reviewsRouter_1.reviews);
app.use('/api/user', userRouter_1.user);
mongoose_1.default.connection.once('open', () => {
    app.listen(PORT, BASE_URL, () => {
        console.log(`MovieReview is up and running on ${BASE_URL}:${PORT} `);
        console.log('Time to review some movies!');
    });
});
