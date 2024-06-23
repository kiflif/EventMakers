import { Event, Feedback } from "@prisma/client";
import { api } from "./api";

export const eventsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllEvents: builder.query<Event[], void>({
      query: () => ({
        url: "/events",
        method: "GET",
      }),
    }),
    getEvent: builder.query<Event, string>({
      query: (id) => ({
        url: `/events/${id}`,
        method: "GET",
      }),
    }),
    editEvent: builder.mutation<string, Event>({
      query: (event) => ({
        url: `/events/edit/${event.id}`,
        method: "PUT",
        body: event,
      }),
    }),
    removeEvent: builder.mutation<string, string>({
      query: (id) => ({
        url: `/events/remove/${id}`,
        method: "POST",
        body: { id },
      }),
    }),
    addEvent: builder.mutation<Event, Event>({
      query: (event) => ({
        url: "/events/add",
        method: "POST",
        body: event,
      }),
    }),
    addFeedback: builder.mutation<Feedback, Feedback>({
      query: (Feedback) => ({
        url: "/feedback",
        method: "POST",
        body: Feedback,
      }),
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useGetEventQuery,
  useEditEventMutation,
  useRemoveEventMutation,
  useAddEventMutation,
  useAddFeedbackMutation,
} = eventsApi;

export const {
  endpoints: {
    getAllEvents,
    getEvent,
    editEvent,
    removeEvent,
    addEvent,
    addFeedback

  },
} = eventsApi;
