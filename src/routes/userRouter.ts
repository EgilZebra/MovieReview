import express, { Router } from 'express';
import { registerUser, loginUser } from '../controllers/userController';

export const user: Router = express.Router();

// Create a new user
user.post('/register', registerUser);

// Login as an existing user
user.post('/login', loginUser )