import {  ServerApiVersion } from 'mongodb';
import * as mongoose from 'mongoose';

const URI = String(process.env.URI);

export const run = async () => {
    try {
        await mongoose.connect(URI, {
            // useUnifiedTopology: true,
            // userNewUrlParser: true
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        })
    } catch (error) {
        console.error(error);
    }
}