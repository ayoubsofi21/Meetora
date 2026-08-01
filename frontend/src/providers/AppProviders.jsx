import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { queryClient } from '@/lib/queryClient';

/**
 * Wraps the app with all global providers: routing, server state, and toast notifications.
 */
export default function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
        <Toaster
          position="top-right"
          gutter={12}
          toastOptions={{
            duration: 4000,
            className: 'font-sans text-sm',
            style: {
              borderRadius: '1rem',
              padding: '12px 16px',
              boxShadow: '0 12px 32px rgba(15, 23, 42, 0.12)',
              border: '1px solid #F1F4FE',
            },
            success: {
              iconTheme: { primary: '#16A34A', secondary: '#F0FDF4' },
            },
            error: {
              iconTheme: { primary: '#DC2626', secondary: '#FEF2F2' },
            },
          }}
        />
      </BrowserRouter>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} position="bottom" />}
    </QueryClientProvider>
  );
}