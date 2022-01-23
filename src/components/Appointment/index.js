import React, { Fragment } from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";

import useVisualMode from "../../hooks/useVisualMode";
export default function Appointment(props) {
  const { id, time, interview } = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  // console.log(id, time, interview);
  // console.log(interview);

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);
  console.log("check", interview);
  return (
    <article className="appointment">
      {/* time ? <article className="appointment"> Appointment at {props.time}</article> :<article className="appointment"> No Appointments
  </article> */}

      {/* <Header time={time} />
      {interview ? (
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
        />
      ) : (
        <Empty />
      )} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE, false)} />}
      {mode === SHOW && interview && (
        <Show student={interview.student} interviewer={interview.interviewer} />
      )}
      {mode === CREATE && (
        <Form
          interviewers={[]}
          onCancel={() => {
            back();
            back();
          }}
          onSave={() => {}}
        />
      )}
    </article>
  );
}
