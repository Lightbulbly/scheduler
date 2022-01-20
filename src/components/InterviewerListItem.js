import React from "react";
import "../styles/InterviewerListItem.scss"
import classNames from "classnames";

export default function InterviewerListItem (props) {
  const { name, avatar, selected, setInterviewer } = props;

  var interviewerListItemClass = classNames("interviewers__item",{
    'interviewers__item--selected': selected
 });

  return (
    <li className={interviewerListItemClass} onClick={setInterviewer} >
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      /> 
      {selected && name}
    </li>
    )

}