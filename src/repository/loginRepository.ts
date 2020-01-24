import * as bcrypt from 'bcrypt-nodejs';
import { Logins } from '../Models/signin';
import { Users } from '../Models/users';

interface User {
    email: string,
    hash: string
}

export const validateLoginInfo = async (email:string, password: string)=> {
 try {
        const user: any  =  await Logins.findOne({
            where : { email }
        })
        if(!user) {
            throw new Error('User not available')
        }

        const isValid = user && bcrypt.compareSync(password , user.hash)
        if(isValid) {
            const userInfo = await Users.findOne({
                where : { email }
            })
            return userInfo;
        } else {
            Promise.reject('wrong credentials')
        }


 } catch (e) {
     console.log('validateLoginInfo error ', e);
     throw new Error('Unathorized!!!');
 }
}