import React from "react";
import "../styles/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const { name, spots, setDay, selected } = props;
  var dayClass = classNames("day-list", {
    "day-list__item": name,
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0,
  });

  const formatSpots = () => {
    if (spots === 0) {
      return `no spots remaining`;
    }
    if (spots === 1) {
      return `1 spot remaining`;
    }
    return `${spots} spots remaining`;
  };

  return (
    <li
      className={dayClass}
      onClick={() => setDay(name)}
      selected={selected}
      data-testid={name}
    >
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}
