import React, { Fragment } from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
  const { id, time, interview } = props;
  // console.log(id, time, interview);
  console.log(interview);

  return (
    <article className="appointment">
      {/* time ? <article className="appointment"> Appointment at {props.time}</article> :<article className="appointment"> No Appointments
  </article> */}
      <Header time={time} />
      {interview ? (
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
        />
      ) : (
        <Empty />
      )}
    </article>
  );
}
