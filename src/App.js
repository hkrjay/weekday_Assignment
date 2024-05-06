import { Box, CircularProgress, Container, Stack } from "@mui/material";
import "./App.css";
import JobCard from "./components/card";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { fetchJobData } from "./redux/jobSlice";
import Filters from "./components/filters";

function App() {
  const dispatch = useDispatch();
  const [currentOffset, setCurrentOffset] = useState(0);
  const { filteredJobData, loading } = useSelector((state) => state.jobData);

  // const [allData, setAllData] = useState([])

  // useEffect(() => {
  //   setAllData((prev) => [...prev, ...filteredJobData] )
  // }, [filteredJobData])

  const handleInfinteScoll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight
    ) {
      setCurrentOffset((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfinteScoll);
    return () => window.removeEventListener("scroll", handleInfinteScoll);
  }, []);

  useEffect(() => {
    dispatch(fetchJobData(currentOffset));
  }, [currentOffset]);

  // if (loading) {
  //   return (
  //     <Box sx={{ display: "flex" }}>
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  return (
    <div className="App">
      <Container maxWidth="xl">
        <Stack direction={"row"} spacing={2} sx={{ marginBottom: "20px" }}>
          <Filters />
        </Stack>
        <Stack
          direction={"row"}
          spacing={4}
          useFlexGap
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          // ref={ref}
        >
          {filteredJobData?.map((data) => (
            <JobCard data={data} key={data?.jdUid} />
          ))}
        </Stack>
      </Container>
    </div>
  );
}

export default App;
