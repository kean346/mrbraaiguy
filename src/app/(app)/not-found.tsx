import Link from 'next/link';
export default function WorkspaceNotFound(){return <section className="panel section-panel"><span className="eyebrow">PAGE NOT FOUND</span><h1 className="serif">The page is not here.</h1><p className="muted">Use the workspace navigation to find the record you need.</p><Link className="button primary" href="/dashboard">Return to dashboard</Link></section>}
