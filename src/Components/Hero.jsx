import React from 'react'
import styles from './Hero.module.css';
import MedifyButton from './Utility/MedifyButton';
import HeroSearchCard from './HeroSearchCard';
function Hero() {
    return (
        <div className={styles.mainHeroDiv}>
            <div className={styles.heroContent}>
                <h4 className={styles.subHeading}>Skip the travel! Find Online Medical Centers</h4>
                <h2 className={styles.mainHeading}>Medical<span className={styles.hilightHeading}> Centers</span></h2>
                <p className={styles.heroPara}>Connect instantly with a 24x7 specialist or choose to video visit a particular doctor.</p>
                <MedifyButton title="Find Centers" />
            </div>
            <img className={styles.heroImage} src='/assets/hero_image.png' alt="heroImage" />
            <HeroSearchCard />
        </div>
    )
}

export default Hero