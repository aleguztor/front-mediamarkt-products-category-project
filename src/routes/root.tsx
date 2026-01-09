import { RouteObject } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
// import { DashboardPage } from '@/pages/Dashboard';
// import { HomePage } from '@/pages/Home';
// import { LoginPage } from '@/pages/Login';
import { PATHS } from './paths';

export const routes: RouteObject[] = [
  {
    path: PATHS.LOGIN,
    element: <MainLayout />,
  },
  {
    path: PATHS.ROOT,
    element: <MainLayout />, // Aquí van el Menú y Sidebar de PrimeReact
    // children: [
    //   {
    //     index: true,
    //     element: null, // <HomePage />,
    //   },
    //   // {
    //   //   path: PATHS.DASHBOARD.ROOT,
    //   //   element: <DashboardPage />,
    //   // },
    //   // Añadir más páginas aquí es muy sencillo
    // ],
  },
];
