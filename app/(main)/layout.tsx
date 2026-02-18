import Header from "@/common/Header"
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'

export default async function MainLayout({ children }: { children: React.ReactNode }) {
    const user = await getSession();
    if (!user) redirect('/');
    
    return (
        <>
            <Header />
            {children}
        </>
    )
}