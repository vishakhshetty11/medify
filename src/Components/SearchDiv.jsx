import React, { useEffect, useState } from 'react'
import styles from "./SearchDiv.module.css"
import { TextField, MenuItem, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MedifyButton from './Utility/MedifyButton';
function SearchDiv() {
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
            const resp = await fetch(`https://meddata-backend.onrender.com/cities/:${States}`)
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
        getCity(selectedState);
    }, [selectedState])
    return (
        <div id={styles.searchDiv}>
            <div id={styles.state}>
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
            <div id={styles.city}>
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
                <MedifyButton title="Search" />
            </div>
        </div>
    )
}

export default SearchDiv