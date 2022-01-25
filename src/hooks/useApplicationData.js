import { useState, useEffect } from "react";
import axios from "axios";

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
  const bookInterview = function (id, interview) {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
      console.log("the state", state);
      setState((prev) => ({
        ...prev,
        appointments,
      }));
    });
    // .catch((error) => {
    //   console.log(error.message);
    // });
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
