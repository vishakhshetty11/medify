import React from 'react'
import styles from "./IconCard.module.css"
import { Link } from 'react-router-dom'
function IconCard({ title }) {
    return (
        <Link className={styles.iconLink}>
            <div className={styles.iconCardMainDiv}>
                <div>
                    <img className={styles.iconCardImage} src={`assets/img/CardIcon/${title}.png`} alt={title} />
                </div>
                <h4 className={styles.iconTitle}>{title}</h4>
            </div>
        </Link>
    )
}

export default IconCard