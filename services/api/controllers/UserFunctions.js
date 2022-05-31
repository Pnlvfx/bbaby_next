import jwt from 'jsonwebtoken'
import User from '../models/User.js';
import 'dotenv/config';
const secret = process.env.TOKEN;


export function getUserFromToken(token) {
    const userInfo = jwt.verify(token, secret);
       return User.findById(userInfo.id)
}