import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  // const { days, day, setDay } = props
  const { days, value, onChange, spots } = props;

  // Within the <DayList> component, map over the days array to return <DayListItem> components as children. Remember to import the <DayListItem> component into <DayList>.

  // const renderDayList = days.map((oneDay, index)=> <DayListItem key={index} name={oneDay.name} spots={oneDay.spots} setDay={setDay} selected={oneDay.name === day} />)

  const renderDayList = days.map((oneDay, index) => (
    <DayListItem
      key={index}
      name={oneDay.name}
      spots={oneDay.spots}
      setDay={onChange}
      // selected={oneDay.name === value}
      selected={oneDay.name === value}
    />
  ));

  return <ul>{renderDayList}</ul>;
}
