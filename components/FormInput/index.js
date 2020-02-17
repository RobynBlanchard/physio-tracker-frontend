import { string, oneOf, func, any } from 'prop-types';
import { StyledInput, StyledLabel } from './style';

const FormInput = ({
  name,
  onChange,
  value,
  required,
  error,
  children,
  label,
  type = 'text',
  placeholder = undefined,
  className = undefined,
  ...props
}) => {
  return (
    <>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
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
        {...props}
      />
      {error && <p>{error}</p>}
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
