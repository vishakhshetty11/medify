import React, { useState } from 'react'
import styles from './MyBooking.module.css';
import LowerNav from '../Components/LowerNav';
import { Button, TextField, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HospitalCard from '../Components/HospitalCard';
function MyBooking() {
  const [myBookings, setMyBookings] = useState(JSON.parse(localStorage.getItem("bookings")) || []);
  const [filteredBookings, setFilteredBookings] = useState(JSON.parse(localStorage.getItem("bookings")) || []);
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }

  const handleSearchBooking = () => {
    if (searchText.trim() !== "") {
      const filteredData = myBookings.filter(item =>
      (item["Hospital Name"].toLowerCase()
        .includes(searchText.toLowerCase())))
      setFilteredBookings(filteredData);
    }
    else {
      setFilteredBookings(myBookings);
    }
  }
  return (
    <div className={styles.myBookingMainDiv}>
      <LowerNav />
      <div className={styles.myBookingHead}>
        <h1 className={styles.myBookingHeading}>My Bookings</h1>
        <div className={styles.inputDiv}>
          <input className={styles.searchInput} value={searchText} placeholder='Search by Hospital'
            onChange={handleSearchChange} />
          <Button variant="contained" startIcon={<SearchIcon />}
            sx={{ marginLeft: "10px", height: "40px" }} onClick={handleSearchBooking}>Search</Button>
        </div>
      </div>
      <div className={styles.contentDiv}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 9 }}>
            {filteredBookings?.length > 0 &&
              filteredBookings.map((hospital, index) => (
                <HospitalCard key={index} data={hospital} enableBooking={false} />
              ))
            }
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <div>
              <img className={styles.advertiseImage} src='/assets/img/hospital_advertise.png' alt='advertise' />
            </div>
          </Grid>
        </Grid>

      </div>
    </div>
  )
}

export default MyBooking