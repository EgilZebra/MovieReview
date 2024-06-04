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
exports.loginUser = exports.registerUser = void 0;
const createUser_1 = require("../services/userServices/createUser");
const hashPassword_1 = require("../services/userServices/hashPassword");
const checkPassword_1 = require("../services/userServices/checkPassword");
const duplicateUsers_1 = require("../services/userServices/duplicateUsers");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkUser_1 = require("../services/userServices/checkUser");
const getRoleFromUsername_1 = require("../services/userServices/getRoleFromUsername");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, role } = req.body;
    try {
        if (!username) {
            res.status(400).json({ message: 'faulty request, username missing' });
        }
        else if (!email) {
            res.status(400).json({ message: 'faulty request, email missing' });
        }
        else if (!password) {
            res.status(400).json({ message: 'faulty request, password missing' });
        }
        else if (!role) {
            res.status(400).json({ message: 'faulty request, you must select a role' });
        }
        else if (yield (0, duplicateUsers_1.duplicateUsers)(username)) {
            res.status(400).json({ message: 'faulty request, user allready exists' });
        }
        else if (yield (0, createUser_1.createUser)(username, email, yield (0, hashPassword_1.hashPassword)(password), role)) {
            const token = jsonwebtoken_1.default.sign({ user: username, role: role }, String(process.env.JWT_SECRET), { expiresIn: '30m' });
            res.status(200).json({
                message: 'sucess! User created',
                token: token
            });
        }
        else {
            res.status(400).json({ message: 'faulty request' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'internal server error, try again' });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        if (!username) {
            res.status(400).json({ message: 'faulty request, username missing' });
        }
        else if (!password) {
            res.status(400).json({ message: 'faulty request, password missing' });
        }
        else if (!(yield (0, checkUser_1.checkUser)(username))) {
            res.status(404).json({ message: 'faulty request, user not found' });
        }
        else if (yield (0, checkPassword_1.checkPassword)(username, password)) {
            const role = yield (0, getRoleFromUsername_1.getRoleFromUsername)(username);
            const token = jsonwebtoken_1.default.sign({ user: username, role: role }, String(process.env.JWT_SECRET), { expiresIn: '30m' });
            res.status(200).json({
                message: 'sucess, you have logged in!',
                token: token
            });
        }
        else {
            res.status(400).json({ message: 'faulty request, wrong password' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'internal server error, try again' });
    }
});
exports.loginUser = loginUser;
