import React, { useEffect, useState } from 'react'
import styles from "./SearchDiv.module.css"
import { TextField, MenuItem, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate } from 'react-router-dom';
function SearchDiv({ sendStateCity, State = "", City = "" }) {
    const location = useLocation();
    const navigation = useNavigate();
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [state, setState] = useState([]);
    const [city, setCity] = useState([]);
    const getState = async () => {
        try {
            const resp = await fetch('https://meddata-backend.onrender.com/states')
            if (!resp.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await resp.json();
            setState(data);
        }
        catch (error) {
            console.error("Error fetching State:", error)
        }
    }
    const getCity = async (States) => {
        try {
            const resp = await fetch(`https://meddata-backend.onrender.com/cities/${States}`)
            if (!resp.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await resp.json();
            setCity(data);
        }
        catch (error) {
            console.error("Error fetching City:", error)
        }
    }
    useEffect(() => {
        getState();
    }, []);

    useEffect(() => {
        if (selectedState.trim() != "") {
            setSelectedCity("");
            getCity(selectedState);
            if (City) setSelectedCity(City);
        }
    }, [selectedState])
    useEffect(() => {
        if (State) setSelectedState(State);
    }, [State, City]);
    const handleClick = () => {
        if (selectedState.trim() !== "" && selectedCity.trim() !== "") {
            if (location.pathname !== "/hospitals") {
                navigation(`/hospitals/${selectedState}/${selectedCity}`);
            }
            else {
                sendStateCity(selectedState, selectedCity)
            }
        }
        else {
            alert("Select Both State and City");
        }
    }
    return (
        <div id={styles.searchDiv}>
            <div id='state' className={styles.state}>
                <TextField select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}
                    fullWidth size="medium" variant="outlined"
                    SelectProps={{
                        displayEmpty: true,
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: "#9aa3af" }} />
                                </InputAdornment>
                            ),
                        },
                    }}
                    sx={{
                        backgroundColor: "#fafbfe",
                        borderRadius: "12px",
                        padding: "0px",
                        "& .MuiSelect-select": {
                            padding: "10px !important",
                        },
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            "& fieldset": {
                                border: "none",
                            },
                        },
                    }}
                >
                    <MenuItem value="" disabled>
                        <em style={{ color: "#9aa3af" }}>State</em>
                    </MenuItem>
                    {state.map((states) => (
                        <MenuItem key={states} value={states}>{states}</MenuItem>
                    ))}
                </TextField>
            </div>
            <div id='city' className={styles.city}>
                <TextField select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}
                    fullWidth size="medium" variant="outlined" disabled={selectedState === "" ? true : false}
                    SelectProps={{
                        displayEmpty: true,
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: "#9aa3af" }} />
                                </InputAdornment>
                            ),
                        },
                    }}
                    sx={{
                        backgroundColor: "#fafbfe",
                        borderRadius: "12px",
                        padding: "0px",
                        "& .MuiSelect-select": {
                            padding: "10px !important",
                        },
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            "& fieldset": {
                                border: "none",
                            },
                        },
                    }}
                >
                    <MenuItem value="" disabled>
                        <em style={{ color: "#9aa3af" }}>City</em>
                    </MenuItem>

                    {city.map((cities) => (
                        <MenuItem value={cities}>{cities}</MenuItem>
                    ))}
                </TextField>
            </div>
            <div id={styles.searchButton}>
                <button type="Submit" id='searchBtn' className={styles.submitButton} onClick={handleClick} >Search</button>
            </div>
        </div>
    )
}

export default SearchDiv