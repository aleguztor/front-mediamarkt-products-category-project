import { Outlet } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';

const MainLayout = () => {
  const items = [
    { label: 'Inicio', icon: 'pi pi-home', url: '/' },
    { label: 'Dashboard', icon: 'pi pi-chart-bar', url: '/dashboard' },
  ];

  return (
    <div className="layout-wrapper">
      <Menubar model={items} />
      <main style={{ padding: '2rem' }}>
        <Outlet /> {/* <-- Aquí se inyectan las páginas */}
      </main>
    </div>
  );
};

export default MainLayout;
