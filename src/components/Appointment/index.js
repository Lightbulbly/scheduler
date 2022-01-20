import React from "react";
import "./styles.scss";

export default function Appointment (props) {

  return (
  props.time ? <article className="appointment"> Appointment at {props.time}</article> :<article className="appointment"> No Appointments</article>
)
}
