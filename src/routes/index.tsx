import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './root';

const router = createBrowserRouter(routes);

export const AppRouter = () => {
  return <RouterProvider router={router}  />;
};