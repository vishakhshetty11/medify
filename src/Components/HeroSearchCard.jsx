import React from 'react'
import styles from './HeroSearchCard.module.css'
import SearchDiv from './SearchDiv'
import IconCard from './IconCard'
function HeroSearchCard() {
    const cardTitle = ["Doctors", "Labs", "Hospitals", "Medical Store", "Ambulance"];
    return (
        <div className={styles.mainHeroCard}>
            <SearchDiv />
            <div>
                <h4 className={styles.hedaing}>You may be looking for</h4>
            </div>
            <div className={styles.iconCardDiv}>
                {
                    cardTitle.map(title => (
                        <IconCard title={title} />
                    ))
                }

            </div>
        </div>
    )
}

export default HeroSearchCard