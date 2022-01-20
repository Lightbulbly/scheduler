import React from "react";
import "../styles/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const { name, selected, spots, setDay } = props
  var dayClass = classNames("day-list",{
    'day-list__item': name,
    'day-list__item--selected': selected,
    'day-list__item--full': spots === 0,
 });

 const formatSpots = ()=>{
  if (spots === 0) {return `no spots remaining`}
  if (spots === 1) {return `1 spot remaining`}
  return `${spots} spots remaining`;
 };

  return (
    // <li onClick={() => setDay(name)} className={dayClass}>
    //   <h2>{name}</h2>
    //   <h3>{formatSpots()}</h3>
    // </li>

    <li className={dayClass} onClick={() => props.setDay(props.name)} selected={props.selected}>
  <h2 className="text--regular">{props.name}</h2> 
  <h3 className="text--light">{formatSpots(props.spots)}</h3>
</li>

  );
}