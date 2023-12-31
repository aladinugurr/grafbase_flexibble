import {getServerSession} from 'next-auth'

import {NextAuthOptions, User} from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import jsonwebtoken from 'jsonwebtoken'
import { AdapterUser } from "next-auth/adapters";
import {JWT} from 'next-auth/jwt'
import { SessionInterface, UserProfile } from '@/common.types'
import { createUser, getUser } from './actions';

export const authOptions: NextAuthOptions = {
	providers: [
	  GoogleProvider({
		clientId: process.env.GOOGLE_CLIENT_ID!,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
	  }),
	],
	jwt: {
		encode: ({secret, token})=> {
			const encodedToken = jsonwebtoken.sign({
				...token,
				iss: 'grafbase',
				exp: Math.floor(Date.now() / 1000) + 60 * 60
			},secret)
			return encodedToken;
		} ,
		decode: async ({secret, token})=> {
			const decodedToken = jsonwebtoken.verify(token!, secret);

			return decodedToken as JWT;
		}
	},
	theme: {
		colorScheme: 'light',
		logo: '/logo.svg'
	},
	callbacks: {
		async session({session}) {
			const email = session?.user?.email as string;
			try {
				const data = await getUser(email) as {user?: User}; 
				const newSession = {
					...session,
					user: {
						...session.user,
						...data?.user
					},
				}
				return newSession;
			} catch(error: any) {
				console.log(error);
				return session;
			}
			
		},
		async signIn({user}: {user: AdapterUser | User}) {
			try {
				const userExist = await getUser(user?.email as string) as {user?: UserProfile	}
				//if user not exist create new one
				if (!userExist.user) {
					await createUser(user.name as string, user.email as string, user.image as string);
				}
				return true;
			} catch(error) {
				console.log(error);
				return false;
			}
		}
	}
}

export async function getCurrentUser() {
	const session = await getServerSession(authOptions) as SessionInterface;
  
	return session;
  }
