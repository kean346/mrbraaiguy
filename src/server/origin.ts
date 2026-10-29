import 'server-only';

export function isSameOrigin(request:Request){
 const origin=request.headers.get('origin');
 if(!origin)return false;
 try{
  const allowed=new Set<string>([new URL(request.url).origin]);
  const configured=process.env.BETTER_AUTH_URL;
  if(configured)allowed.add(new URL(configured).origin);
  const forwardedHost=request.headers.get('x-forwarded-host');
  if(forwardedHost){
   const protocol=request.headers.get('x-forwarded-proto')||'https';
   allowed.add(`${protocol}://${forwardedHost}`);
  }
  return allowed.has(new URL(origin).origin);
 }catch{return false}
}

export function isSecureRequest(request:Request){
 return request.headers.get('x-forwarded-proto')==='https'||new URL(request.url).protocol==='https:';
}
