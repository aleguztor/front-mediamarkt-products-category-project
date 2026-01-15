import { useEffect, useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import net8logo from '@/assets/dotnet8_logo.png';
import reactlogo from '@/assets/react.svg';
import sqlServerLogo from '@/assets/sql_server.webp';
import viteLogo from '@/assets/vite.svg';
import styles from './homePage.module.css';

const HomePage = () => {
  const animationDiv = useSpring({
    from: { y: -600 },
    to: { y: 0 },
    config: {
      mass: 2,
      friction: 80,
    },
  });

  const [textPruebaTecnica] = useSpring(
    () => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
      delay: 600,
      config: {
        duration: 400,
      },
    }),
    [],
  );
  const [textPruebaTecnica2] = useSpring(
    () => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
      delay: 900,
      config: {
        duration: 500,
      },
    }),
    [],
  );
  const [containerImages] = useSpring(
    () => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
      delay: 1100,
      config: {
        duration: 500,
      },
    }),
    [],
  );
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('visitedBefore');
    if (!hasVisited) {
      setIsFirstVisit(true);
      sessionStorage.setItem('visitedBefore', 'true');
    }
  }, []);

  return (
    <>
      <animated.div
        style={isFirstVisit ? animationDiv : {}}
        className={styles.animation}
      ></animated.div>
      <div className={styles.homePage}>
        <div className={styles.containerMainText}>
          <animated.p
            style={isFirstVisit ? textPruebaTecnica : {}}
            className={`${styles.textPruebaTecnica} ${styles.textPruebaTecnica1} `}
          >
            <strong>Bienvenida</strong>
          </animated.p>
          <animated.p
            style={isFirstVisit ? textPruebaTecnica : {}}
            className={`${styles.textPruebaTecnica} ${styles.textPruebaTecnica2} `}
          >
            Prueba
          </animated.p>
          <animated.p
            style={isFirstVisit ? textPruebaTecnica : {}}
            className={`${styles.textPruebaTecnica} ${styles.textPruebaTecnica3} `}
          >
            tecnica
          </animated.p>
        </div>
        <div className={styles.containerExplication}>
          <animated.h3 style={isFirstVisit ? textPruebaTecnica2 : {}}>
            <span>¡Hola!</span>
            Bienvenid@ a mi resolución de la prueba técnica.
          </animated.h3>
          <animated.p
            style={isFirstVisit ? textPruebaTecnica2 : { marginTop: '10px' }}
            className={styles.textPruebaTecnicaP}
          >
            Gracias por revisar mi propuesta para el desafío técnico de <strong>Ohtic</strong>. En
            las siguientes secciones podrán explorar la implementación de las funcionalidades
            solicitadas.
          </animated.p>
        </div>
        <animated.section
          style={isFirstVisit ? containerImages : {}}
          className={styles.containerLogos}
        >
          <a href="https://dotnet.microsoft.com/es-es/download/dotnet/8.0">
            <img src={net8logo} alt=".NET8 logo" />
          </a>
          <a href="https://es.react.dev/">
            <img src={reactlogo} alt="React logo" />
          </a>
          <a href="https://vite.dev/">
            <img src={viteLogo} alt="Vite logo" />
          </a>
          <a href="https://www.microsoft.com/es-es/sql-server/sql-server-downloads">
            <img src={sqlServerLogo} alt=".Sql Server Express logo" />
          </a>
        </animated.section>
      </div>
    </>
  );
};

export default HomePage;
