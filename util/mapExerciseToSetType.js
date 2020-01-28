// import { SetFreeWeights, SetTimeDistance, SetWeightMachine } from '../components';
import SetFreeWeights  from '../components/SetFreeWeights';
import SetTimeDistance  from '../components/SetTimeDistance';
import SetWeightMachine  from '../components/SetWeightMachine';

const mapping = {
  TREADMILL: SetTimeDistance,
  BIKE: SetTimeDistance,
  SQUAT: SetFreeWeights,
  DEADLIFT: SetFreeWeights,
  LEG_PRESS: SetWeightMachine,
  HAMSTRING_CURLS: SetWeightMachine,
  LEG_EXTENSION: SetWeightMachine,
}

export default mapping;