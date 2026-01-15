import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { PATHS } from '@/routes/paths';
import AnimatedMain from './AnimatedMain';
import styles from './mainLayout.module.css';

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathProduct = PATHS.DASHBOARD.PRODUCTS;

  const items: MenuItem[] = useMemo(
    () => [
      {
        label: 'Productos',
        url: pathProduct,
        className: location.pathname === pathProduct ? 'active-menuitem' : '',
        command: () => navigate(pathProduct),
      },
    ],
    [location.pathname],
  );

  return (
    <div className={styles.mainLayoutContainer}>
      <div className={styles.header}>
        <Menubar
          start={
            <a className={styles.iconHome} href="/">
              <img
                className={styles.img}
                src="https://cms-images.mmst.eu/osyynfyvlyjc/44h8niXHULqXsrJQIX29AZ/56e82d73704471511e9484f373b39f39/MM_logo_white.svg?q=80"
                alt="Mediamarkt logo"
              />
            </a>
          }
          className={styles.menuBar}
          model={items}
        />
      </div>
      <AnimatedMain />
      <footer className={styles.footer}>
        <div className={styles.footerInfo}>
          <p>
            Creado por <strong>Alejandro Guzmán Torres</strong>
          </p>
          <p>
            <strong>Prueba IT </strong>Mediamarkt
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
