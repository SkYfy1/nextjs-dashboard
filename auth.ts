import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod'
import type { User } from './app/lib/definitions';
import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';

async function getUser(email: string): Promise<User | undefined> {
    try {
        const user: any = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
        return user[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredential = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredential.success) {
                    const { email, password } = parsedCredential.data;
                    const user = await getUser(email);
                    if (!user) return null;

                    const passwordMatch = await bcrypt.compare(password, user.password);

                    if (passwordMatch) return user;
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});