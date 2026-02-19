import React, { useState } from 'react'
import styles from './Hospitals.module.css';
import LowerNav from '../Components/LowerNav';
import SearchDiv from '../Components/SearchDiv';
import { Grid } from '@mui/material';
import HospitalCard from '../Components/HospitalCard';
function Hospitals() {
  const [hospitalData, setHospitalData] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const fetchData = async (state, city) => {
    try {
      setSelectedState(state);
      setSelectedCity(city);
      const resp = await fetch(`https://meddata-backend.onrender.com/data?state=${state}&city=${city}`);
      if (!resp.ok) {
        throw new Error("Network response was not ok");
      }
      const respData = await resp.json();
      setHospitalData(respData);
    }
    catch (error) {
      console.error("Error while fetching Hospital Data ", error);
    }
  }
  return (
    <div className={styles.hospitalsMainDiv}>
      <LowerNav />
      <div className={styles.searchDiv}>
        <SearchDiv fetchHospital={(state, city) => fetchData(state, city)} />
      </div>
      {hospitalData.length > 0 &&
        <div className={styles.hospitalContent}>

          <h1 className={styles.hospitalCount}>{hospitalData.length} medical centers available in {selectedCity}</h1>
          <p className={styles.hospitalSubtitle}>Book appointments with minimum wait-time & verified doctor details</p>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 9 }}>
              {
                hospitalData.map((hospital) => (
                  <HospitalCard data={hospital} />
                ))
              }
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              hello
            </Grid>
          </Grid>
        </div>}
    </div>
  )
}

export default Hospitals