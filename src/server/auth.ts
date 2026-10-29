import 'server-only';
import {createHash,createHmac,timingSafeEqual} from 'node:crypto';
import {headers} from 'next/headers';
import {redirect} from 'next/navigation';

export const ACCESS_COOKIE='ember_glass_access';
export const ACCESS_MAX_AGE=60*60*12;
export const WORKSPACE_OWNER_ID='ember-glass-owner';

function signingSecret(){
 const secret=process.env.BETTER_AUTH_SECRET;
 if(!secret||secret.length<32)throw new HttpError(503,'Workspace access is not configured.');
 return secret;
}

export function workspacePassword(){
 const password=process.env.APP_ACCESS_PASSWORD||process.env.OWNER_SETUP_CODE;
 if(!password||password.trim().length<12)throw new HttpError(503,'Workspace password is not configured.');
 return password.trim();
}

export function safeEqual(left:string,right:string){
 const a=createHash('sha256').update(left).digest();
 const b=createHash('sha256').update(right).digest();
 return timingSafeEqual(a,b);
}

export function createAccessToken(){
 const expires=Math.floor(Date.now()/1000)+ACCESS_MAX_AGE;
 const payload=`v1.${expires}`;
 const signature=createHmac('sha256',signingSecret()).update(payload).digest('base64url');
 return `${payload}.${signature}`;
}

function validAccessToken(token:string|undefined){
 if(!token)return false;
 const [version,expiresText,signature,...rest]=token.split('.');
 if(version!=='v1'||rest.length||!signature)return false;
 const expires=Number(expiresText);
 if(!Number.isSafeInteger(expires)||expires<=Math.floor(Date.now()/1000))return false;
 const payload=`${version}.${expiresText}`;
 const expected=createHmac('sha256',signingSecret()).update(payload).digest('base64url');
 return safeEqual(signature,expected);
}

function cookieValue(h:Headers,name:string){
 const value=h.get('cookie')?.split(';').map(item=>item.trim()).find(item=>item.startsWith(`${name}=`))?.slice(name.length+1);
 if(!value)return undefined;
 try{return decodeURIComponent(value)}catch{return undefined}
}

export async function requireOwner(h:Headers){
 if(!validAccessToken(cookieValue(h,ACCESS_COOKIE)))throw new HttpError(401,'Your workspace access has expired. Enter the shared password again.');
 return {user:{id:WORKSPACE_OWNER_ID,email:process.env.OWNER_EMAIL||''}};
}

export async function requirePageOwner(){
 try{return await requireOwner(await headers())}catch(error){if(error instanceof HttpError&&error.status===401)redirect('/login');throw error}
}

export class HttpError extends Error {constructor(public status:number,message:string){super(message)}}
