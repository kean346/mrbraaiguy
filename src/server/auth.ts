import 'server-only';
import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { db,mongo } from './db';
export const auth=betterAuth({appName:'Ember Glass',baseURL:process.env.BETTER_AUTH_URL||'http://localhost:3000',secret:process.env.BETTER_AUTH_SECRET,database:mongodbAdapter(db,{client:mongo}),emailAndPassword:{enabled:true,disableSignUp:true,minPasswordLength:12},session:{expiresIn:60*60*12,updateAge:60*30,cookieCache:{enabled:false}},advanced:{useSecureCookies:process.env.BETTER_AUTH_URL?.startsWith('https://')??false},rateLimit:{enabled:true,storage:'database',window:60,max:60,customRules:{'/sign-in/email':{window:60,max:5}}},trustedOrigins:[process.env.BETTER_AUTH_URL||'http://localhost:3000']});
export async function requireOwner(h:Headers){const session=await auth.api.getSession({headers:h});if(!session)throw new HttpError(401,'Your session has expired. Sign in again to continue.');if(!process.env.OWNER_EMAIL||session.user.email.toLowerCase()!==process.env.OWNER_EMAIL.toLowerCase())throw new HttpError(403,'This account does not have access to the owner workspace.');return session;}
export async function requirePageOwner(){try{return await requireOwner(await headers());}catch(e){if(e instanceof HttpError&&e.status===401)redirect('/login');throw e;}}
export class HttpError extends Error {constructor(public status:number,message:string){super(message);}}
