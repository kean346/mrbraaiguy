export class ApiError extends Error {status:number;fields?:Record<string,string>;constructor(message:string,status:number,fields?:Record<string,string>){super(message);this.status=status;this.fields=fields}}
export async function api<T>(path:string,init?:RequestInit):Promise<T>{const r=await fetch(`/api/workspace/${path}`,{credentials:'same-origin',...init,headers:{...({'Content-Type':'application/json'}),...init?.headers}});if(!r.ok){let error:Record<string,unknown>={};try{error=await r.json()}catch{}throw new ApiError(String(error.error||`Request failed (${r.status})`),r.status,error.fields as Record<string,string>|undefined)}return r.json() as Promise<T>}
export const json=(method:string,body:unknown):RequestInit=>({method,body:JSON.stringify(body)});
export const errorText=(e:unknown)=>e instanceof Error?e.message:'Something went wrong. Try again.';
export type Page<T>={items:T[];total:number;page:number;pageSize:number};
