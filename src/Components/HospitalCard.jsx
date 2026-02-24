import React, { useRef, useState } from "react";
import style from "./HospitalCard.module.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { IconButton, Button } from "@mui/material";
import dayjs from "dayjs";

function HospitalCard({ data, enableBooking = true }) {
  const scrollRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [showTimeSlot, setShowTimeSlot] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const dates = Array.from({ length: 14 }, (_, i) =>
    dayjs().add(i, "day")
  );

  const timeSlots = {
    Morning: ["11:30 AM"],
    Afternoon: ["12:00 PM", "12:30 PM", "01:30 PM", "02:00 PM", "02:30 PM"],
    Evening: ["06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM"]
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -scrollRef.current.clientWidth,
      behavior: "smooth"
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: scrollRef.current.clientWidth,
      behavior: "smooth"
    });
  };

  const handleBookVisit = (id) => {
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    const existingIndex = bookings.findIndex((b) => b["Provider ID"] === id);
    if (existingIndex !== -1) {
      // Update existing booking
      //setSelectedDate(bookings[existingIndex].date);
      setSelectedTime(bookings[existingIndex].time);
    }
    setShowTimeSlot(prev => (!prev))
  }

  const handleTimeClick = (e, time) => {
    e.stopPropagation();
    setSelectedTime(time);
  };

  const bookAppointment = (e) => {
    if (selectedDate && selectedTime) {
      e.stopPropagation();
      const newBooking = {
        ...data,
        date: selectedDate.format("YYYY-MM-DD"),
        time: selectedTime
      };

      let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

      const existingIndex = bookings.findIndex(
        (b) => b["Provider ID"]=== newBooking["Provider ID"]
      );

      if (existingIndex !== -1) {
        // Update existing booking
        bookings[existingIndex].date = newBooking.date;
        bookings[existingIndex].time = newBooking.time;
      } else {
        // Add new booking
        bookings.push(newBooking);
      }

      localStorage.setItem("bookings", JSON.stringify(bookings));
      setSelectedTime(null);
      setSelectedDate(dayjs());
      setShowTimeSlot(prev => (!prev))
      if (existingIndex !== -1) {
        alert("Appointement Updated!");
      } else {
        alert("Appointement Booked!");
      }
    }
    else {
      alert("Select Date and time!");
    }
  }

  return (
    <div className={style.HospitalMainCard}
      onClick={() => {
        if (enableBooking) {
          handleBookVisit(data["Provider ID"]);
        }
      }} >
      {/* Hospital Image */}
      <div className={style.imageContainer}>
        <img
          src="/assets/img/hospitalCardImage.png"
          alt="hospital"
          className={style.cardImage}
        />
      </div>

      {/* Hospital Details */}
      <div className={style.contentContainer}>
        <h3 className={style.hospitalName}>{data["Hospital Name"]}</h3>
        {!enableBooking &&
          <div className={style.dateTimeButtonDiv}>
            <Button className={style.timeButton} variant="outlined" sx={{ marginRight: "15px" }} >
              {data.time}
            </Button>
            <Button className={style.dateButton} variant="outlined" >
              {dayjs(data.date).format("D MMMM YYYY")}
            </Button>
          </div>
        }
        <p className={style.hospitalType}>{data["Hospital Type"]}</p>
        <p className={style.hospitalType}>more</p>
        {enableBooking &&
          <p className={style.hospitalType}>
            <span className={style.free}>FREE </span>
            <span className={style.amount}>₹500</span> Consultation Fee at clinic
          </p>
        }
        <div className={style.bookingButtonDiv}>
          <span className={style.rating}>
            <ThumbUpIcon sx={{ fontSize: "13px" }} />
            <span>{data["Hospital overall rating"]}</span>
          </span>
          {enableBooking &&
            <button className={style.bookingButton} onClick={bookAppointment}>
              Book FREE Center Visit
            </button>
          }
        </div>
        {showTimeSlot && <>
          {/* DATE SLIDER */}
          <div className={style.dateSlider}>
            <IconButton onClick={scrollLeft}>
              <ChevronLeftIcon />
            </IconButton>

            <div ref={scrollRef} className={style.dateContainer}>
              {dates.map((date, index) => {
                const isSelected = selectedDate.isSame(date, "day");

                return (
                  <div
                    key={index}
                    className={`${style.dateItem} ${isSelected ? style.activeDate : ""
                      }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDate(date);
                      scrollRef.current.children[index].scrollIntoView({
                        behavior: "smooth",
                        inline: "center"
                      });
                    }}
                  >
                    <div className={style.dateTitle}>
                      {index === 0
                        ? "Today"
                        : index === 1
                          ? "Tomorrow"
                          : date.format("ddd, D MMM")}
                    </div>

                    <div className={style.slotText}>
                      17 Slots Available
                    </div>
                  </div>
                );
              })}
            </div>

            <IconButton onClick={scrollRight}>
              <ChevronRightIcon />
            </IconButton>
          </div>

          {/* TIME SLOTS */}
          <div className={style.timeSlotContainer}>
            {Object.entries(timeSlots).map(([period, slots]) => (
              <>
                <div className={style.timeAndPeriodDiv}>
                  <div key={period} className={style.timeSection}>
                    <p className={style.timeTitle}>{period}</p>
                  </div>
                  <div className={style.timeButtons}>
                    {slots.map((time, i) => (
                      <button key={i} className={`${style.timeButton} ${selectedTime === time ? style.activeTime : ""}`}
                        onClick={(e) => handleTimeClick(e, time)}>
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                <hr style={{ borderTop: "0.5px solid #dbdbdb", margin: "5px 0" }} />
              </>
            ))}
          </div>
        </>}
      </div>
    </div >
  );
}

export default HospitalCard;