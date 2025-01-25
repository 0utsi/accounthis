'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/auth-provider';

export default function Home() {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login'); // Przekierowanie na stronę logowania
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        // Możesz opcjonalnie wyświetlić ekran ładowania podczas przekierowania
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Redirecting to login...</p>
            </div>
        );
    }

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1>Welcome to the Home Page</h1>
        </div>
    );
}
