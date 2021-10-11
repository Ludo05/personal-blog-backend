"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const UserSchema_1 = require("../models/UserSchema");
const validation_1 = require("../validation");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const RefreshTokenHolder_1 = require("../util/RefreshTokenHolder");
class AdminService {
    async register(req, res) {
        const { value, error } = validation_1.userValidation.validate(req.body);
        if (error) {
            return res.status(400).send(error);
        }
        const newUser = new UserSchema_1.SchemaModel(value);
        newUser.save((error, mongoUser) => {
            if (error) {
                return res.status(400).send(error);
            }
            return res.status(201).json({ mongoUser });
        });
    }
    async login(req, res) {
        const { value, error } = validation_1.loginValidation.validate(req.body);
        if (error) {
            return res.status(422).send(error);
        }
        const user = await UserSchema_1.SchemaModel.findOne({ username: value.username }).exec();
        const decodedPassword = await bcrypt_1.default.compare(req.body.password, user.password);
        if (!decodedPassword) {
            // Should return a error saying the username and password doesnt match.
            return res.status(300).send({ msg: 'User creds are incorrect please try again.' });
        }
        const access_token = AdminService.generateAccessToken(user);
        const refresh_token = AdminService.generateRefreshToken(user);
        RefreshTokenHolder_1.array.push(refresh_token);
        return res.json({
            access_token,
            refresh_token,
            username: user.username,
            email: user.email
        });
    }
    async logout(req, res) {
        const token = req.body.token;
        RefreshTokenHolder_1.array.filter(tokens => tokens !== token);
        return res.status(200).json('You have been logged out');
    }
    refreshToken(req, res) {
        const { token } = req.body;
        if (!token) {
            return res.status(401).json('You need a token for refresh');
        }
        if (!RefreshTokenHolder_1.array.includes(token)) {
            return res.status(403).json("Refresh token is not valid");
        }
        jsonwebtoken_1.default.verify(token, "testRefreshPrivatekey", (err, user) => {
            err && console.log(err);
            RefreshTokenHolder_1.array.filter(tokens => tokens !== token);
            const access_token = AdminService.generateAccessToken(user);
            const refresh_token = AdminService.generateRefreshToken(user);
            RefreshTokenHolder_1.array.push(refresh_token);
            res.status(200).json({
                access_token: access_token,
                refresh_token: refresh_token
            });
        });
    }
    static generateAccessToken(user) {
        return jsonwebtoken_1.default.sign({ username: user.username, email: user.email, }, 'testprivatekey', {
            expiresIn: '15m'
        });
    }
    static generateRefreshToken(user) {
        return jsonwebtoken_1.default.sign({ username: user.username, email: user.email }, 'testRefreshPrivatekey');
    }
}
exports.AdminService = AdminService;
