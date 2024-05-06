import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchJobData = createAsyncThunk(
  "fetchJobData",
  async (currentOffset) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
      limit: 10,
      offset: currentOffset,
    });
    const controller = new AbortController();
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
      signal: controller.signal,
    };

    return fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    )
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        return result.jdList;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }
);

const initialState = {
  allJobData: [],
  filteredJobData: [], // New state to hold filtered data
  loading: false,
  error: null,
};

export const jobDataSlice = createSlice({
  name: "jobData",
  initialState,
  reducers: {
    setRoleFilter: (state, action) => {
      state.filteredJobData = state.allJobData.filter(
        (data) => data.jobRole === action.payload
      );
    },
    setLocationFilter: (state, action) => {
      state.filteredJobData = state.allJobData.filter(
        (data) => data.location == action.payload
      );
    },
    setRemoteFilter: (state, action) => {
      state.filteredJobData = state.allJobData.filter((data) => {
        if (action.payload == "Yes") {
          return data.location.toLowerCase() == "remote";
        } else return data.location.toLowerCase() !== "remote";
      });
    },
    setExperienceFilter: (state, action) => {
      state.filteredJobData = state.allJobData.filter(
        (date) => date.minExp == action.payload
      );
    },
    setSearchFilter: (state, action) => {
      state.filteredJobData = state.allJobData.filter((data) =>
        data.companyName.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchJobData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchJobData.fulfilled, (state, action) => {
      state.loading = false;
      state.allJobData = [...state.allJobData, ...action.payload];
      state.filteredJobData = state.allJobData;
    });
    builder.addCase(fetchJobData.rejected, (state) => {
      state.loading = true;
      state.error = "SomeThing Went Wrong...";
    });
  },
});

export const {
  setRoleFilter,
  setSearchFilter,
  setLocationFilter,
  setRemoteFilter,
  setExperienceFilter
} = jobDataSlice.actions;

export default jobDataSlice.reducer;
