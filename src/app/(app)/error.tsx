'use client';
import Link from 'next/link';
import {useEffect} from 'react';
import {Button} from '@/components/ui';
export default function WorkspaceError({error,reset}:{error:Error&{digest?:string};reset:()=>void}){useEffect(()=>{console.error('Workspace route failed',error.digest||error.name)},[error]);return <section className="panel section-panel"><span className="eyebrow">WORKSPACE ERROR</span><h1 className="serif">This page could not be loaded.</h1><p className="muted">Your changes may not have been saved. Return to the dashboard and check the latest record before trying again.</p><div className="inline-actions"><Button onClick={reset}>Try again</Button><Link href="/dashboard" className="button secondary">Dashboard</Link></div></section>}
