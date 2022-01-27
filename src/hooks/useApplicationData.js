import { useState, useEffect } from "react";
import axios from "axios";
import { getSpotsForDay } from "helpers/selectors";

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  // console.log("state.interviewers", state.interviewers);
  const setDay = (day) => {
    setState({ ...state, day });
  };

  // const appointmentsForDay = getAppointmentsForDay(state, state.day);
  // const renderAppointments = appointmentsForDay.map((appointment, index) => {
  //   return <Appointment key={index} {...appointment} />;
  // });

  // pass bookInterview to each Appointment component as props.
  const updateSpots = function (state, appointments) {
    // console.log(state, appointments);
    const dayObj = state.days.find((day) => {
      return day.name === state.day;
    });
    // console.log(dayObj);

    const spots = getSpotsForDay(dayObj, appointments);

    const day = { ...dayObj, spots };
    return state.days.map((d) => (d.name === state.day ? day : d));
  };

  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    // console.log("here", id, interview);
    // console.log("appointments", appointments);
    // console.log("appointment", appointment);

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then((res) => {
        // console.log("1 the state", state);
        // console.log("here?", appointments);
        setState((prev) => ({
          ...prev,
          appointments,
          days: updateSpots(state, appointments),
        }));

        // console.log("2 the state", state);
      })
      .catch((error) => {
        // console.log(error.message);
      });
  };

  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${id}`).then((res) => {
      setState((prev) => ({
        ...prev,
        appointments,
        days: updateSpots(state, appointments),
      }));
    });
    // .catch((err) => Promise.reject(err));
  };
  // const save = function (name, interviewer) {
  //   console.log("line 64 in application js");
  //   const interview = {
  //     student: name,
  //     interviewer,
  //   };
  //   console.log(interview.student, interviewer.name);
  // };

  // Our useApplicationData Hook will return an object with four keys.
  // The state object will maintain the same structure.
  // The setDay action can be used to set the current day.
  // The bookInterview action makes an HTTP request and updates the local state.
  // The cancelInterview action makes an HTTP request and updates the local state.
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
