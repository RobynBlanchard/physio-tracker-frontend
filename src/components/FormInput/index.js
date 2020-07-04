import { string, oneOf, func, number, bool, oneOfType } from 'prop-types';
import StyledInput from './style';
import ErrorText from '../ErrorText';
import Label from '../Label';

const FormInput = ({
  name,
  onChange,
  value,
  required,
  error,
  label,
  type,
  placeholder,
  className,
  ...props
}) => (
  <>
    <Label htmlFor={name}>{label}</Label>
    <StyledInput
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className={className}
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
  onChange: func.isRequired,
};

export default FormInput;
