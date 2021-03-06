import styled from 'styled-components';

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.L};
  width: 100%;
  display: inline-block;
  outline: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: ${({ theme }) => theme.font.weight.L};
  font-family: inherit;
  font-size: ${({ theme }) => theme.font.size.M};
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
  border-radius: 12px;
  border: 3px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
    color: ${({ theme }) => theme.colors.white};
  }

  &:active {
    box-shadow: 2px 2px ${({ theme }) => theme.colors.white};
    transform: translate(2px, 2px);
  }
`;

export default Button;
