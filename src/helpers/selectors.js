export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day

let filteredDays = state.days.filter(singleDay=>singleDay.name===day);

// console.log("filteredDays",filteredDays[0].appointments);
if (filteredDays.length===0){ return []};
let resultAppointments=[];
for (const key in state.appointments){
  if(filteredDays[0].appointments.includes(Number(key)))
  {  
    resultAppointments.push(state.appointments[key])
  }
}
// console.log(resultAppointments);
return resultAppointments;
}