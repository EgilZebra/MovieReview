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
exports.checkTitle = void 0;
const models_1 = require("../../models/models");
const checkTitle = (title) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myUser = yield models_1.movies.findOne({ title: title }).exec();
        if (!myUser || myUser === undefined) {
            return (false);
        }
        else {
            return (true);
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.checkTitle = checkTitle;
