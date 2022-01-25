import React, { useState } from "react";
import Button from "../Button";
import InterviewerList from "../InterviewerList";

export default function Form(props) {
  const { onSave } = props;
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  function reset() {
    setStudent("");
    setInterviewer(null);
  }
  function cancel() {
    reset();
    props.onCancel();
  }
  // function save(){
  //   console.log(student, interviewer.id);
  //   // return [student, interviewer]
  // }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setStudent(event.target.value)}
            value={student}
          />
        </form>
        <InterviewerList
          value={interviewer}
          onChange={setInterviewer}
          interviewers={props.interviewers}
        />
        {/* interviewers, onChange, value */}
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button
            confirm
            onClick={() => {
              onSave(student, interviewer);
            }}
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
// .add("Edit", ()=><Form student="" interviewer="2" interviewers={interviewers} onSave={action("onSave")} onCancel={action("onCancel")}/>)
// .add("Create", ()=><Form interviewers={interviewers} onSave={action("onSave")} onCancel={action("onCancel")}/>);
