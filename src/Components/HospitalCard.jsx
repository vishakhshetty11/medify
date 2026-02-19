import React from 'react';
import style from './HospitalCard.module.css';
function HospitalCard({data}) {
  return (
    <div className={style.HospitalMainCard}>
        <div className={style.imageContainer}>
            <img src='assets/img/hospitalCardImage.png' alt='cardImage' className={style.cardImage} />
        </div>
        <div className={style.contentContainer}>
            <h3>{data["Hospital Name"]}</h3>  
            <button>Book FREE Center Visit</button>      
        </div>
    </div>
  )
}

export default HospitalCard