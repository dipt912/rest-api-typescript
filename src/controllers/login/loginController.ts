
import {
    Request,
    Response
} from '../../global';
import * as joi from 'joi';
import { validateLoginInfo } from '../../repository/loginRepository';
import { redisDb } from '../../services/redisClient';
import { User } from '../../Interfaces/user';


interface LoginBody {
    email: string,
    password: string,
}

const loginBodyValidator = joi.object({
    email: joi.string().required(),
    password: joi.string().required()
})

export const loginUser = async (req: Request<LoginBody>, res: Response) => {
    try {
        
        await loginBodyValidator.validate(req.body || {});
        const { email, password} = req.body;

       const user:any =  await validateLoginInfo(email, password);
       const session = await redisDb.createSession(user);

       res.status(200);
       res.json( { ...session, name: user.name,  email: user.email })

    } catch(err) {
        if(err.isJoi) {
            res.status(400);
            return res.json({ error: err.message });
        }
        res.status(404);
        return res.json({ error: err });
    }
    

}