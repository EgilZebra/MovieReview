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
exports.putMovie = void 0;
const getMovie_1 = require("./getMovie");
const putMovie = (body, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = yield (0, getMovie_1.getMovie)(id);
        if (movie !== undefined && movie !== null) {
            movie.title = body.title;
            movie.director = body.director;
            movie.releaseYear = body.releaseYear;
            movie.genre = body.genre;
            yield movie.save();
            return (true);
        }
        else {
            return (false);
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.putMovie = putMovie;
