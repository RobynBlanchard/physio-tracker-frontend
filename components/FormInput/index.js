import { string, oneOf, func, any } from 'prop-types';
import { StyledInput, StyledLabel } from './style';
import { ErrorText } from '../../styles';

const FormInput = ({
  name,
  onChange,
  value,
  required,
  error,
  children,
  label,
  hasDarkBackground=false,
  type = 'text',
  placeholder = undefined,
  className = undefined,
  ...props
}) => {
  return (
    <>
      <StyledLabel hasDarkBackground={hasDarkBackground} htmlFor={name}>{label}</StyledLabel>
      <StyledInput
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={className}
        hasDarkBackground={hasDarkBackground}
        required
        style={error && { border: 'solid 1px red' }}
        {...props}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </>
  );
};

FormInput.propTypes = {
  name: string.isRequired,
  type: string,
  placeholder: string,
  type: oneOf(['text', 'number', 'password', 'email']),
  className: string,
  value: any,
  onChange: func.isRequired
};

export default FormInput;
