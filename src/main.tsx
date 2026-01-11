import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'primeicons/primeicons.css';
import App from './App.tsx';
import { ToastProvider } from './Contexts/ToastContext.tsx';
import './index.css';
import { store } from './store';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PrimeReactProvider value={{ locale: 'es' }}>
          <ToastProvider>
            <App />
          </ToastProvider>
        </PrimeReactProvider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
);
