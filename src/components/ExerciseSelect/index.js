import { arrayOf, shape, string, func } from 'prop-types';
import { Select } from './style';

const ExerciseSelect = ({ exerciseOptions, onChange }) => (
  <Select onChange={onChange}>
    {exerciseOptions.map((exercise) => (
      <option value={exercise.value} key={exercise.value}>
        {exercise.name}
      </option>
    ))}
  </Select>
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
