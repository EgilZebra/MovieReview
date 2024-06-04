"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
exports.user = express_1.default.Router();
// Create a new user
exports.user.post('/register', userController_1.registerUser);
// Login as an existing user
exports.user.post('/login', userController_1.loginUser);
