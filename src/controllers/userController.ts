import { Request, Response } from 'express';
import { createUser } from '../services/userServices/createUser';
import { hashPassword } from '../services/userServices/hashPassword';
import { checkPassword } from '../services/userServices/checkPassword';
import { duplicateUsers } from '../services/userServices/duplicateUsers';
import jwt from 'jsonwebtoken';
import { checkUser } from '../services/userServices/checkUser';
import { getRoleFromUsername } from '../services/userServices/getRoleFromUsername';

export const registerUser = async ( req: Request, res: Response ) => {
    const { username, email, password, role } = req.body;
    try {
        if (!username) {
            res.status(400).json({ message: 'faulty request, username missing'});
        } else if (!email) {
            res.status(400).json({ message: 'faulty request, email missing'});
        } else if (!password) {
            res.status(400).json({ message: 'faulty request, password missing'});
        } else if (!role) {
            res.status(400).json({ message: 'faulty request, you must select a role'});
        } else if ( await duplicateUsers( username ) ) {
            res.status(400).json({ message: 'faulty request, user allready exists'});
        }else if ( await createUser( username, email, await hashPassword(password), role )) {
            const token = jwt.sign( {user: username, role: role}, String(process.env.JWT_SECRET) , {expiresIn: '30m'});
            res.status(200).json({
                message: 'sucess! User created',
                token: token
            })
        } else {
            res.status(400).json({ message: 'faulty request'});
        }
    } catch (error) {
        res.status(500).json({ message: 'internal server error, try again'})
    }
}

export const loginUser = async ( req: Request, res: Response ) => {
    const { username, password } = req.body;
    
    try {
        if (!username) {
            res.status(400).json({ message: 'faulty request, username missing'});
        } else if (!password) {
            res.status(400).json({ message: 'faulty request, password missing'});
        } else if (!(await checkUser( username ))){
            res.status(404).json({ message: 'faulty request, user not found'});
        } else if( await checkPassword( username, password )) {
            const role = await getRoleFromUsername( username )
            const token = jwt.sign( {user: username, role: role}, String(process.env.JWT_SECRET) , {expiresIn: '30m'});
            res.status(200).json({
                message: 'sucess, you have logged in!',
                token: token
            }) 
        } else {
            res.status(400).json({ message: 'faulty request, wrong password'});
        }
        
    } catch (error) {
        res.status(500).json({ message: 'internal server error, try again'})
    }
}