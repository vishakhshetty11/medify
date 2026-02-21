import React from 'react';
import style from './HospitalCard.module.css';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
function HospitalCard({ data }) {
  return (
    <div className={style.HospitalMainCard}>
      <div className={style.imageContainer}>
        <img src='/assets/img/hospitalCardImage.png' alt='cardImage' className={style.cardImage} />
      </div>
      <div className={style.contentContainer}>
        <h3 className={style.hospitalName}>{data["Hospital Name"]}</h3>
        <p className={style.hospitalType}>{data["Hospital Type"]}</p>
        <p className={style.hospitalType}>more</p>
        <p className={style.hospitalType}>
          <span className={style.free}>FREE </span>
          <span className={style.amount}> ₹500</span> Consultation Fee at clinic
        </p>
        <div className={style.bookingButtonDiv}>
          <span className={style.rating}>
            <ThumbUpIcon sx={{ fontSize: "13px" }} />
            <span>{data["Hospital overall rating"]}</span>
          </span>

          <button className={style.bookingButton}>Book FREE Centers Visit</button>
        </div>
      </div>
    </div >
  )
}

export default HospitalCard