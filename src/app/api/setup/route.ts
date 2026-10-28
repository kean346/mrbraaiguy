import {createHash,timingSafeEqual} from 'node:crypto';
import {betterAuth} from 'better-auth';
import {mongodbAdapter} from 'better-auth/adapters/mongodb';
import {z} from 'zod';
import {db,mongo} from '@/server/db';
export const runtime='nodejs';
const input=z.object({code:z.string().min(32).max(256),password:z.string().min(12).max(128)}).strict();
const reply=(message:string,status:number)=>Response.json({error:message},{status,headers:{'Cache-Control':'no-store'}});
export async function POST(request:Request){
 const expected=process.env.OWNER_SETUP_CODE,owner=process.env.OWNER_EMAIL?.trim().toLowerCase(),secret=process.env.BETTER_AUTH_SECRET;
 if(!expected||expected.length<32||!owner||!secret||secret.length<32||!process.env.MONGODB_URI)return reply('Owner setup is not configured.',503);
 const origin=request.headers.get('origin');if(origin!==process.env.BETTER_AUTH_URL)return reply('Invalid request origin.',403);
 if(!request.headers.get('content-type')?.includes('application/json'))return reply('Use a JSON request.',415);
 const raw=await request.text();if(raw.length>2048)return reply('Request too large.',413);
 let data:z.infer<typeof input>;try{data=input.parse(JSON.parse(raw))}catch{return reply('Enter the setup code and a password of at least 12 characters.',422)}
 await mongo.connect();
 const ip=(request.headers.get('x-forwarded-for')||'unknown').split(',')[0].trim().slice(0,80);
 const key='owner-setup:'+createHash('sha256').update(ip+':'+Math.floor(Date.now()/900000)).digest('hex');
 const attempts=await db.collection<{_id:string;count:number;expiresAt:Date}>('rate_limit').findOneAndUpdate({_id:key},{$inc:{count:1},$setOnInsert:{expiresAt:new Date(Date.now()+15*60_000)}},{upsert:true,returnDocument:'after'});
 if((attempts?.count||0)>5)return reply('Too many attempts. Try again in 15 minutes.',429);
 const a=createHash('sha256').update(data.code).digest(),b=createHash('sha256').update(expected).digest();
 if(!timingSafeEqual(a,b))return reply('Invalid setup code.',403);
 const users=db.collection('user'),guard=db.collection<{_id:string;state:string;createdAt:Date;completedAt?:Date}>('setup_guard');
 if(await users.findOne({email:owner},{projection:{_id:1}})||await guard.findOne({_id:'owner'}))return reply('Owner setup is already complete.',409);
 try{await guard.insertOne({_id:'owner',createdAt:new Date(),state:'creating'})}catch{return reply('Owner setup is already in progress or complete.',409)}
 try{
  const setupAuth=betterAuth({secret,baseURL:process.env.BETTER_AUTH_URL,database:mongodbAdapter(db,{client:mongo}),emailAndPassword:{enabled:true,minPasswordLength:12}});
  const result=await setupAuth.api.signUpEmail({body:{name:'Mr Braai Guy Owner',email:owner,password:data.password}});
  if(result.user?.email?.toLowerCase()!==owner)throw new Error('Owner creation failed');
  await guard.updateOne({_id:'owner'},{$set:{state:'complete',completedAt:new Date()}});
  return Response.json({ok:true},{status:201,headers:{'Cache-Control':'no-store'}});
 }catch{
  if(!await users.findOne({email:owner},{projection:{_id:1}}))await guard.deleteOne({_id:'owner',state:'creating'});
  return reply('Owner setup failed. Check the database connection and try again.',500);
 }
}
