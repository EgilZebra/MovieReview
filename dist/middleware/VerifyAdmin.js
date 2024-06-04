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
exports.verifyAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers['authorization']) {
        return res.status(400).send('Access Unauthorized!');
    }
    ;
    const token = req.headers['authorization'].replace('Bearer ', '');
    jsonwebtoken_1.default.verify(token, String(process.env.JWT_SECRET), (err, decoded) => {
        if (err) {
            return res.status(400).send('Access Unauthorized!');
        }
        const decodedToken = decoded;
        if (decodedToken.role === 'admin') {
            return next();
        }
        else {
            return res.status(400).send('Access Unauthorized!');
        }
    });
});
exports.verifyAdmin = verifyAdmin;
