import styled from 'styled-components';
import { media } from '../../styles/breakpoints';

export const ButtonWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: ${({ theme }) => `${theme.spacing.XS} ${theme.spacing.XXS}`};
  text-align: center;
`;

export const ExerciseSelectWrapper = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  margin: ${({ theme }) => theme.spacing.XS};
  width: auto;

  ${media.tablet`
    width: 50%;
    margin: ${({ theme }) => `0 ${theme.spacing.XXS}`};
    justify-content: flex-end;
  `}
`;

export const AddExerciseFromListButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: auto;
  text-align: center;
  margin: ${({ theme }) => theme.spacing.XS};

  ${media.tablet`
    width: 50%;
    margin: ${({ theme }) => `0 ${theme.spacing.XXS}`};
    justify-content: flex-start;
  `}
`;

export const AddExerciseFromListWrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${media.tablet`
    flex-direction: row;
    padding: ${({ theme }) => `${theme.spacing.XS} 0`};
  `}
`;

export const AddNewExerciseWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  box-sizing: border-box;
  margin: 50px auto;
  padding: ${({ theme }) => `0 ${theme.spacing.L}`};
`;

export const HeadingWithLine = styled.h3`
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};

  &:after,
  &:before {
    content: '';
    width: 150px;
    height: 2px;
    background: ${({ theme }) => theme.colors.border};
    margin: ${({ theme }) => `0 ${theme.spacing.S}`};
  }
`;
