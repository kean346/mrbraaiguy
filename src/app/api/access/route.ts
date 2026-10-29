import {createHash} from 'node:crypto';
import {z} from 'zod';
import {ACCESS_COOKIE,ACCESS_MAX_AGE,createAccessToken,HttpError,safeEqual,workspacePassword} from '@/server/auth';
import {db,ready} from '@/server/db';
export const runtime='nodejs';
const input=z.object({password:z.string().min(1).max(256)}).strict();
const response=(error:string,status:number)=>Response.json({error},{status,headers:{'Cache-Control':'no-store'}});
function allowedOrigin(request:Request){try{return new URL(process.env.BETTER_AUTH_URL||'http://localhost:3000').origin===request.headers.get('origin')}catch{return false}}
export async function POST(request:Request){
 try{
  if(!allowedOrigin(request))return response('Invalid request origin.',403);
  const body=input.safeParse(await request.json().catch(()=>null));
  if(!body.success)return response('Enter the workspace password.',422);
  await ready();
  const ip=(request.headers.get('x-forwarded-for')||'unknown').split(',')[0].trim().slice(0,80);
  const window=Math.floor(Date.now()/900000);
  const key='workspace-access:'+createHash('sha256').update(`${ip}:${window}`).digest('hex');
  const attempts=await db.collection<{_id:string;count:number;expiresAt:Date}>('rate_limit').findOneAndUpdate({_id:key},{$inc:{count:1},$setOnInsert:{expiresAt:new Date(Date.now()+15*60_000)}},{upsert:true,returnDocument:'after'});
  if((attempts?.count||0)>5)return response('Too many attempts. Try again in 15 minutes.',429);
  if(!safeEqual(body.data.password.trim(),workspacePassword()))return response('Incorrect workspace password.',401);
  const secure=(process.env.BETTER_AUTH_URL||'').startsWith('https://');
  const cookie=`${ACCESS_COOKIE}=${encodeURIComponent(createAccessToken())}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${ACCESS_MAX_AGE}${secure?'; Secure':''}`;
  return Response.json({ok:true},{headers:{'Cache-Control':'no-store','Set-Cookie':cookie}});
 }catch(error){
  if(error instanceof HttpError)return response(error.message,error.status);
  console.error(JSON.stringify({event:'workspace_access_error',errorType:error instanceof Error?error.name:'unknown'}));
  return response('Workspace access could not be checked. Try again.',500);
 }
}
export async function DELETE(){return Response.json({ok:true},{headers:{'Cache-Control':'no-store','Set-Cookie':`${ACCESS_COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`}})}
