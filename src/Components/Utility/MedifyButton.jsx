import React from 'react'
import styles from './medifyButton.module.css'
function MedifyButton({ title, clickEvent }) {
    return (
        <button type="button" className={styles.primaryButton}>{title}</button>
    )
}

export default MedifyButton