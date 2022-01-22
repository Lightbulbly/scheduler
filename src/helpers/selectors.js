export const getAppointmentsForDay = function (state, day) {
  //... returns an array of appointments for that day

  let filteredDays = state.days.filter((singleDay) => singleDay.name === day);

  // console.log("filteredDays",filteredDays[0].appointments);
  if (filteredDays.length === 0) {
    return [];
  }
  let resultAppointments = [];
  for (const key in state.appointments) {
    if (filteredDays[0].appointments.includes(Number(key))) {
      resultAppointments.push(state.appointments[key]);
    }
  }
  // console.log(resultAppointments);
  return resultAppointments;
};

export const getInterview = function (state, interview) {
  let appointmentsCopy = { ...state.appointments };

  // console.log("state.interviewers", state.interviewers);
  // {
  //   '1': {
  //     id: 1,
  //     name: 'Sylvia Palmer',
  //     avatar: 'https://i.imgur.com/LpaY82x.png'
  //   },
  //   '2': {
  //     id: 2,
  //     name: 'Tori Malcolm',
  //     avatar: 'https://i.imgur.com/Nmx0Qxo.png'
  //   }
  // }

  // console.log("here", interview);
  // here { student: 'Archie Cohen', interviewer: 2 }

  // console.log("here", appointmentsCopy);
  // {
  //   '1': { id: 1, time: '12pm', interview: null },
  //   '2': { id: 2, time: '1pm', interview: null },
  //   '3': {
  //     id: 3,
  //     time: '2pm',
  //     interview: { student: 'Archie Cohen', interviewer: 2 }
  //   },
  //   '4': { id: 4, time: '3pm', interview: null },
  //   '5': {
  //     id: 5,
  //     time: '4pm',
  //     interview: { student: 'Chad Takahashi', interviewer: 2 }
  //   }
  // }
  if (!interview) return null;
  // console.log(
  //   "interview.interviewer",
  //   interview.interviewer,
  //   typeof interview.interviewer
  // );
  let result = {};
  for (const key in appointmentsCopy) {
    //   // console.log("key", key);
    //   // console.log(key, state.interviewers[key]);
    //   // console.log("here", state.interviewers[key]);
    //   // console.log(key, appointmentsCopy[key].interview);

    if (
      state.appointments[key].interview &&
      state.appointments[key].interview.interviewer === interview.interviewer
    ) {
      // console.log(state.interviewers[interview.interviewer.toString()]);
      result["student"] = interview.student;
      result["interviewer"] = state.interviewers[interview.interviewer];
    }
  }
  return result;
};

// module.exports = { getAppointmentsForDay, getInterview };
