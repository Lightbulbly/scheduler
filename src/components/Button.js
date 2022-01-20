import "../styles/Button.scss";
import classNames from "classnames";

import React from "react";
export default function Button(props) {
   var buttonClass = classNames("button",{
      'button--confirm': props.confirm,
      'button--danger': props.danger
   });


 
   return (
     <button
       className={buttonClass}
       onClick={props.onClick}
       disabled={props.disabled}
     >
       {props.children}
     </button>
   );
 }