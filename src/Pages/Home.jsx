import React from 'react'
import Hero from '../Components/Hero'
import DiscountSlider from '../Components/DiscountSlider'
import styles from './Home.module.css';
import IconCard from '../Components/IconCard'
function Home() {
    const cardTitle = ["Dentistry", "Primary Care", "Cardiology", "MRI Resonance", "Blood Test",
        "Piscologist", "Laboratory", "X-Ray"];
    return (
        <div>
            <Hero />
            <DiscountSlider />
            <div className={styles.SpecializationDiv}>
                <h2 className={styles.specialHeading}>Find by specialisation</h2>
                <div className={styles.innerSpecialDiv}>
                    {
                        cardTitle.map(title => (
                            <IconCard title={title} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Home