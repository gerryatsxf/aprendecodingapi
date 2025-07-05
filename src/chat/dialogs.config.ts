const dialogsConfig = {
  st_greet: { 
    message: 'Hello! How can I help you today?', 
    replyOptions:[
        {value: 'I want to schedule an appointment', nextStage: 'st1'},
        {value: 'I have a question', nextStage: 'end'},
    ],
    replyIdentifiers: ['appointment', 'question'],
    callback: null
},
st1: { 
    message: 'Thats great! Lets get to it',
    callback: (session) => {
      session.leadStage = 'tz_sub_s1';
      return session;
    }
},
  tz_sub_s1: { message: 'Please provide your timezone.' },
  tz_sub_retry_s1: { message: 'Please provide a valid timezone.' },
  tz_sub_s2: { message: 'Timezone set to {timezone}.' },
  st2: { message: 'Thanks! Lets now talk about your appointment date' },
  date_sub_s1: { message: 'Please provide your preferred appointment date.' },
  date_sub_retry_s1: { message: 'Please provide a valid date.' },
  date_sub_s2: { message: 'Appointment date set to {date}.' },
  st3: { message: 'Thanks! Lets now talk about your appointment time' },
  time_sub_s1: { message: 'Please provide your preferred appointment time.' },
  time_sub_retry_s1: { message: 'Please provide a valid time.' },
  time_sub_s2: { message: 'Appointment time set to {time}.' },
};

export default dialogsConfig;