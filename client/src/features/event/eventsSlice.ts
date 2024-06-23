import { Event } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { eventsApi } from "../../app/serivices/events";
import { RootState } from "../../app/store";

interface InitialState {
  events: Event[] | null;
}

const initialState: InitialState = {
  events: null,
};

const slice = createSlice({
  name: "events",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(eventsApi.endpoints.getAllEvents.matchFulfilled, (state, action) => {
        state.events = action.payload;
      })
  },
});

export default slice.reducer;

export const selectEvents = (state: RootState) =>
  state.events.events;
