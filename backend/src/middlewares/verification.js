import jwt from "jsonwebtoken";
import { SECRET } from "../config/config.js";

const { secret } = SECRET();

export const createAccessToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, { expiresIn: "5D" }, (err, token) => {
            err ? reject(err) : resolve(token);
        });
    });
}

export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        return res
            .status(400)
            .json(error.errors.map((error) => error.message));
    }
}