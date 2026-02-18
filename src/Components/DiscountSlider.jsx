import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper/modules";
// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";
import styles from './DiscountSlider.module.css'
function DiscountSlider() {
    return (
        <div className={styles.discMainCard}>
            <Swiper
                spaceBetween={50}
                slidesPerView={3}
                modules={[Pagination]}
                pagination={{ clickable: true }}  
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                <SwiperSlide>
                    <div className={styles.discountCard1}>

                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.discountCard2}>

                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.discountCard1}>

                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.discountCard2}>

                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default DiscountSlider