import styles from './style.module.scss';

export default function index() {
  return (
    <div className={styles.footer}>
        <a>Github</a>
        <a>Gitlab</a>
        <a>Codepen</a>
        <a>Codesandbox</a>
    </div>
  )
}
