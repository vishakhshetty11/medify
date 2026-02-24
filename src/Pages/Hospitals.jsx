import React, { useEffect, useState } from 'react'
import styles from './Hospitals.module.css';
import LowerNav from '../Components/LowerNav';
import SearchDiv from '../Components/SearchDiv';
import { Grid } from '@mui/material';
import HospitalCard from '../Components/HospitalCard';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
function Hospitals() {
  const { state, city } = useParams();
  const [hospitalData, setHospitalData] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [showCircular, setShowCircular] = useState(false);
  useEffect(() => {
    if (state && city) {
      setSelectedState(state);
      setSelectedCity(city);
    }
    else {
      setHospitalData([]);
      setSelectedState("");
      setSelectedCity("");
    }
  }, [state, city]);
  const setStateCity = (receivedState, receivedCity) => {
    setSelectedState(receivedState);
    setSelectedCity(receivedCity);
  }
  const fetchData = async () => {
    try {
      setShowCircular(true);
      if (!selectedState && !selectedCity) return;
      const resp = await fetch(`https://meddata-backend.onrender.com/data?state=${selectedState}&city=${selectedCity}`);
      if (!resp.ok) {
        throw new Error("Network response was not ok");
      }
      const respData = await resp.json();
      setHospitalData(respData);
    }
    catch (error) {
      console.error("Error while fetching Hospital Data ", error);
    }
    finally {
      setShowCircular(false);
    }
  }
  useEffect(() => {
    if (selectedState !== "" && selectedCity !== "") {
      fetchData();
    }
  }, [selectedState, selectedCity])

  function SlotCalendar() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const dates = [0, 1, 2].map((d) => dayjs().add(d, "day"));

  return (
    <div style={{ padding: 20 }}>
      {/* Date selector */}
      <div style={{ display: "flex", gap: 20 }}>
        {dates.map((date, index) => (
          <div
            key={index}
            onClick={() => setSelectedDate(date)}
            style={{
              cursor: "pointer",
              borderBottom:
                selectedDate.isSame(date, "day") ? "3px solid blue" : ""
            }}
          >
            <h4>
              {index === 0
                ? "Today"
                : index === 1
                ? "Tomorrow"
                : date.format("ddd, D MMM")}
            </h4>
            <span style={{ color: "green" }}>17 Slots Available</span>
          </div>
        ))}
      </div>

      {/* Time slots */}
      {Object.keys(timeSlots).map((period) => (
        <div key={period} style={{ marginTop: 20 }}>
          <h4>{period}</h4>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {timeSlots[period].map((time, index) => (
              <Button key={index} variant="outlined">
                {time}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

  return (
    <div className={styles.hospitalsMainDiv}>
      <LowerNav />
      <div className={styles.searchDiv}>
        <SearchDiv sendStateCity={(state, city) => setStateCity(state, city)} State={selectedState} City={selectedCity} />
      </div>
      <div className={styles.hospitalContent}>
        {!showCircular ?
          (!selectedState || !selectedCity) ?
            <p className={styles.message}>Please Select State and city!!</p>
            :
            hospitalData.length > 0 ?
              <>
                <h1 className={styles.hospitalCount}>{hospitalData.length} medical centers available in {selectedCity}</h1>
                <p className={styles.hospitalSubtitle}><CheckCircleOutlineIcon /> Book appointments with minimum wait-time & verified doctor details</p>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 9 }}>
                    {
                      hospitalData.map((hospital, index) => (
                        <HospitalCard key={index} data={hospital} />
                      ))
                    }
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <div>
                      <img className={styles.advertiseImage} src='/assets/img/hospital_advertise.png' alt='advertise' />
                    </div>
                  </Grid>
                </Grid>
              </>
              :
              <p className={styles.message}>No Data Found!!</p>
          : <div style={{textAlign:"center"}}>
            <CircularProgress />
          </div>
        }
      </div>
    </div>
  )
}

export default Hospitals