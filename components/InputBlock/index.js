import styled from 'styled-components';

const Label = styled.label`
  display: block;
  margin: 4px 0;
  color: white;
`;

const Input = styled.input`
  display: block;
  height: 34px;
  width: 60px;
  border: 2px solid #2552bc;
  text-align: center;
  font-size: 14px;
`;

const InputBlock = ({ label, onChange }) => {
  return (
    <span>
      <Label>{label}</Label>
      <Input onChange={onChange} />
    </span>
  );
};

export default InputBlock;
