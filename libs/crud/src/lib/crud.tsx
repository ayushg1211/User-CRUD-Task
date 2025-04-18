import UserTable from './components/UserTable';
import styles from './crud.module.css';

export function Crud() {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Crud!</h1>
      <UserTable/>
    </div>
  );
}

export default Crud;
