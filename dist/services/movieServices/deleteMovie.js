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
exports.deleteMovie = void 0;
const models_1 = require("../../models/models");
const deleteMovie = (movieId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield models_1.movies.deleteOne({ _id: movieId });
        return (result);
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteMovie = deleteMovie;
