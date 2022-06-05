import styles from './Section.module.css';

function Section(props) {
    return <div className={styles.section}>
        <h1>{props.title}</h1>
        <div>{props.children}</div>
    </div>
}

export default Section;