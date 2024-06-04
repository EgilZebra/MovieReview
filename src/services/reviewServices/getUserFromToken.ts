import jwt from 'jsonwebtoken';
import { User, jwtPayload } from '../../models/types/types';
import { users } from '../../models/models';

export const getUserFromToken = async ( token: string | undefined ) => {

    try {
        const stringedToken: string = String(token);
        const decodedToken: jwtPayload =  jwt.decode(stringedToken.replace('Bearer ', '')) as jwtPayload;
        const user: User | undefined | null = await users.findOne({ username: decodedToken.user }).exec();
        return  user;
    } catch (error) {
        console.log(error)
    }
   
}