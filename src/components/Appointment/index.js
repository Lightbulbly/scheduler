import React, { Fragment } from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

import useVisualMode from "../../hooks/useVisualMode";
export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } =
    props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const save = function (name, interviewer) {
    // console.log("line 16 in application js");
    const interview = {
      student: name,
      interviewer,
    };
    // console.log(interview.student, interviewer.name);
    transition(SAVING);
    bookInterview(id, interview).then((res) => {
      transition(SHOW);
    });
  };

  const handleClickConfirmBtn = () => {
    transition(CONFIRM);
  };
  const deleteAppointment = function () {
    transition(DELETING);
    cancelInterview(id).then((res) => {
      transition(EMPTY);
    });
  };

  const handleClickEditBtn = () => {
    transition(EDIT);
  };

  // console.log(id, time, interview);
  // console.log(interview);

  const { mode, transition, back } = useVisualMode(() => {
    if (interview) {
      return SHOW;
    }
    return EMPTY;
  });
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
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={handleClickConfirmBtn}
          onEdit={handleClickEditBtn}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          // interviewers={[]}
          onCancel={() => {
            back();
            back();
          }}
          onSave={save}
          // onSave={() => {
          //   transition(SHOW, true);
          // }}
        />
      )}
      {mode === EDIT && (
        <Form
          student={interview.student}
          interviewer={interview.interviewer.id}
          interviewers={interviewers}
          onCancel={() => {
            transition(SHOW);
          }}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={deleteAppointment}
          onCancel={() => {
            transition(SHOW);
          }}
        />
      )}
      {mode === DELETING && <Status message="Deleting..." />}
    </article>
  );
}
