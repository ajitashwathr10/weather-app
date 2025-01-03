'use client'

import {Inter} from 'next/font/google';
import './globals.css';
import {QueryClient, QueryClientProvider} from 'react-query';

const inter = Inter({subsets: ['latin']});
export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client = {queryClient}>
      <div className = "font-inter">
        {children}
      </div>
    </QueryClientProvider>
  );
}