import styles from './titlepage.module.css';

const TitlePage = ({ title }: { title: string }) => {
  return <h2 className={styles.title}>{title}</h2>;
};
export default TitlePage;
