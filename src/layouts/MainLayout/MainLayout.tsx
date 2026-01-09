import { useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { PATHS } from '@/routes/paths';
import styles from './mainLayout.module.css';

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathProduct = PATHS.DASHBOARD.PRODUCTS;
  const pathCategories = PATHS.DASHBOARD.CATEGORIES;

  const items: MenuItem[] = useMemo(
    () => [
      {
        label: 'Productos',
        icon: 'pi pi-book',
        url: pathProduct,
        className: location.pathname === pathProduct ? 'active-menuitem' : '',
        command: () => navigate(pathProduct),
      },
      {
        label: 'Categorías',
        icon: 'pi pi-list',
        url: pathCategories,
        className: location.pathname === pathCategories ? 'active-menuitem' : '',
        command: () => navigate(pathCategories),
      },
    ],
    [location.pathname],
  );

  return (
    <div className={styles.mainLayoutContainer}>
      <header className={styles.header}>
        <a href="/">MediaMarkt Products</a>
      </header>
      <div className={styles.menuBarContainer}>
        <Menubar className={styles.menuBar} model={items} />
      </div>
      <main className={styles.sectionModuleContainer}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <p>Creado por Alejandro Guzmán Torres</p>
      </footer>
    </div>
  );
};

export default MainLayout;
