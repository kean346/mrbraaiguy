'use client';
import {Suspense} from 'react';
import {useList,Pagination,ListError} from '@/components/list';
import {Empty} from '@/components/ui';
type Activity={id:string;action:string;objectId:string;detail:string;createdAt:string};
function ActivityList(){const list=useList<Activity>('audit');return <><div className="page-head"><div><span className="eyebrow">WORKSPACE ACTIVITY</span><h1>A clear record.</h1><p>Changes to clients, menus, settings and quotations appear here.</p></div></div><ListError error={list.error} retry={list.reload}/><div className="panel table-wrap">{list.busy&&!list.data?<p className="section-panel muted">Loading activity…</p>:list.data?.items.length?<table className="data-table"><thead><tr><th>Time</th><th>Action</th><th>Detail</th></tr></thead><tbody>{list.data.items.map(a=><tr key={a.id}><td>{new Date(a.createdAt).toLocaleString('en-ZA',{timeZone:'Africa/Johannesburg'})}</td><td>{a.action}</td><td>{a.detail}</td></tr>)}</tbody></table>:<Empty title="No activity yet" detail="Saved changes and issued quotations will appear here."/>}</div>{list.data&&<Pagination {...list.data} onPage={list.go}/>}</>}
export default function AuditPage(){return <Suspense><ActivityList/></Suspense>}
