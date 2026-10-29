'use client';
import {useState,type FormEvent} from 'react';
import {useRouter} from 'next/navigation';
import {Banner,Button,Field} from '@/components/ui';
export default function Login(){
 const router=useRouter(),[password,setPassword]=useState(''),[show,setShow]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState('');
 async function submit(event:FormEvent){event.preventDefault();if(busy)return;setBusy(true);setError('');try{const result=await fetch('/api/access',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password})});const data=await result.json();if(!result.ok){setError(data.error||'Access failed.');return}router.replace('/dashboard');router.refresh()}catch{setError('Could not connect. Try again.')}finally{setBusy(false)}}
 return <main className="login-page"><div className="login-panel"><img src="/brand/logo.png" alt="Mr Braai Guy" className="login-logo"/><span className="eyebrow">PRIVATE WORKSPACE</span><h1>Welcome back<br/><em>to the fire.</em></h1><p>Enter the shared workspace password.</p><form noValidate onSubmit={submit}>{error&&<Banner tone="error">{error}</Banner>}<div className="password-field"><Field label="Workspace password" type={show?'text':'password'} autoComplete="current-password" value={password} onChange={event=>setPassword(event.target.value)} required/><button type="button" onClick={()=>setShow(!show)} aria-label={show?'Hide password':'Show password'}>{show?'Hide':'Show'}</button></div><Button busy={busy} type="submit">Enter workspace</Button></form></div><div className="login-art"><div className="art-glow"/><span>Crafted for<br/>memorable gatherings.</span></div></main>
}
