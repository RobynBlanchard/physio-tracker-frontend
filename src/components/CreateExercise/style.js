import styled from 'styled-components';
import baseButton from '../../styles/baseButton';

export const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.white};
  min-width: 270px;
  color: ${({ theme }) => theme.colors.primaryDark};
  border: 2px solid ${({ theme }) => theme.colors.primaryDark};
  border-radius: 12px;
  padding: ${({ theme }) => theme.spacing.XL};
  margin: ${({ theme }) => theme.spacing.XL};
  position: relative;
`;

export const CloseButton = styled(baseButton)`
  position: absolute;
  right: ${({ theme }) => `-${theme.spacing.XL}`};
  top: ${({ theme }) => `-${theme.spacing.XL}`};
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  cursor: pointer;

  /* adds cross */
  &::after,
  &::before {
    content: '';
    background: white;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    height: 3px; /* width of cross */
    width: 24px;
    transform: rotateZ(45deg);
  }
  &::after {
    transform: rotateZ(-45deg);
  }
`;

// TODO secondary button
export const ButtonOption = styled(baseButton)`
  padding: 8px;
  color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  background: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.teritary : theme.colors.primary};
  margin: 8px;
  width: calc(50% - 16px);

  &:active {
    background: ${({ theme }) => theme.colors.teritary};
    transform: translate(2px, 2px);
  }

  &:hover {
    background: ${({ theme }) => theme.colors.teritary};
  }
`;

export const MainHeading = styled.h2`
  margin: ${({ theme }) => theme.spacing.XL} 0;
  color: ${({ theme }) => theme.colors.primaryDark};
`;

export const SubHeading = styled.h3`
  margin: ${({ theme }) => theme.spacing.M} 0;
  color: ${({ theme }) => theme.colors.primaryDark};
`;

export const ButtonAlign = styled.div`
  margin: 16px 0;
  padding: 8px;
`;
