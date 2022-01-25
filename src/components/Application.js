import React from "react";
import DayList from "./DayList";
import "../styles/Application.scss";
import Appointment from "./Appointment/index.js";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "../helpers/selectors";
import useApplicationData from "../hooks/useApplicationData";

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);

  const appointments = getAppointmentsForDay(state, state.day).map(
    (appointment, index) => {
      // console.log("appointment", appointment);
      // console.log("appointment.interview", appointment.interview);

      const interview = getInterview(state, appointment.interview);
      // console.log("here", typeof interview, interview);

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
    }
  );

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
        {appointments}
      </section>
    </main>
  );
}
