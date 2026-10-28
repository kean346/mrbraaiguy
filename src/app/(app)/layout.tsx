import {requirePageOwner} from '@/server/auth';import {AppShell} from '@/components/shell';
export default async function PrivateLayout({children}:{children:React.ReactNode}){await requirePageOwner();return <AppShell>{children}</AppShell>}
