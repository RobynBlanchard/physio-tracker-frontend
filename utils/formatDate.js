const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const ordinal = day => {
  if (day > 20 || day < 10) {
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
    }
  }
  return 'th';
};

export const formatDate = inputDate => {
  const date = new Date(inputDate);
  const day = date.getDay();
  const dayDate = date.getUTCDate();
  const month = date.getMonth();

  return `${days[day]} ${dayDate}${ordinal(dayDate)} ${months[month]}`;
};
