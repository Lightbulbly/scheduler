import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, day, setDay } = props

  // Within the <DayList> component, map over the days array to return <DayListItem> components as children. Remember to import the <DayListItem> component into <DayList>.

  const renderDayList = days.map((oneDay, index)=> <DayListItem key={index} name={oneDay.name} spots={oneDay.spots} setDay={setDay} selected={oneDay.name === day} />)
  
  return (
    <ul>
     {renderDayList}
    </ul>)

}

 