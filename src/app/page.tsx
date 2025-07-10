'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../providers/auth-provider';
import PageLoading from '../components/ui/page-loading';

export default function Home() {
    const { isAuthenticated } = useAuth();
    const {push} = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            push('/auth/login');
        }
    }, [isAuthenticated, push]);

    if (!isAuthenticated) {
        return (
            <PageLoading />
        );
    }

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1 className='text-lg'>Welcome to the Home Page</h1>
        </div>
    );
}
