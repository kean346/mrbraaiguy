import 'server-only';
import { MongoClient, type ClientSession, type Document } from 'mongodb';
const globalDb=globalThis as unknown as {emberClient?:MongoClient;emberIndexes?:Promise<void>};
export const mongo=globalDb.emberClient??new MongoClient(process.env.MONGODB_URI||'mongodb://127.0.0.1:27017/?replicaSet=ember-rs&directConnection=true',{maxPoolSize:10,serverSelectionTimeoutMS:8000});
globalDb.emberClient=mongo;
export const db=mongo.db(process.env.MONGODB_DB||'ember_glass');
export type Stored=Document & {_id:string;ownerId:string;revision:number;createdAt:string;updatedAt:string};
export const collection=(name:string)=>db.collection<Stored>(name);
export async function ready(){await mongo.connect();globalDb.emberIndexes??=(async()=>{await Promise.all([
 collection('clients').createIndex({ownerId:1,archived:1,updatedAt:-1}),collection('clients').createIndex({ownerId:1,email:1}),
 collection('quotes').createIndex({ownerId:1,ref:1},{unique:true}),collection('quotes').createIndex({ownerId:1,status:1,updatedAt:-1}),
 collection('versions').createIndex({ownerId:1,quoteId:1,version:1},{unique:true}),collection('versions').createIndex({ownerId:1,requestId:1},{unique:true}),
 collection('menus').createIndex({ownerId:1,updatedAt:-1}),collection('audit').createIndex({ownerId:1,createdAt:-1}),
 db.collection('rate_limit').createIndex({expiresAt:1},{expireAfterSeconds:0}),
 ]);})();await globalDb.emberIndexes;}
export const now=()=>new Date().toISOString();
export async function audit(ownerId:string,action:string,objectId:string,detail:string,session?:ClientSession){await collection('audit').insertOne({_id:crypto.randomUUID(),ownerId,revision:1,createdAt:now(),updatedAt:now(),action,objectId,detail},{session});}
export function serialize<T>(doc:Document):T {const {_id,ownerId:_,...rest}=doc;void _;return {id:String(_id),...rest} as T;}
