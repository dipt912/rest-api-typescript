

import {
    Request,
    Response
} from '../../global';
import { registerUserDB, getUser, isUserAvailable } from '../../repository/registerRepository';
import * as bcrypt from 'bcrypt-nodejs';
import * as joi from 'joi';
import { redisDb } from '../../services/redisClient';
import { User } from '../../Interfaces/user';


export interface RegisterUser {
    email: string,
    name: string,
    password: string
}

const registerUserBodyValidaor = joi.object({
    email: joi.string().required(),
    name: joi.string().required(),
    password: joi.string().required()
})
 
export const registerUser = async(req: Request<RegisterUser>, res: Response<any>) => {

    try {
       
        await registerUserBodyValidaor.validate(req.body || {});
        const { email, password, name } = req.body
        
       

          const hash = bcrypt.hashSync(password);
        await registerUserDB(email, hash ,name)
        const user = await getUser(email)
        const session = await redisDb.createSession(user);
        res.status(200);
        res.json({ status:'success' , email, name, ...session});
    } catch (err) {

        if(err.isJoi) {
            res.status(400);
            return res.json({ error: err.message });
        }
        res.status(404);
        return res.json({ error: err });
            
    }
  
}
export interface CheckUsername {
    email: string;
}

const checkUserNameBodyValidaor = joi.object({
    email: joi.string().required(),
})

export const checkUserName = async (req: Request<CheckUsername>, res: Response) => {
    try {
        await checkUserNameBodyValidaor.validate(req.body || {});
        const { email } = req.body

        const isUser = await isUserAvailable(email);
        res.status(200);
        res.json({ isUser });
    } catch (err) {
        if(err.isJoi) {
            res.status(400);
            return res.json({ error: err.message });
        }
        res.status(404);
        return res.json({ error: err });
    }
}