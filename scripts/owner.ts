import {betterAuth} from 'better-auth';
import {mongodbAdapter} from 'better-auth/adapters/mongodb';
import {MongoClient} from 'mongodb';
const email=process.env.OWNER_EMAIL?.trim().toLowerCase();
const password=process.env.OWNER_BOOTSTRAP_PASSWORD;
if(!email||!password||password.length<12||!process.env.BETTER_AUTH_SECRET||process.env.BETTER_AUTH_SECRET.length<32){console.error('Set OWNER_EMAIL, OWNER_BOOTSTRAP_PASSWORD (12+ characters), and BETTER_AUTH_SECRET (32+ characters) in your environment.');process.exit(1)}
const mongo=new MongoClient(process.env.MONGODB_URI||'mongodb://127.0.0.1:27017/?replicaSet=ember-rs&directConnection=true');
try{await mongo.connect();const db=mongo.db(process.env.MONGODB_DB||'ember_glass');if(await db.collection('user').findOne({email})){console.error('Owner already exists. No account was changed.');process.exitCode=1}else{const auth=betterAuth({secret:process.env.BETTER_AUTH_SECRET,baseURL:process.env.BETTER_AUTH_URL||'http://localhost:3000',database:mongodbAdapter(db,{client:mongo}),emailAndPassword:{enabled:true,minPasswordLength:12}});const result=await auth.api.signUpEmail({body:{name:'Mr Braai Guy Owner',email,password}});if(!result.user||result.user.email!==email)throw new Error('Owner creation failed');console.log(`Owner account created: ${email}. Remove OWNER_BOOTSTRAP_PASSWORD from your environment now.`)}}catch(e){console.error(e instanceof Error?e.message:'Owner setup failed');process.exitCode=1}finally{await mongo.close()}
