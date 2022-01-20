import React from "react";
import "../styles/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import classNames from "classnames";

export default function InterviewerList (props) {
  // const { interviewers, setInterviewer, interviewer } = props;
  const { interviewers, onChange, value } = props;


  // const renderInterviewerList = interviewers.map((oneInterviewer, index)=> <InterviewerListItem key={index} id={oneInterviewer.id} name={oneInterviewer.name} avatar={oneInterviewer.avatar} setInterviewer={()=>{setInterviewer(oneInterviewer.id)}} selected={oneInterviewer.id === interviewer} /> )

    const renderInterviewerList = props.map((interviewer)=> <InterviewerListItem key={interviewer.id} name={interviewer.name} avatar={interviewer.avatar} setInterviewer={()=>{onChange(interviewer.id)}} selected={interviewer.id === value} /> )


  return (
    <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{renderInterviewerList} </ul>
</section>
    )

}