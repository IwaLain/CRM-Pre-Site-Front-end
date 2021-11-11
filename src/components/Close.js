import styles from '../scss/components/close-btn.module.scss'

const Close = ({ toggle }) => {
    return(
        <button className={styles.close} onClick={toggle}/>
    )
}

export default Close