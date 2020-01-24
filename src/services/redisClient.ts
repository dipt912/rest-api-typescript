import redis from 'redis'
import { HTTP400Error } from '../utils/httpErrors';
import { User } from '../Interfaces/user';
const jwt = require('jsonwebtoken');
import {
    Request,
    Response
} from './../global';
import { NextFunction } from 'connect';

let redisClient: any;

export interface RedisConfig {
    config: any
}
async function redisClientInit(redisUrl: string) {
    try {
        redisClient = redis.createClient(redisUrl);
        console.log('redis db connecion successful', redisUrl)
    } catch (err) {
        console.log('Failed to crete redis...');
        throw new HTTP400Error(err);
    }
}

const setToekn = (key: string, value: string) => {
    return Promise.resolve(redisClient.set(key, value))
}

const signToken = (email: string) => {
    const jwtPayload = { email };
    return jwt.sign(jwtPayload, 'shhhh', { expiresIn: '2 days' });
}

const createSession = (user: any) => {
    console.log('createSession ')
    const { email, id } = user;
    const token = signToken(email)
    return setToekn(token, id)
        .then(() => ({ success: 'true', userId: id, token: token }))
        .catch((err) => console.log(err));

}

const chekcAuthTokenId = (req: Request, res: Response, next: NextFunction) => {
    console.log('chekcAuthTokenId ')
    const { authorization } = req.headers;
    redisClient.get(authorization, (err: any, reply: any) => {
        if (err || !reply) {
            return res.status(400).json('Unauthorize');
        }
        return next();
    })
}

const getAuthTokenId = (req: Request, res: Response) => {
    console.log('getAuthTokenId ')
    const { authorization } = req.headers;
    redisClient.get(authorization, (err: any, reply: any) => {
        if (err || !reply) {
            return res.status(400).json('Unauthorize');
        }
        return res.json({ id: reply })
    })
}

export const redisDb = {
    redisClient,
    redisClientInit,
    createSession,
    getAuthTokenId,
    chekcAuthTokenId
}