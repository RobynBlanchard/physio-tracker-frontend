import { string, oneOf, func, number, bool, oneOfType } from 'prop-types';
import { StyledInput, StyledLabel } from './style';
import ErrorText from '../ErrorText';

const FormInput = ({
  name,
  onChange,
  value,
  required,
  error,
  label,
  hasDarkBackground,
  type,
  placeholder,
  className,
  ...props
}) => (
  <>
    <StyledLabel hasDarkBackground={hasDarkBackground} htmlFor={name}>
      {label}
    </StyledLabel>
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
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
    {error && <ErrorText>{error}</ErrorText>}
  </>
);

FormInput.defaultProps = {
  type: 'text',
  placeholder: undefined,
  className: undefined,
  required: false,
  error: undefined,
  hasDarkBackground: false,
};

FormInput.propTypes = {
  name: string.isRequired,
  placeholder: string,
  type: oneOf(['text', 'number', 'password', 'email']),
  className: string,
  value: oneOfType([string, number]).isRequired,
  required: bool,
  error: string,
  label: string.isRequired,
  hasDarkBackground: bool,
  onChange: func.isRequired,
};

export default FormInput;
