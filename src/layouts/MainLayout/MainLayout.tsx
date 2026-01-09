import { Outlet } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import styles from './mainLayout.module.css';

const MainLayout = () => {
  const items: MenuItem[] = [
    { label: 'Inicio', icon: 'pi pi-home', url: '/' },
    { label: 'Productos', icon: 'pi pi-book', url: '/products' },
    { label: 'Categorías', icon: 'pi pi-list', url: '/categories' },
  ];

  return (
    <>
      <Menubar model={items} />
      <main className={styles.sectionModuleContainer}>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
