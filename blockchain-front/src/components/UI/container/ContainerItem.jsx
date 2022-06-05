import styles from './ContainerItem.module.css';

function ContainerItem(props) {
    return <div className={styles.item}>{props.children}</div>
}

export default ContainerItem;