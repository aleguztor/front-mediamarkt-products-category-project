import { RouteObject } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { CategoriesPage, ProductsPage } from '@/pages';
import { PATHS } from './paths';

export const routes: RouteObject[] = [
  {
    path: PATHS.LOGIN,
    element: <MainLayout />,
  },
  {
    path: PATHS.ROOT,
    element: <MainLayout />, // Aquí van el Menú y Sidebar de PrimeReact
    children: [
      {
        index: true,
        element: PATHS.DASHBOARD.ROOT, // <HomePage />,
      },
      {
        path: PATHS.DASHBOARD.PRODUCTS,
        element: <ProductsPage />,
      },
      {
        path: PATHS.DASHBOARD.CATEGORIES,
        element: <CategoriesPage />,
      },
      // Añadir más páginas aquí es muy sencillo
    ],
  },
];
