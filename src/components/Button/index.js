import styled from 'styled-components';

export const Button = styled.button`
  width: 80%;
  height: 100%;
  margin: 15px 30px;
  display: inline-block;
  padding: 20px 40px;
  outline: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: ${({ theme }) => theme.font.weight.L};
  font-family: inherit;
  font-size: 14px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
  border-radius: 50px;
  border: 3px solid #fff;
  color: ${({ theme }) => theme.colors.white};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.primary};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  &:active {
    box-shadow: 2px 2px ${({ theme }) => theme.colors.white};
    transform: translate(2px, 2px);
  }
`;

export default Button;