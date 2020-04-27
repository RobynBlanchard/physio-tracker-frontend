import styled from 'styled-components';
import { arrayOf, shape, string, func } from 'prop-types';

const Wrapper = styled.div`
  padding: 8px;
  text-align: center;
`;

const ExerciseSelect = ({ exerciseOptions, onChange }) => (
  <Wrapper>
    <select onChange={onChange}>
      {exerciseOptions.map((exercise) => (
        <option value={exercise.value} key={exercise.value}>
          {exercise.name}
        </option>
      ))}
    </select>
  </Wrapper>
);

ExerciseSelect.defaultProps = {
  exerciseOptions: [],
  onChange: () => {},
};

ExerciseSelect.propTypes = {
  exerciseOptions: arrayOf(
    shape({
      name: string,
      value: string,
    })
  ),
  onChange: func,
};

export default ExerciseSelect;
