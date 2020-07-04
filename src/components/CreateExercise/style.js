import styled from 'styled-components';
import baseButton from '../../styles/baseButton';

export const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border: 2px solid ${({ theme }) => theme.colors.border};
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
  background: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.border};
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
    background: ${({ theme }) => theme.colors.border};
  }
  &::after {
    transform: rotateZ(-45deg);
  }
`;

// TODO secondary button
export const ButtonOption = styled(baseButton)`
  padding: ${({ theme }) => theme.spacing.XS};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 12px;
  background: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.grey : 'none'};
  margin: ${({ theme }) => theme.spacing.XS};
  width: calc(50% - 16px);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  outline: ${({ theme }) => theme.colors.grey};
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  &:active {
    background: ${({ theme }) => theme.colors.grey};
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    transform: translate(2px, 2px);
  }
`;

export const MainHeading = styled.h2`
  margin: ${({ theme }) => theme.spacing.XL} 0;
  color: ${({ theme }) => theme.colors.text};
`;

export const ButtonAlign = styled.div`
  margin: ${({ theme }) => theme.spacing.L} 0;
  padding: ${({ theme }) => theme.spacingXS};
`;
