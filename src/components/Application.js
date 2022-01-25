import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import "../styles/Application.scss";
import Appointment from "./Appointment/index.js";
import axios from "axios";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "../helpers/selectors";

export default function Application(props) {
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

  const appointments = getAppointmentsForDay(state, state.day);

  const interviewers = getInterviewersForDay(state, state.day);

  const schedule = appointments.map((appointment, index) => {
    // console.log("appointment", appointment);
    // console.log("appointment.interview", appointment.interview);

    const interview = getInterview(state, appointment.interview);
    console.log("here", typeof interview, interview);

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

    return (
      <Appointment
        key={index}
        {...appointment}
        // interview={interview || {}}
        interview={interview}
        interviewers={interviewers}
        // {...interview}
        bookInterview={bookInterview}
        // save={save}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          {/* <DayList days={days} day={day} setDay={setDay} /> */}
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* map over the appointments array to create a list in the schedule section. */}
        {/* {renderAppointments} */}
        {schedule}
      </section>
    </main>
  );
}
