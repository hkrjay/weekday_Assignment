import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { Box, Container, Grid, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import debounce from "lodash/debounce";
import {
    fetchJobData,
    setExperienceFilter,
    setLocationFilter,
    setRemoteFilter,
    setRoleFilter,
    setSearchFilter,
} from "../redux/jobSlice";
import {
    RolesOptions,
    employeeOptions,
    experienceOptions,
    locationOptions,
} from "../dummyData";

export default function Filters() {
    const [role, setRole] = React.useState([]);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        const { value, name } = event.target;
        setRole(value);
        if (!value) {
            dispatch(fetchJobData());
            return;
        }
        if (name == "role") dispatch(setRoleFilter(value));
        else if (name == "location") dispatch(setLocationFilter(value));
        else if (name == "remote") dispatch(setRemoteFilter(value));
        else if (name == "experience") dispatch(setExperienceFilter(value));
    };

    const debouncedSearch = debounce((value) => {
        if (!value) {
            dispatch(fetchJobData());
            return;
        }
        dispatch(setSearchFilter(value));
    }, 500); // Adjust the debounce delay by (500 milliseconds)

    const handleSearchCompany = (event) => {
        const { value } = event.target;
        debouncedSearch(value);
    };

    return (
        <Container maxWidth="xl">
            <Grid container spacing={2} fullWidth sx={{justifyContent: 'center'}}>
                <Grid item xs={6} sm={4} md={2}>
                    <FormControl fullWidth>
                        <InputLabel id="simple-select-role">Roles</InputLabel>
                        <Select
                            labelId="simple-select-role"
                            id="select-roles"
                            value={role}
                            name="role"
                            label="Roles"
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {RolesOptions.map((role, index) => (
                                <MenuItem key={index} value={role}>
                                    {role}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                {/* <Grid item xs={6} sm={4} md={2}>
                    <FormControl fullWidth>
                        <InputLabel id="select-select-employees">
                            Number of Employees
                        </InputLabel>
                        <Select
                            labelId="select-select-employees"
                            id="select-employees"
                            name="employees"
                        >
                            {employeeOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid> */}
                <Grid item xs={6} sm={4} md={2}>
                    <FormControl fullWidth>
                        <InputLabel id="select-employees">Location</InputLabel>
                        <Select
                            labelId="select-employees"
                            id="select-employees"
                            name="location"
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {locationOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                    <FormControl fullWidth>
                        <InputLabel id="select-experience">Experience</InputLabel>
                        <Select
                            labelId="select-experience"
                            id="select-experience"
                            name="experience"
                            onChange={handleChange}
                        >
                            {experienceOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                    <FormControl fullWidth>
                        <InputLabel id="select-remote">Remote</InputLabel>
                        <Select
                            labelId="select-remote"
                            id="select-remote"
                            name="remote"
                            onChange={handleChange}
                        >
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                    <TextField
                        fullWidth
                        id="search-company"
                        label="Search Company Name"
                        onChange={handleSearchCompany}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
