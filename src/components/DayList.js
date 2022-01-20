import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  // const { days, day, setDay } = props
  // const { days, value, onChange } = props


  // Within the <DayList> component, map over the days array to return <DayListItem> components as children. Remember to import the <DayListItem> component into <DayList>.

  // const renderDayList = days.map((oneDay, index)=> <DayListItem key={index} name={oneDay.name} spots={oneDay.spots} setDay={setDay} selected={oneDay.name === day} />)
  
  const renderDayList = props.days.map((oneDay,index)=> <DayListItem key={index} name={props.name} spots={props.spots} setDay={props.onChange} selected={props.name === props.value} />)

  
  return (
    <ul>
     {renderDayList}
    </ul>)

}

 