import { string } from 'prop-types';
import { ButtonStyle } from './style';

const Button = ({ text }) => {
  return <ButtonStyle>{text}</ButtonStyle>;
};

Button.propTypes = {
  text: string
};

export default Button;
