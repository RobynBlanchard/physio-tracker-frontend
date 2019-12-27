import styled from 'styled-components';

export const Wrapper = styled.div`
  max-height: ${({ open }) => (open ? '100px' : '0')};
  overflow: ${({ open }) => (open ? 'auto' : 'hidden')};
  border-bottom: 1px solid white;
  transition: max-height 0.5s, overflow 0.5s 0.5s;
  color: white;
`;

export const ExerciseListWrapper = styled.div`
  max-height: 55vh;
  overflow-y: scroll;
`;
