import styled from 'styled-components';
import { string, func } from 'prop-types';

const Label = styled.label`
  display: block;
  margin: 4px 0;
  color: ${({ theme }) => theme.colors.white};
`;

const Input = styled.input`
  display: block;
  height: 34px;
  width: 60px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.darkestGrey};
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
`;

const InputBlock = ({ label, onChange }) => (
  <span>
    <Label>{label}</Label>
    <Input onChange={onChange} />
  </span>
);

InputBlock.propTypes = {
  label: string.isRequired,
  onChange: func.isRequired,
};

export default InputBlock;
