export const getSessions = userId => {
  if (!userId) {
    throw new Error('Error cannot get sessions, must provide user id');
  }

  const data = [
    // {
    //   date: new Date('2019-11-01'),
    //   exercises: [
    //     { name: 'Leg press', sets: [{ leg: 'right', weight: '20kg', reps: 8 }] }
    //   ]
    // },
    {
      date: new Date('2019-11-01'),
      exercises: [
        {
          name: 'Leg press',
          sets: {
            leftLeg: [{ weight: '20kg', reps: 8 }],
            rightLeg: [{ weight: '20kg', reps: 8 }],
            bothLegs: []
          }
        }
      ]
    },
    {
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

  return Promise.resolve(data);
};
