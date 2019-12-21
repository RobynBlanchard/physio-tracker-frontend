import { useState } from 'react';
import { Switch, Slider } from './style';

const ToggleSwitch = ({ onClick }) => {
  const [enabled, toggleEnabled] = useState(false);

  return (
    <Switch onClick={onClick}>
      <Slider
        onClick={() => toggleEnabled(prevEnabled => !prevEnabled)}
        enabled={enabled}
      ></Slider>
    </Switch>
  );
};

export default ToggleSwitch;
