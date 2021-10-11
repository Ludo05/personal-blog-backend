"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    static checkAuthorization(req, res, next) {
        const token = req.headers['x-access-token'];
        if (!token) {
            res.status(401).json('You are not authorised');
        }
        jsonwebtoken_1.default.verify(token, 'testprivatekey', (err, user) => {
            if (err) {
                return res.status(403).json('Token is not valid');
            }
            req.user = user;
            return next();
        });
    }
}
exports.AuthService = AuthService;
