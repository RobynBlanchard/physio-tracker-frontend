import styled from 'styled-components';
import { useState } from 'react';

const Switch = styled.div`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;
const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;

    transform: ${({ enabled }) => enabled && 'translateX(26px)'};
  }

  background-color: ${({ enabled }) => enabled && '#2196F3'};
`;

const ToggleSwitch = ({onClick}) => {
  const [enabled, toggleEnabled] = useState(false);

  return (
    <Switch onClick={onClick}>
      <Slider onClick={() => toggleEnabled(!enabled)} enabled={enabled}></Slider>
    </Switch>
  );
};

export default ToggleSwitch;
