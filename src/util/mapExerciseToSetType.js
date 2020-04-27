import SetTimeDistance from '../components/SetTimeDistance';
import SetRepWeights from '../components/SetRepWeights';

const mapping = {
  TREADMILL: SetTimeDistance,
  SPINNING_BIKE: SetTimeDistance,
  LEG_PRESS_RIGHT_LEG: SetRepWeights,
  LEG_PRESS_LEFT_LEG: SetRepWeights,
  LEG_PRESS_BOTH_LEGS: SetRepWeights,
  HAMSTRING_CURL_RIGHT_LEG: SetRepWeights,
  HAMSTRING_CURL_LEFT_LEG: SetRepWeights,
  HAMSTRING_CURL_BOTH_LEGS: SetRepWeights,
  SQUAT: SetRepWeights,
  DEADLIFT: SetRepWeights,
};

export default mapping;
