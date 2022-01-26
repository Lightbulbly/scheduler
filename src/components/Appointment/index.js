import React, { Fragment } from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE = "ERROR_SAVE";

export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } =
    props;
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  console.log("appointment!", id, mode);
  const save = function (name, interviewer) {
    // console.log("line 16 in application js");
    const interview = {
      student: name,
      interviewer,
    };
    // console.log(interview.student, interviewer.name);
    transition(SAVING);
    bookInterview(id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((err) => {
        // console.log("here it is", err);
        transition(ERROR_SAVE, true);
      });
  };

  const handleClickConfirmBtn = () => {
    transition(CONFIRM);
  };

  const deleteAppointment = function () {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((err) => {
        console.log(err);
        transition(ERROR_DELETE, true);
      });
  };

  const handleClickEditBtn = () => {
    transition(EDIT);
  };

  // console.log(id, time, interview);
  // console.log(interview);

  return (
    <article className="appointment">
      {/* time ? <article className="appointment"> Appointment at {props.time}</article> :<article className="appointment"> No Appointments
  </article> */}

      <Header time={time} />

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
          message="Are you sure you would like to delete?"
          onConfirm={deleteAppointment}
          onCancel={() => {
            transition(SHOW);
          }}
        />
      )}
      {mode === DELETING && <Status message="Deleting..." />}
      {mode === ERROR_SAVE && (
        <Error
          message="Could not save appointment."
          onClose={() => {
            back();
            back();
            back();
          }}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Could not delete appointment."
          onClose={() => {
            back();
            back();
            back();
          }}
        />
      )}
    </article>
  );
}
