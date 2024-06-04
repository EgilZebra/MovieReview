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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = void 0;
const models_1 = require("../../models/models");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const checkPassword = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const myUser = yield models_1.users.findOne({ username: username }).exec();
    if (myUser) {
        const match = yield bcryptjs_1.default.compare(password, myUser.password);
        return match;
    }
    else {
        return (false);
    }
});
exports.checkPassword = checkPassword;
