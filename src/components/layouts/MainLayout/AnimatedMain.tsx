import { Outlet, useLocation } from 'react-router-dom';
import { animated, useTransition } from '@react-spring/web';
import styles from './mainLayout.module.css';

const AnimatedMain = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const transitions = useTransition(location, {
    from: isHome ? {} : { opacity: 0, transform: 'translate3d(0px, -20px, 0)' },
    enter: isHome ? {} : { opacity: 1, transform: 'translate3d(0px, 0, 0)' },
    leave: isHome ? {} : { opacity: 0, transform: 'translate3d(0px, 0, 0)' },
    config: { tension: 200, friction: 15 },
    exitBeforeEnter: true,
  });

  return transitions((style) => (
    <animated.div className={styles.sectionModuleContainer} style={{ ...style }}>
      <Outlet />
    </animated.div>
  ));
};
export default AnimatedMain;
