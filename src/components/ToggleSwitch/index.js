import { useState } from 'react';
import { func } from 'prop-types';
import { Switch, Slider } from './style';

const ToggleSwitch = ({ onClick }) => {
  const [enabled, toggleEnabled] = useState(false);

  return (
    <Switch onClick={onClick}>
      <Slider
        onClick={() => toggleEnabled((prevEnabled) => !prevEnabled)}
        enabled={enabled}
      />
    </Switch>
  );
};

ToggleSwitch.defaultProps = {
  onClick: () => {},
};

ToggleSwitch.propTypes = {
  onClick: func,
};

export default ToggleSwitch;
