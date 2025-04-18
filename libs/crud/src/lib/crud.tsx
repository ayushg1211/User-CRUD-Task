import UserTable from './components/UserTable';
import { Provider } from './context/context';
import styles from './crud.module.css';

export function Crud() {
  return (
    <Provider>
      <div className={styles['container']}>
          <h1>Welcome to Crud!</h1>
          <UserTable/>
      </div>
    </Provider>

  );
}

export default Crud;
