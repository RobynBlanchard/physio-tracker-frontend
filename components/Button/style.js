import styled from 'styled-components';

export const ButtonStyle = styled.button`
  width: 80%;
  border: none;
  font-family: inherit;
  font-size: 14px;
  padding: ${({ theme }) => `${theme.font.size.M}`};
  color: inherit;
  background: none;
  cursor: pointer;
  padding: 20px 40px;
  display: inline-block;
  margin: 15px 30px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: ${({ theme }) => `${theme.font.weight.L}`};
  outline: none;
  position: relative;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
  border-radius: 50px;
  border: 3px solid #fff;
  color: ${({ theme }) => `${theme.colors.white}`};
  overflow: hidden;
  background: ${({ theme }) => `${theme.colors.primary}`};

  &:hover {
    background: ${({ theme }) => `${theme.colors.primaryDark}`};
  }
`;
