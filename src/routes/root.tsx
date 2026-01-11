import { RouteObject } from 'react-router-dom';
import { MainLayout } from '@/layouts';
import { HomePage, ProductsPage } from '@/pages';
import { PATHS } from './paths';

export const routes: RouteObject[] = [
  {
    path: PATHS.ROOT,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: PATHS.DASHBOARD.PRODUCTS,
        element: <ProductsPage />,
      },
    ],
  },
];
