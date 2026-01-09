import { Outlet } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';

const MainLayout = () => {
  const items: MenuItem[] = [
    { label: 'Inicio', icon: 'pi pi-home', url: '/' },
    { label: 'Productos', icon: 'pi pi-book', url: '/products' },
    { label: 'Categorías', icon: 'pi pi-list', url: '/categories' },
  ];

  return (
    <div className="layout-wrapper">
      <Menubar model={items} />
      <main style={{ padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
