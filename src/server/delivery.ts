import 'server-only';
import {createHash} from 'node:crypto';
import {z} from 'zod';
import {collection,audit,db} from './db';
import {HttpError} from './auth';
import {Binary} from 'mongodb';

export const deliveryConfigured=()=>!!(process.env.RESEND_API_KEY&&process.env.QUOTE_EMAIL_FROM);
export async function sendQuotation(ownerId:string,id:string,body:unknown){
 const input=z.object({email:z.email().max(200),version:z.number().int().positive(),requestId:z.uuid()}).strict().parse(body);
 if(!deliveryConfigured())throw new HttpError(503,'Email sending is not configured. Download the PDF and attach it in your email app.');
 const quote=await collection('quotes').findOne({_id:id,ownerId});
 if(!quote)throw new HttpError(404,'Quotation not found.');
 if(quote.status==='draft'||quote.lastVersion!==input.version)throw new HttpError(409,'Review and issue the latest quotation before sending.');
 const version=await collection('versions').findOne({ownerId,quoteId:id,version:input.version});
 if(!version)throw new HttpError(404,'Issued PDF not found.');
 const hour=Math.floor(Date.now()/3600000);
 const limit=await db.collection<{_id:string;count:number;expiresAt:Date}>('rate_limit').findOneAndUpdate({_id:`email:${ownerId}:${hour}`},{$inc:{count:1},$setOnInsert:{expiresAt:new Date(Date.now()+7200000)}},{upsert:true,returnDocument:'after'});
 if((limit?.count||0)>20)throw new HttpError(429,'Email limit reached. Try again in an hour.');
 const key=createHash('sha256').update(`${ownerId}:${id}:${input.version}:${input.email.toLowerCase()}:${input.requestId}`).digest('hex');
 const response=await fetch('https://api.resend.com/emails',{method:'POST',signal:AbortSignal.timeout(20000),headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':key},body:JSON.stringify({from:process.env.QUOTE_EMAIL_FROM,to:[input.email],subject:`Your Mr Braai Guy quotation ${quote.ref}`,text:`Please find attached your Mr Braai Guy quotation ${quote.ref}.\n\nKind regards,\nMr Braai Guy`,attachments:[{filename:`MrBraaiGuy_${quote.ref}_v${input.version}.pdf`,content:Buffer.from((version.pdf as Binary).buffer).toString('base64')}]})});
 if(!response.ok)throw new HttpError(502,'The email provider did not confirm sending. Retry with the same recipient or use the downloaded PDF.');
 await audit(ownerId,'Quotation email accepted',id,`Version ${input.version}; recipient ${input.email}`);
 return {accepted:true};
}
