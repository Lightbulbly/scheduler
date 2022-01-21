import React, { useState,useEffect } from "react";
import DayList from './DayList'
import "../styles/Application.scss";
import Appointment from "./Appointment/index.js";
import axios from "axios";


// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//   }
// ];

export default function Application(props) {
  // const [days, setDays] = useState([]);
  // const [day, setDay] = useState("Monday");
  const [state, setState] = useState(
{
  day: "Monday",
  days: [],
  appointments:[]
}

  )
  
  const dailyAppointments = [];

  const setDays = (days) => {
    // setState({ ...state, days });
    setState(prev => ({ ...prev, days }));

  }
  useEffect(() => {
    const testURL = `http://localhost:8001/api/days`;
    
    axios.get(testURL).then(response => setDays(response.data));
  }, 
  []
  // [setDays, state]
  );    
  
  const setDay = day => setState({ ...state, day });

  const renderAppointments = dailyAppointments.map((appointment,index)=>{
  // return <Appointment key={index} time={appointment.time} />
return <Appointment key={appointment.id} {...appointment} />

});
console.log(renderAppointments);
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
  {/* https://web.compass.lighthouselabs.ca/days/w07d3/activities/1208 */}
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
      {/* map over the appointments array to create a list in the schedule section. */}
      {renderAppointments}
      </section>
    </main>
  );
}
