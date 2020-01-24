import { HTTP400Error } from "../utils/httpErrors";
import { Users } from "../Models/users";
import { db } from "../Models";
import { Logins } from "../Models/signin";
import { User } from "../Interfaces/user";


export const registerUserDB = async( email: string, hash: string, name:string) => {
    let transaction:any;
    try {
       
        transaction = await db.getTransaction();
        await Logins.create({
            email,
            name,
            hash
        }, {transaction})
        await Users.create({
             email,
             name,
        }, {transaction});
        await transaction.commit();
    } catch(err) {
        if (transaction) {
            transaction.rollback()
        }
        console.log('error in registerUserDB ' ,err)
        throw new HTTP400Error(err);
    }

}

export const getUser = async(email: string) => {
    try {
        const user = Users.findOne({
            where :{email}
        })
        if(!user) {
            throw new Error('User not available')
        }
        return user;
    } catch (err) {
        throw new HTTP400Error(err);
    }
}

export const isUserAvailable = async(email: string) => {
    try {
        return  Users.count({
            where :{email}
        }).then(count => {
            if( count !== 0 ) {
                return true
            }
            return false;
        }). catch(e => {
            throw new HTTP400Error(e);
        })
       
    } catch (err) {
        throw new HTTP400Error(err);
    }
}