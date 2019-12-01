export const getSessions = (userId, sessionID) => {
  if (!userId) {
    throw new Error('Error cannot get sessions, must provide user id');
  }

  const data = [
    {
      id: 0,
      date: new Date('2019-11-01'),
      exercises: [
        {
          name: 'Leg press',
          sets: {
            leftLeg: [{ weight: '20kg', reps: 8 }],
            rightLeg: [{ weight: '20kg', reps: 8 }],
            bothLegs: []
          }
        },
        {
          name: 'Deadlift',
          sets: {
            leftLeg: [{ weight: '20kg', reps: 8 }],
            rightLeg: [{ weight: '20kg', reps: 8 }],
            bothLegs: []
          }
        },
        {
          name: 'Squat',
          sets: {
            leftLeg: [{ weight: '20kg', reps: 8 }],
            rightLeg: [{ weight: '20kg', reps: 8 }],
            bothLegs: []
          }
        }
      ]
    },
    {
      id: 1,
      date: new Date('2019-11-12'),
      exercises: [
        {
          name: 'Ham string curls',
          sets: {
            leftLeg: [],
            rightLeg: [],
            bothLegs: [{ weight: '15kg', reps: 12 }]
          }
        }
      ]
    }
  ];

  if (sessionID) {
    return Promise.resolve(data[sessionID]);
  }

  return Promise.resolve(data);
};
