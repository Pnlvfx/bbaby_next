import jwt from 'jsonwebtoken'
import User from '../../models/User.js';
import 'dotenv/config';
const secret = process.env.TOKEN;


export async function getUserFromToken(token) {
    const user = jwt.verify(token, secret);
       return User.findById(user.id)
}