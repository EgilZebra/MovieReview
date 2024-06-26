import * as  bcrypt from 'bcryptjs';

export async function hashPassword( password: string ) {
    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash( password, salt )
    return hashedPassword;
}