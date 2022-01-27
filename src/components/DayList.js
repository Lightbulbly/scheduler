import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  // const { days, day, setDay } = props
  const { days, value, onChange } = props;

  // Map over the days array to return <DayListItem> components as children.

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
